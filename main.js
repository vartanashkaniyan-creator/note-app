// main.js — STABLE VERSION WITH REAL BACK

const AppState = {
  history: []
};

window.onload = () => {
  goHome();
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";
  AppState.history.push(input);
  renderFromEngine(input);
}

function renderFromEngine(input) {
  const result = runEngine(input);

  // دستور متنی back
  if (result.command === "back") {
    goBack();
    return;
  }

  renderUI(result.schema);
}

// ===== UI =====
function renderUI(schema) {
  const app = document.getElementById("app");
  let html = `<h2>${schema.title}</h2>`;

  schema.components.forEach(c => {
    if (c.type === "textarea") {
      html += `<textarea id="${c.id}" placeholder="${c.placeholder || ""}"></textarea>`;
    }

    if (c.type === "button") {
      html += `<button onclick="${c.action}()">${c.label}</button>`;
    }

    if (c.type === "list") {
      html += `<ul id="${c.id}"></ul>`;
    }
  });

  app.innerHTML = html;
}

// ===== ACTIONS =====
function goHome() {
  AppState.history = [];
  renderFromEngine("");
}

function goBack() {
  AppState.history.pop(); // صفحه فعلی
  const prev = AppState.history.pop() || "";
  renderFromEngine(prev);
}

function saveNote() {
  const text = document.getElementById("noteText")?.value || "";
  localStorage.setItem("note", text);
  alert("ذخیره شد ✅");
}

function addItem() {
  alert("فعلاً نمایشی است");
    }
