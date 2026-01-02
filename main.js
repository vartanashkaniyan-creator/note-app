// main.js - نسخه امن
"use strict";

let currentState = null;
let currentLanguage = 'fa';
let history = [];
const MAX_HISTORY = 50;

// ===== SECURITY CONFIG =====
const SECURITY = {
  ALLOWED_ACTIONS: new Set([
    'runCommand',
    'goHomeAction',
    'saveNote',
    'addItem',
    'openNote',
    'openList'
  ]),
  
  ALLOWED_LANGUAGES: new Set(['fa', 'en']),
  
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
    if (currentState && currentState.schema) {
      render(currentState);
    }
  } catch (error) {
    console.error("Language change error:", error);
    showError("خطا در تغییر زبان");
  }
}

// ===== TRANSLATIONS =====
const translations = {
  en: {
    title: "Advanced App Builder",
    note: "Note",
    list: "List",
    save: "Save",
    back: "Back",
    execute: "Run Command",
    add: "Add",
    placeholder_commands: "Example:\ntitle My Notes\nscreen note",
    placeholder_note: "Write note...",
    placeholder_item: "New item..."
  },
  fa: {
    title: "سازنده اپ پیشرفته",
    note: "یادداشت",
    list: "لیست",
    save: "ذخیره",
    back: "بازگشت",
    execute: "اجرا",
    add: "اضافه کن",
    placeholder_commands: "مثال:\ntitle یادداشت‌های من\nscreen note",
    placeholder_note: "یادداشت بنویس...",
    placeholder_item: "آیتم جدید..."
  }
};

// ===== SECURE STORAGE =====
function getNote() {
  try {
    const note = localStorage.getItem("note");
    return note ? SECURITY.sanitizeHTML(note) : "";
  } catch (e) {
    console.error("Storage error:", e);
    return "";
  }
}

function getList() {
  try {
    const items = localStorage.getItem("items");
    if (!items) return [];
    
    const parsed = JSON.parse(items);
    if (!Array.isArray(parsed)) return [];
    
    // سانیتایز هر آیتم
    return parsed.map(item => 
      typeof item === 'string' ? SECURITY.sanitizeHTML(item) : ''
    ).filter(item => item.length > 0);
    
  } catch (e) {
    console.error("Storage error:", e);
    return [];
  }
}

// ===== APP INITIALIZATION =====
window.addEventListener("DOMContentLoaded", () => {
  // بررسی حمایت localStorage
  if (!isLocalStorageAvailable()) {
    showError("مرورگر شما از ذخیره‌سازی محلی پشتیبانی نمی‌کند");
    return;
  }
  
  // تنظیم زبان پیش‌فرض
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = currentLanguage;
  }
  
  // شروع برنامه
  runApp("home");
});

function isLocalStorageAvailable() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// ===== CORE APP LOGIC =====
function runApp(input) {
  try {
    // اضافه به تاریخچه
    history.push({
      input: input,
      timestamp: new Date().toISOString()
    });
    
    if (history.length > MAX_HISTORY) {
      history.shift();
    }
    
    // اجرای موتور
    currentState = runEngine(input);
    
    // رندر
    render(currentState);
    
    // نمایش alert اگر وجود دارد
    if (currentState.meta && currentState.meta.alertText) {
      setTimeout(() => {
        showAlert(currentState.meta.alertText);
      }, 100);
    }
    
  } catch (error) {
    console.error("App runtime error:", error);
    showError("خطا در اجرای دستور");
  }
}

// ===== SECURE RENDER ENGINE =====
function render(state) {
  const app = document.getElementById("app");
  if (!app || !state || !state.schema) {
    showError("خطا در بارگذاری رابط کاربری");
    return;
  }

  // پاکسازی ایمن
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }

  // ایجاد تیتر
  const titleElement = document.createElement("h1");
  titleElement.id = "appTitle";
  titleElement.textContent = translations[currentLanguage].title;
  app.appendChild(titleElement);

  // رندر کامپوننت‌ها
  state.schema.components.forEach(component => {
    if (!component || !component.type) return;
    
    try {
      switch(component.type) {
        case "textarea":
          renderTextarea(component, app);
          break;
        case "button":
          renderButton(component, app);
          break;
        case "list":
          renderList(component, app);
          break;
        default:
          console.warn("Unknown component type:", component.type);
      }
    } catch (error) {
      console.error("Render error:", error, component);
    }
  });
}

