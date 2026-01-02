"use strict";

let currentState = null;
let currentLanguage = 'fa';
let history = [];
const MAX_HISTORY = 50;

// ===== SECURITY CONFIG =====
const SECURITY = {
  ALLOWED_ACTIONS: new Set([
    'runCommand','goHomeAction','saveNote','addItem','openNote','openList'
  ]),
  
  ALLOWED_LANGUAGES: new Set(['fa','en']),
  
  sanitizeHTML: function(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// ===== LANGUAGE MANAGEMENT =====
function handleLanguageChange(event) {
  const lang = event.target.value;
  if (SECURITY.ALLOWED_LANGUAGES.has(lang)) {
    currentLanguage = lang;
    changeLanguage();
  }
}

function changeLanguage() {
  try {
    currentState = runEngine("");
    if (currentState && currentState.schema) render(currentState);
  } catch (error) {
    console.error("Language change error:", error);
    showError("خطا در تغییر زبان");
  }
}

// ===== TRANSLATIONS =====
const translations = {
  en: {
    title: "Advanced App Builder", note: "Note", list: "List",
    save: "Save", back: "Back", execute: "Run Command", add: "Add",
    placeholder_commands: "Example:\ntitle My Notes\nscreen note",
    placeholder_note: "Write note...", placeholder_item: "New item..."
  },
  fa: {
    title: "سازنده اپ پیشرفته", note: "یادداشت", list: "لیست",
    save: "ذخیره", back: "بازگشت", execute: "اجرا", add: "اضافه کن",
    placeholder_commands: "مثال:\ntitle یادداشت‌های من\nscreen note",
    placeholder_note: "یادداشت بنویس...", placeholder_item: "آیتم جدید..."
  }
};

// ===== SECURE STORAGE =====
function getNote() {
  try { const note = localStorage.getItem("note"); return note ? SECURITY.sanitizeHTML(note) : ""; }
  catch (e) { console.error("Storage error:", e); return ""; }
}

function getList() {
  try {
    const items = localStorage.getItem("items");
    if (!items) return [];
    const parsed = JSON.parse(items);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(i => typeof i==='string'?SECURITY.sanitizeHTML(i):'').filter(i=>i.length>0);
  } catch (e) { console.error("Storage error:", e); return []; }
}

// ===== APP INITIALIZATION =====
window.addEventListener("DOMContentLoaded", () => {
  if (!isLocalStorageAvailable()) { showError("مرورگر شما از ذخیره‌سازی محلی پشتیبانی نمی‌کند"); return; }
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) langSelect.value = currentLanguage;
  runApp("home");
});

function isLocalStorageAvailable() {
  try { const t='__test__'; localStorage.setItem(t,t); localStorage.removeItem(t); return true; } catch { return false; }
}

// ===== CORE APP LOGIC =====
function runApp(input) {
  try {
    history.push({ input: input, timestamp: new Date().toISOString() });
    if (history.length>MAX_HISTORY) history.shift();
    currentState = runEngine(input);
    render(currentState);
    if(currentState.meta && currentState.meta.alertText) setTimeout(()=>showAlert(currentState.meta.alertText),100);
  } catch(e){ console.error("App runtime error:", e); showError("خطا در اجرای دستور"); }
}

// ===== SECURE RENDER ENGINE =====
function render(state) {
  const app = document.getElementById("app");
  if(!app||!state||!state.schema){ showError("خطا در بارگذاری رابط کاربری"); return; }
  while(app.firstChild) app.removeChild(app.firstChild);

  const titleElement = document.createElement("h1");
  titleElement.id="appTitle";
  titleElement.textContent=translations[currentLanguage].title;
  app.appendChild(titleElement);

  state.schema.components.forEach(component=>{
    if(!component||!component.type) return;
    try{
      switch(component.type){
        case "textarea": renderTextarea(component,app); break;
        case "button": renderButton(component,app); break;
        case "list": renderList(component,app); break;
        default: console.warn("Unknown component type:",component.type);
      }
    } catch(e){ console.error("Render error:",e,component); }
  });
}

function renderTextarea(c,p){
  const t=document.createElement("textarea");
  t.id=c.id||`textarea-${Date.now()}`;
  if(c.placeholder){
    const key=`placeholder_${c.placeholder}`;
    t.placeholder=translations[currentLanguage][key]||c.placeholder;
  }
  if(c.id==="noteText") t.value=getNote();
  t.maxLength=5000; p.appendChild(t);
}

function renderButton(c,p){
  if(!c.action||!SECURITY.ALLOWED_ACTIONS.has(c.action)){ console.error("Blocked unsafe action:",c.action); return; }
  const b=document.createElement("button");
  b.id=c.id||`btn-${Date.now()}`;
  b.textContent=c.label&&translations[currentLanguage][c.label.toLowerCase()]?translations[currentLanguage][c.label.toLowerCase()]:SECURITY.sanitizeHTML(c.label);
  b.onclick=function(e){ e.preventDefault(); e.stopPropagation(); handleAction(c.action); };
  b.setAttribute("onclick","");
  b.onmouseover=null; b.onerror=null;
  p.appendChild(b);
}

function renderList(c,p){
  const ul=document.createElement("ul"); ul.id=c.id||`list-${Date.now()}`;
  getList().forEach((item,i)=>{ const li=document.createElement("li"); li.textContent=`${i+1}. ${item}`; ul.appendChild(li); });
  p.appendChild(ul);
}

// ===== ACTION HANDLER =====
function handleAction(action){
  if(!action||typeof action!=='string') return;
  if(!SECURITY.ALLOWED_ACTIONS.has(action)){ console.error("Blocked unsafe action:",action); return; }
  try{
    switch(action){
      case "runCommand":
        const ci=document.getElementById("commandInput");
        if(ci&&ci.value) runApp(String(ci.value).substring(0,1000));
        break;
      case "goHomeAction": runApp("home"); break;
      case "saveNote":
        const ni=document.getElementById("noteText");
        if(ni){ localStorage.setItem("note",String(ni.value).substring(0,5000)); showAlert("ذخیره شد ✅"); }
        break;
      case "addItem":
        const ii=document.getElementById("itemInput");
        if(ii&&ii.value){
          const newItem=String(ii.value).substring(0,500);
          const items=getList();
          if(items.length<100){ items.push(newItem); localStorage.setItem("items",JSON.stringify(items)); render(currentState); }
          else showError("حداکثر ۱۰۰ آیتم مجاز است");
        }
        break;
      default: console.warn("Unhandled action:",action);
    }
  } catch(e){ console.error("Action handler error:",e); showError("خطا در انجام عملیات"); }
}

// ===== UI UTILITIES =====
function showAlert(msg){ if(!msg||typeof msg!=='string') return; alert(SECURITY.sanitizeHTML(msg.substring(0,200))); }
function showError(msg){
  console.error("App Error:",msg);
  const app=document.getElementById("app");
  if(!app) return;
  const eDiv=document.createElement("div"); eDiv.className="error-message"; eDiv.style.cssText="background:#ff4444;color:white;padding:10px;border-radius:5px;margin:10px 0;text-align:center;";
  eDiv.textContent=`خطا: ${msg}`;
  if(app.firstChild) app.insertBefore(eDiv,app.firstChild); else app.appendChild(eDiv);
  setTimeout(()=>{ if(eDiv.parentNode)eDiv.parentNode.removeChild(eDiv); },5000);
}

// ===== GLOBAL EXPORTS =====
window.handleLanguageChange = handleLanguageChange;
window.runApp = runApp;

if(typeof window!=='undefined'){
  window.appDebug={getState:()=>currentState,getHistory:()=>[...history],clearHistory:()=>{history=[];}};
}
