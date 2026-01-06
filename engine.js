// engine.js - Advanced Engine v5
const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

let variables = {};
let functions = {};
let currentScreen = "home";
let alertText = null;
let outputBuffer = [];

/* ================= NORMALIZE ================= */
function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/تکرار/g, "loop")
    .replace(/پایان/g, "end")
    .replace(/اگر/g, "if")
    .replace(/وگرنه/g, "else")
    .replace(/بذار/g, "set")
    .replace(/هشدار/g, "alert")
    .replace(/چاپ/g, "print")
    .replace(/پاک/g, "clear")
    .replace(/تابع/g, "function")
    .replace(/فراخوانی/g, "call")
    .trim();
}

/* ================= UTILS ================= */
function interpolate(text) {
  return text.replace(/\{([\w\d_]+)\}/g, (_, v) =>
    variables[v] !== undefined ? variables[v] : `{${v}}`
  );
}

function toNumber(val) {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

/* ================= ENGINE ================= */
function runEngine(input) {
  alertText = null;
  outputBuffer = [];

  if (!input || !input.trim()) return result();

  const lines = input
    .split("\n")
    .map(l => normalize(l))
    .filter(Boolean);

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const parts = line.split(" ");
    const cmd = parts[0];

    /* ---------- FUNCTION ---------- */
    if (cmd === "function") {
      const name = parts[1];
      const body = [];
      i++;
      while (i < lines.length && lines[i] !== "end") {
        body.push(lines[i]);
        i++;
      }
      functions[name] = body;
    }

    /* ---------- LOOP ---------- */
    else if (cmd === "loop") {
      const count = toNumber(parts[1]);
      const block = [];
      i++;
      while (i < lines.length && lines[i] !== "end") {
        block.push(lines[i]);
        i++;
      }
      for (let j = 0; j < count; j++) {
        block.forEach(executeLine);
      }
    }

    /* ---------- IF ---------- */
    else if (cmd === "if") {
      const left = interpolate(parts[1]);
      const op = parts[2];
      const right = interpolate(parts[3]);

      const condition = evaluate(left, op, right);
      const ifBlock = [];
      const elseBlock = [];

      i++;
      let target = ifBlock;

      while (i < lines.length && lines[i] !== "end") {
        if (lines[i] === "else") target = elseBlock;
        else target.push(lines[i]);
        i++;
      }

      (condition ? ifBlock : elseBlock).forEach(executeLine);
    }

    /* ---------- NORMAL ---------- */
    else {
      executeLine(line);
    }

    i++;
  }

  return result();
}

/* ================= EXEC LINE ================= */
function executeLine(line) {
  const parts = line.split(" ");
  const cmd = parts[0];

  if ((cmd === "screen" || cmd === "go") && ALLOWED_SCREENS.has(parts[1])) {
    currentScreen = parts[1];
  }

  else if (cmd === "set") {
    const name = parts[1];
    const expr = interpolate(parts.slice(2).join(" "));
    variables[name] = calc(expr);
  }

  else if (cmd === "alert") {
    alertText = interpolate(parts.slice(1).join(" "));
  }

  else if (cmd === "print") {
    outputBuffer.push(interpolate(parts.slice(1).join(" ")));
  }

  else if (cmd === "clear") {
    outputBuffer = [];
  }

  else if (cmd === "call") {
    const fname = parts[1];
    const body = functions[fname];
    if (body) body.forEach(executeLine);
  }

  else if (cmd === "plugin" && window.PluginSystem) {
    window.PluginSystem.execute(parts[1]);
  }
}

/* ================= CALC ================= */
function calc(expr) {
  try {
    if (!/^[\d+\-*/ ().]+$/.test(expr)) return expr;
    return eval(expr);
  } catch {
    return expr;
  }
}

/* ================= CONDITION ================= */
function evaluate(a, op, b) {
  const x = isNaN(a) ? a : Number(a);
  const y = isNaN(b) ? b : Number(b);

  switch (op) {
    case "==": return x == y;
    case "!=": return x != y;
    case ">": return x > y;
    case "<": return x < y;
    case ">=": return x >= y;
    case "<=": return x <= y;
    default: return false;
  }
}

/* ================= RESULT ================= */
function result() {
  return {
    schema: getScreenSchema(currentScreen, outputBuffer),
    meta: {
      alertText,
      variables,
      functions,
      currentScreen
    }
  };
}

/* ================= UI ================= */
function getScreenSchema(screen, output) {
  const outputBox = output.length
    ? [{ type: "output", value: output }]
    : [];

  if (screen === "note") {
    return {
      title: "note",
      components: [
        ...outputBox,
        { type: "textarea", id: "noteText", placeholder: "note" },
        { type: "button", label: "save", action: "saveNote" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  if (screen === "list") {
    return {
      title: "list",
      components: [
        ...outputBox,
        { type: "textarea", id: "itemInput", placeholder: "item" },
        { type: "button", label: "add", action: "addItem" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  return {
    title: "home",
    components: [
      ...outputBox,
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

window.runEngine = runEngine;
