// main.js

const AppState = {
  history: [],
  items: JSON.parse(localStorage.getItem("items") || "[]")
};

window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";
  AppState.history.push(input);
  renderFromEngine(input);
}

function renderFromEngine(input) {
  const result = runEngine(input);

  // دستور back از داخل متن
  if (result.command === "back") {
    goBack();
    return;
  }

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
      html += `<ul id="${c.id}"></ul>`;
    }
  });

  app.innerHTML = html;

  // رندر لیست
  const listEl = document.getElementById("itemList");
  if (listEl) {
    AppState.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    });
  }

  // اتصال اکشن‌ها
  app.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => dispatchAction(btn.dataset.action);
  });
}

// ===== ACTION DISPATCHER =====
function dispatchAction(action) {
  actions[action]?.();
}

// ===== ACTIONS =====
const actions = {
  runCommand,

  goBack,

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input || !input.value) return;

    AppState.items.push(input.value);
    localStorage.setItem("items", JSON.stringify(AppState.items));
    input.value = "";
    renderFromEngine(AppState.history.at(-1) || "");
  }
};

// ===== REAL BACK =====
function goBack() {
  AppState.history.pop(); // صفحه فعلی
  const prev = AppState.history.pop() || "";
  renderFromEngine(prev);
}