// ===== COMPONENT RENDERERS =====
function renderTextarea(component, parent) {
  const textarea = document.createElement("textarea");
  textarea.id = component.id || `textarea-${Date.now()}`;
  
  if (component.placeholder) {
    const placeholderKey = `placeholder_${component.placeholder}`;
    textarea.placeholder = translations[currentLanguage][placeholderKey] || component.placeholder;
  }
  
  // تنظیم مقدار ایمن
  if (component.id === "noteText") {
    textarea.value = getNote();
  }
  
  // محدودیت کاراکتر
  textarea.maxLength = 5000;
  
  parent.appendChild(textarea);
}

function renderButton(component, parent) {
  if (!component.action || !SECURITY.ALLOWED_ACTIONS.has(component.action)) {
    console.error("Blocked unsafe action:", component.action);
    return;
  }
  
  const button = document.createElement("button");
  button.id = component.id || `btn-${Date.now()}`;
  
  // متن دکمه
  if (component.label && translations[currentLanguage][component.label.toLowerCase()]) {
    button.textContent = translations[currentLanguage][component.label.toLowerCase()];
  } else if (component.label) {
    button.textContent = SECURITY.sanitizeHTML(component.label);
  }
  
  // رویداد ایمن
  button.onclick = function(event) {
    event.preventDefault();
    event.stopPropagation();
    handleAction(component.action);
  };
  
  // جلوگیری از رویدادهای خطرناک
  button.setAttribute("onclick", "");
  button.onmouseover = null;
  button.onerror = null;
  
  parent.appendChild(button);
}

function renderList(component, parent) {
  const ul = document.createElement("ul");
  ul.id = component.id || `list-${Date.now()}`;
  
  const items = getList();
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    ul.appendChild(li);
  });
  
  parent.appendChild(ul);
}

// ===== ACTION HANDLER (SECURE) =====
function handleAction(action) {
  // اعتبارسنجی دقیق
  if (!action || typeof action !== 'string') return;
  if (!SECURITY.ALLOWED_ACTIONS.has(action)) {
    console.error("Blocked unsafe action:", action);
    return;
  }
  
  try {
    switch(action) {
      case "runCommand":
        const commandInput = document.getElementById("commandInput");
        if (commandInput && commandInput.value) {
          const command = String(commandInput.value).substring(0, 1000);
          runApp(command);
        }
        break;
        
      case "goHomeAction":
        runApp("home");
        break;
        
      case "saveNote":
        const noteInput = document.getElementById("noteText");
        if (noteInput) {
          const noteContent = String(noteInput.value).substring(0, 5000);
          localStorage.setItem("note", noteContent);
          showAlert("ذخیره شد ✅");
        }
        break;
        
      case "addItem":
        const itemInput = document.getElementById("itemInput");
        if (itemInput && itemInput.value) {
          const newItem = String(itemInput.value).substring(0, 500);
          
          const items = getList();
          if (items.length < 100) { // محدودیت تعداد
            items.push(newItem);
            localStorage.setItem("items", JSON.stringify(items));
            render(currentState);
          } else {
            showError("حداکثر ۱۰۰ آیتم مجاز است");
          }
        }
        break;
        
      default:
        console.warn("Unhandled action:", action);
    }
  } catch (error) {
    console.error("Action handler error:", error);
    showError("خطا در انجام عملیات");
  }
}

// ===== UI UTILITIES =====
function showAlert(message) {
  if (!message || typeof message !== 'string') return;
  
  const safeMessage = SECURITY.sanitizeHTML(message.substring(0, 200));
  alert(safeMessage);
}

function showError(message) {
  console.error("App Error:", message);
  
  const app = document.getElementById("app");
  if (!app) return;
  
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.cssText = `
    background: #ff4444;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
    text-align: center;
  `;
  errorDiv.textContent = `خطا: ${message}`;
  
  // اضافه کردن به ابتدای app
  if (app.firstChild) {
    app.insertBefore(errorDiv, app.firstChild);
  } else {
    app.appendChild(errorDiv);
  }
  
  // حذف خودکار پس از ۵ ثانیه
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

// ===== GLOBAL EXPORTS =====
window.handleLanguageChange = handleLanguageChange;
window.runApp = runApp;

// فقط برای توسعه - حذف در تولید
if (typeof window !== 'undefined') {
  window.appDebug = {
    getState: () => currentState,
    getHistory: () => [...history],
    clearHistory: () => { history = []; }
  };
}
