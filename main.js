// main.js

let APP_STATE = {
  screen: "home",
  listItems: []
};

window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";
  renderFromEngine(input);
}

function renderFromEngine(input) {
  const result = runEngine(input);

  // تشخیص صفحه از schema
  if (input.includes("screen list")) APP_STATE.screen = "list";
  if (input.includes("screen note")) APP_STATE.screen = "note";
  if (input === "") APP_STATE.screen = "home";

  renderUI(result.schema);
}

// ===== UI RENDERER =====
function renderUI(schema) {
  const app = document.getElementById("app");
  let html = `<h2>${schema.title}</h2>`;

  schema.components.forEach(c => {
    if (c.type === "textarea") {
      html += `<textarea id="${c.id}" placeholder="${c.placeholder || ""}"></textarea>`;
    }

    if (c.type === "button") {
      html += `<button data-action="${c.action}">${c.label}</button>`;
    }

    if (c.type === "list") {
      html += `<ul>`;
      APP_STATE.listItems.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += `</ul>`;
    }
  });

  app.innerHTML = html;

  document.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => dispatchAction(btn.dataset.action);
  });
}

// ===== ACTION DISPATCHER =====
function dispatchAction(actionName) {
  if (actions[actionName]) {
    actions[actionName]();
  } else {
    alert("اکشن ناشناخته ❌");
  }
}

// ===== ACTIONS =====
const actions = {
  runCommand,

  goHomeAction() {
    APP_STATE.screen = "home";
    APP_STATE.listItems = []; // ← پاک‌سازی لیست
    renderFromEngine("");
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const val = document.getElementById("itemInput")?.value;
    if (!val) return;
    APP_STATE.listItems.push(val);
    renderFromEngine("screen list");
  }
};
