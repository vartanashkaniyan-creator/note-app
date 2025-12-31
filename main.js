// main.js

// ===== GLOBAL STATE =====
const AppState = {
  lastCommand: "",
  note: localStorage.getItem("note") || "",
  list: JSON.parse(localStorage.getItem("list") || "[]")
};

window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const inputEl = document.getElementById("commandInput");
  const input = inputEl ? inputEl.value : "";

  AppState.lastCommand = input;
  renderFromEngine(input);
}

function renderFromEngine(input) {
  const result = runEngine(input);
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
      html += "<ul>";
      AppState.list.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += "</ul>";
    }
  });

  app.innerHTML = html;

  app.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => {
      dispatchAction(btn.dataset.action);
    };
  });

  // پر کردن نوت قبلی
  const noteEl = document.getElementById("noteText");
  if (noteEl) noteEl.value = AppState.note;
}

// ===== ACTION DISPATCHER =====
function dispatchAction(name) {
  if (actions[name]) {
    actions[name]();
  } else {
    alert("اکشن ناشناخته ❌");
  }
}

// ===== ACTIONS =====
const actions = {
  runCommand,

  goHomeAction() {
    renderFromEngine(AppState.lastCommand);
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    AppState.note = text;
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input || !input.value.trim()) return;

    AppState.list.push(input.value.trim());
    localStorage.setItem("list", JSON.stringify(AppState.list));
    input.value = "";
    renderFromEngine(AppState.lastCommand);
  }
};
