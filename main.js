let currentState = null;
let currentLanguage = 'fa';  // پیش‌فرض زبان فارسی

// انتخاب زبان
function handleLanguageChange(event) {
  currentLanguage = event.target.value;
  changeLanguage();
}

// تغییر زبان و به‌روزرسانی UI
function changeLanguage() {
  currentState = runEngine("");  // دوباره موتور را اجرا می‌کنیم
  render(currentState);
}

// ترجمه‌ها
const translations = {
  en: {
    title: "Advanced App Builder",
    note: "Note",
    list: "List",
    save: "Save",
    back: "Back",
    execute: "Run Command"
  },
  fa: {
    title: "سازنده اپ پیشرفته",
    note: "یادداشت",
    list: "لیست",
    save: "ذخیره",
    back: "بازگشت",
    execute: "اجرا"
  }
};

// ===== STORAGE =====
function getNote() {
  return localStorage.getItem("note") || "";
}

function getList() {
  return JSON.parse(localStorage.getItem("items") || "[]");
}

// ===== START APP =====
window.addEventListener("DOMContentLoaded", () => {
  runApp("home");
});

// ===== RUN =====
function runApp(input) {
  currentState = runEngine(input);
  render(currentState);
}

// ===== RENDER =====
function render(state) {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerText = translations[currentLanguage].title;
  app.appendChild(h1);

  state.schema.components.forEach(c => {
    if (c.type === "textarea") {
      const t = document.createElement("textarea");
      t.id = c.id;
      t.placeholder = translations[currentLanguage][c.placeholder] || "";

      if (c.id === "noteText") t.value = getNote();

      app.appendChild(t);
    }

    if (c.type === "button") {
      const b = document.createElement("button");
      b.innerText = translations[currentLanguage][c.label];
      b.onclick = () => handleAction(c.action);
      app.appendChild(b);
    }

    if (c.type === "list") {
      const ul = document.createElement("ul");
      ul.id = c.id;

      getList().forEach(i => {
        const li = document.createElement("li");
        li.innerText = i;
        ul.appendChild(li);
      });

      app.appendChild(ul);
    }
  });
}

// ===== ACTIONS =====
function handleAction(action) {
  if (action === "runCommand") {
    const v = document.getElementById("commandInput")?.value || "";
    runApp(v);
  }

  if (action === "goHomeAction") {
    runApp("home");
  }

  if (action === "saveNote") {
    const v = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", v);
    alert("ذخیره شد ✅");
  }

  if (action === "addItem") {
    const input = document.getElementById("itemInput");
    if (!input || !input.value) return;

    const items = getList();
    items.push(input.value);
    localStorage.setItem("items", JSON.stringify(items));
    render(currentState);
  }
}

// ===== META =====
function handleMeta(meta) {
  if (!meta) return;

  if (meta.alertText) {
    alert(meta.alertText);
  }
      }
