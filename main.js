"use strict";

let currentState = null;
let history = [];
const MAX_HISTORY = 50;

// ===== SAFE ACTIONS =====
const ALLOWED_ACTIONS = new Set([
  "runCommand", "goHomeAction", "saveNote", "addItem"
]);

function sanitize(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

// ===== STORAGE =====
function getNote() {
  return sanitize(localStorage.getItem("note") || "");
}

function getList() {
  try {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    return Array.isArray(items) ? items.map(sanitize) : [];
  } catch { return []; }
}

// ===== APP =====
window.addEventListener("DOMContentLoaded", () => {
  runApp("home");
});

function runApp(input) {
  // تاریخچه
  history.push({ input, ts: new Date().toISOString() });
  if (history.length > MAX_HISTORY) history.shift();

  currentState = window.runEngine(input || "");

  render(currentState);

  // Alert
  if (currentState.meta.alertText) {
    setTimeout(() => alert(currentState.meta.alertText), 50);
  }

  // Plugin
  if (currentState.meta.pluginCommand && window.PluginSystem) {
    const result = window.PluginSystem.execute(currentState.meta.pluginCommand);
    setTimeout(() => alert(result), 100);
  }
}

// ===== RENDER =====
function render(state) {
  const app = document.getElementById("app");
  if (!app || !state || !state.schema) return;

  app.innerHTML = "";

  state.schema.components.forEach(c => {
    if (c.type === "textarea") {
      const t = document.createElement("textarea");
      t.id = c.id;
      t.placeholder = c.placeholder;

      if (c.id === "noteText") t.value = getNote();
      if (c.id === "itemInput") t.value = "";

      app.appendChild(t);
    }

    if (c.type === "button") {
      const b = document.createElement("button");
      b.textContent = c.label;
      b.onclick = () => handleAction(c.action);
      app.appendChild(b);
    }

    if (c.type === "list") {
      const ul = document.createElement("ul");
      getList().forEach((item, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${item}`;
        ul.appendChild(li);
      });
      app.appendChild(ul);
    }
  });
}

// ===== HANDLE ACTIONS =====
function handleAction(action) {
  if (!ALLOWED_ACTIONS.has(action)) return;

  if (action === "runCommand") {
    const cmd = document.getElementById("commandInput")?.value || "";
    runApp(cmd);
  }

  if (action === "goHomeAction") runApp("home");

  if (action === "saveNote") {
    const val = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", val);
    alert("ذخیره شد ✅");
  }

  if (action === "addItem") {
    const val = document.getElementById("itemInput")?.value || "";
    if (!val) return;
    const list = getList();
    if (list.length >= 100) return alert("حداکثر ۱۰۰ آیتم مجاز است");
    list.push(val);
    localStorage.setItem("items", JSON.stringify(list));
    render(currentState);
  }
      }
