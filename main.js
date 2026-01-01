// ================================
// main.js – Stable Core v2
// ================================

// ===== GLOBAL STATE =====
const AppState = {
  history: [],

  items: JSON.parse(localStorage.getItem("items") || "[]"),

  lastSchema: null
};

// ===== START =====
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

  AppState.lastSchema = result.schema;
  renderUI(result.schema);
}

// ===== UI RENDERER =====
function renderUI(schema) {
  const app = document.getElementById("app");
  let html = `<h2>${schema.title}</h2>`;

  schema.components.forEach(c => {
    if (c.type === "textarea") {
      html += `
        <textarea
          id="${c.id}"
          placeholder="${c.placeholder || ""}"
        ></textarea>
      `;
    }

    if (c.type === "button") {
      html += `
        <button data-action="${c.action}">
          ${c.label}
        </button>
      `;
    }

    if (c.type === "list") {
      html += `<ul id="${c.id}"></ul>`;
    }
  });

  app.innerHTML = html;

  // ===== RENDER LIST ITEMS =====
  const listEl = document.getElementById("itemList");
  if (listEl) {
    listEl.innerHTML = "";

    AppState.items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item}
        <button data-index="${index}" style="margin-right:8px">❌</button>
      `;

      li.querySelector("button").onclick = () => {
        deleteItem(index);
      };

      listEl.appendChild(li);
    });
  }

  // ===== ACTION BINDING =====
  app.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => dispatchAction(btn.dataset.action);
  });
}

// ===== ACTION DISPATCHER =====
function dispatchAction(action) {
  if (actions[action]) {
    actions[action]();
  } else {
    alert("اکشن ناشناخته ❌");
  }
}

// ===== ACTIONS =====
const actions = {
  runCommand,

  goHomeAction() {
    // برگشت واقعی
    AppState.history.pop(); // صفحه فعلی
    const prev = AppState.history.pop() || "";
    renderFromEngine(prev);
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input || !input.value.trim()) return;

    AppState.items.push(input.value.trim());
    localStorage.setItem("items", JSON.stringify(AppState.items));
    input.value = "";

    renderUI(AppState.lastSchema);
  }
};

// ===== HELPERS =====
function deleteItem(index) {
  AppState.items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(AppState.items));
  renderUI(AppState.lastSchema);
}
