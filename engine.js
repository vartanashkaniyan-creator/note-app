// engine.js – v4 (Variables + If/Else)
// Compatible with main.js

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);
const VARS = {};

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd.toLowerCase()
    .replace(/صفحه/g,"screen")
    .replace(/یادداشت/g,"note")
    .replace(/لیست/g,"list")
    .replace(/برو/g,"go")
    .replace(/بذار/g,"set")
    .replace(/هشدار/g,"alert")
    .replace(/اگر/g,"if")
    .replace(/وگرنه/g,"else")
    .trim();
}

// جایگزینی {var}
function interpolate(text) {
  return text.replace(/\{(\w+)\}/g, (_, key) => VARS[key] !== undefined ? VARS[key] : `{${key}}`);
}

// اجرای شرط
function evalCondition(key, operator, value) {
  const varValue = VARS[key];
  if(varValue===undefined) return false;
  const numVar = parseFloat(varValue);
  const numVal = parseFloat(value);
  switch(operator){
    case ">": return !isNaN(numVar) && numVar > numVal;
    case "<": return !isNaN(numVar) && numVar < numVal;
    case "==": return String(varValue) === String(value);
    case "!=": return String(varValue) !== String(value);
    default: return false;
  }
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input.split("\n").map(l=>normalize(l)).filter(Boolean);

    let skipElse = false; // برای مدیریت else

    for(let i=0; i<lines.length; i++){
      const line = lines[i];
      const parts = line.split(" ");
      const cmd = parts[0];

      if(cmd==="screen" || cmd==="go"){
        if(parts[1] && ALLOWED_SCREENS.has(parts[1])) screen=parts[1];
      }

      if(cmd==="set" && parts.length>=3){
        const key=parts[1];
        const value=parts.slice(2).join(" ");
        VARS[key]=value;
      }

      if(cmd==="alert" && !skipElse){
        alertText = interpolate(parts.slice(1).join(" "));
      }

      // شرط
      if(cmd==="if" && !skipElse){
        const key=parts[1], operator=parts[2], value=parts.slice(3).join(" ");
        const result = evalCondition(key, operator, value);
        skipElse = !result; // اگر false شد، خط بعد را نادیده میگیریم تا else
        continue;
      }

      if(cmd==="else"){
        skipElse = !skipElse; // اجرای else فقط اگر if قبلش false بود
      }
    }
  }

  return { schema:getScreenSchema(screen), meta:{alertText} };
}

// ===== UI SCHEMA =====
function getScreenSchema(screen){
  if(screen==="note") return { title:"note", components:[
    { type:"textarea", id:"noteText", placeholder:"note" },
    { type:"button", label:"save", action:"saveNote" },
    { type:"button", label:"back", action:"goHomeAction" }
  ]};
  if(screen==="list") return { title:"list", components:[
    { type:"textarea", id:"itemInput", placeholder:"item" },
    { type:"button", label:"add", action:"addItem" },
    { type:"list", id:"itemsList"},
    { type:"button", label:"back", action:"goHomeAction"}
  ]};
  return { title:"home", components:[
    { type:"textarea", id:"commandInput", placeholder:"commands" },
    { type:"button", label:"execute", action:"runCommand" }
  ]};
}

// EXPORT
window.runEngine = runEngine;
window.__ENGINE_VARS__ = VARS;
