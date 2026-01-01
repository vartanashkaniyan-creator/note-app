// main.js

// ===== GLOBAL STATE =====
const AppState = {
  lastScreen: "home",
  note: localStorage.getItem("note") || "",
  list: JSON.parse(localStorage.getItem("list") || "[]")
};

window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";

  // تشخیص آخرین screen
  input.split("\n").forEach(line => {
    if (line.trim().startsWith("screen")) {
      AppState.lastScreen = line.trim().split(" ")[1];
    }
  });

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
    btn.onclick = () => dispatchAction(btn.dataset.action);
  });

  if (document.getElementById("noteText")) {
    document.getElementById("noteText").value = AppState.note;
  }
}

// ===== ACTIONS =====
function dispatchAction(name) {
  actions[name]?.();
}

const actions = {
  runCommand,

  goHomeAction() {
    AppState.lastScreen = "home";
    renderFromEngine("");
  },

  saveNote() {
    AppState.note = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", AppState.note);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input || !input.value.trim()) return;

    AppState.list.push(input.value.trim());
    localStorage.setItem("list", JSON.stringify(AppState.list));
    input.value = "";

    renderFromEngine("screen list");
  }
};
