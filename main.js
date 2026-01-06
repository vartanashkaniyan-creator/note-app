// ===== MAIN.JS =====
// نسخه پایدار – اجرای دستورات + رندر UI

let currentState = null;

/* =========================
   ابزارهای کمکی
========================= */

function sanitize(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

function getNote() {
  return localStorage.getItem("note") || "";
}

function getList() {
  try {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

/* =========================
   شروع برنامه
========================= */

window.addEventListener("DOMContentLoaded", () => {
  runApp("home");
});

/* =========================
   اجرای موتور
========================= */

function runApp(input) {
  currentState = window.runEngine(input || "");
  render(currentState);
  executeActions(currentState.actions || []);
}

/* =========================
   اجرای دستورات پیشرفته
========================= */

async function executeActions(actions) {
  for (const act of actions) {

    // ALERT
    if (act.type === "alert") {
      alert(act.text);
    }

    // DELAY
    if (act.type === "delay") {
      await new Promise(res => setTimeout(res, act.time * 1000));
    }

    // IF CONDITIONS
    if (act.type === "if") {
      const condition = act.condition;

      if (condition === "note empty") {
        if (!getNote()) alert("یادداشت خالی است");
      }

      if (condition === "note not empty") {
        if (getNote()) alert("یادداشت داری");
      }

      if (condition === "list empty") {
        if (getList().length === 0) alert("لیست خالی است");
      }

      if (condition === "list not empty") {
        if (getList().length > 0) alert("لیست پر است");
      }
    }
  }
}

/* =========================
   رندر UI
========================= */

function render(state) {
  const app = document.getElementById("app");
  if (!app || !state || !state.schema) return;

  app.innerHTML = "";

  state.schema.components.forEach(c => {

    // TEXTAREA
    if (c.type === "textarea") {
      const t = document.createElement("textarea");
      t.id = c.id;
      t.placeholder = c.placeholder || "";

      if (c.id === "noteText") t.value = getNote();
      if (c.id === "itemInput") t.value = "";

      app.appendChild(t);
    }

    // BUTTON
    if (c.type === "button") {
      const b = document.createElement("button");
      b.textContent = c.label;
      b.onclick = () => handleAction(c.action);
      app.appendChild(b);
    }

    // LIST
    if (c.type === "list") {
      const ul = document.createElement("ul");
      getList().forEach((item, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${sanitize(item)}`;
        ul.appendChild(li);
      });
      app.appendChild(ul);
    }
  });
}

/* =========================
   اکشن‌ها
========================= */

function handleAction(action) {

  // اجرای دستور
  if (action === "runCommand") {
    const cmd = document.getElementById("commandInput")?.value || "";
    runApp(cmd);
  }

  // بازگشت خانه
  if (action === "goHomeAction") {
    runApp("home");
  }

  // ذخیره یادداشت
  if (action === "saveNote") {
    const val = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", val);
    alert("یادداشت ذخیره شد ✅");
  }

  // افزودن به لیست
  if (action === "addItem") {
    const val = document.getElementById("itemInput")?.value || "";
    if (!val) return;

    const list = getList();
    list.push(val);
    localStorage.setItem("items", JSON.stringify(list));
    render(currentState);
  }
}

/* =========================
   زبان (فعلاً نمایشی)
========================= */

function handleLanguageChange(event) {
  alert("زبان تغییر کرد: " + event.target.value);
}
