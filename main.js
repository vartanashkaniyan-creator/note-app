"use strict";

let currentState = null;
let currentLanguage = 'fa';
let history = [];
const MAX_HISTORY = 50;

const SECURITY = {
  ALLOWED_ACTIONS: new Set([
    'runCommand','goHomeAction','saveNote','addItem','openNote','openList'
  ]),
  ALLOWED_LANGUAGES: new Set(['fa','en']),
  sanitizeHTML: function(text){
    if(typeof text!=='string') return '';
    const div=document.createElement('div');
    div.textContent=text;
    return div.innerHTML;
  }
};

function handleLanguageChange(event){
  const lang=event.target.value;
  if(SECURITY.ALLOWED_LANGUAGES.has(lang)){
    currentLanguage=lang;
    runApp("home");
  }
}

const translations = {
  en:{title:"Advanced App Builder",note:"Note",list:"List",save:"Save",back:"Back",execute:"Run Command",add:"Add",placeholder_commands:"Example:\ntitle My Notes\nscreen note",placeholder_note:"Write note...",placeholder_item:"New item..."},
  fa:{title:"سازنده اپ پیشرفته",note:"یادداشت",list:"لیست",save:"ذخیره",back:"بازگشت",execute:"اجرا",add:"اضافه کن",placeholder_commands:"مثال:\ntitle یادداشت‌های من\nscreen note",placeholder_note:"یادداشت بنویس...",placeholder_item:"آیتم جدید..."}
};

function getNote(){return localStorage.getItem("note")||"";}
function getList(){try{const items=localStorage.getItem("items");return items?JSON.parse(items):[]}catch(e){return [];}}

window.addEventListener("DOMContentLoaded",()=>{
  const langSelect=document.getElementById("languageSelect");
  if(langSelect) langSelect.value=currentLanguage;
  runApp("home");
});

function runApp(input){
  history.push({input,timestamp:new Date().toISOString()});
  if(history.length>MAX_HISTORY) history.shift();
  currentState=runEngine(input);
  render(currentState);
  if(currentState.meta && currentState.meta.alertText) showAlert(currentState.meta.alertText);
}

function render(state){
  const app=document.getElementById("app");
  if(!app||!state||!state.schema){showError("خطا در بارگذاری رابط کاربری");return;}
  app.innerHTML="";
  const titleElement=document.createElement("h1");
  titleElement.id="appTitle";
  titleElement.textContent=translations[currentLanguage].title;
  app.appendChild(titleElement);

  state.schema.components.forEach(component=>{
    if(!component||!component.type) return;
    try{
      switch(component.type){
        case"textarea":renderTextarea(component,app);break;
        case"button":renderButton(component,app);break;
        case"list":renderList(component,app);break;
        default:console.warn("Unknown component type:",component.type);
      }
    }catch(e){console.error("Render error:",e,component);}
  });
}

function renderTextarea(component,parent){
  const textarea=document.createElement("textarea");
  textarea.id=component.id||`textarea-${Date.now()}`;
  if(component.placeholder){
    const key=`placeholder_${component.placeholder}`;
    textarea.placeholder=translations[currentLanguage][key]||component.placeholder;
  }
  if(component.id==="noteText") textarea.value=getNote();
  if(component.value) textarea.value=SECURITY.sanitizeHTML(component.value);
  parent.appendChild(textarea);
}

function renderButton(component,parent){
  if(!component.action||!SECURITY.ALLOWED_ACTIONS.has(component.action)){console.error("Blocked unsafe action:",component.action);return;}
  const button=document.createElement("button");
  button.id=component.id||`btn-${Date.now()}`;
  button.textContent=translations[currentLanguage][component.label.toLowerCase()]||component.label||"Button";
  button.onclick=function(e){e.preventDefault();e.stopPropagation();handleAction(component.action);};
  parent.appendChild(button);
}

function renderList(component,parent){
  const ul=document.createElement("ul");
  ul.id=component.id||`list-${Date.now()}`;
  getList().forEach((item,index)=>{const li=document.createElement("li");li.textContent=`${index+1}. ${item}`;ul.appendChild(li);});
  parent.appendChild(ul);
}

function handleAction(action){
  if(!action||!SECURITY.ALLOWED_ACTIONS.has(action)) return;
  switch(action){
    case"runCommand":
      const cmd=document.getElementById("commandInput");
      if(cmd && cmd.value) runApp(String(cmd.value).substring(0,1000));
      break;
    case"goHomeAction":runApp("home");break;
    case"saveNote":
      const note=document.getElementById("noteText");
      if(note){localStorage.setItem("note",String(note.value).substring(0,5000));showAlert("ذخیره شد ✅");}
      break;
    case"addItem":
      const item=document.getElementById("itemInput");
      if(item && item.value){
        const newItem=String(item.value).substring(0,500);
        const items=getList();
        if(items.length<100){items.push(newItem);localStorage.setItem("items",JSON.stringify(items));render(currentState);}else{showError("حداکثر ۱۰۰ آیتم مجاز است");}
      }
      break;
  }
}

function showAlert(msg){if(msg) alert(SECURITY.sanitizeHTML(msg.substring(0,200)));}
function showError(msg){const app=document.getElementById("app");if(!app)return;const div=document.createElement("div");div.className="error-message";div.textContent=`خطا: ${msg}`;app.insertBefore(div,app.firstChild);setTimeout(()=>{if(div.parentNode)div.parentNode.removeChild(div);},5000);}

window.handleLanguageChange=handleLanguageChange;
window.runApp=runApp;

if(typeof window!=="undefined"){
  window.appDebug={getState:()=>currentState,getHistory:()=>[...history],clearHistory:()=>{history=[];}};
}
