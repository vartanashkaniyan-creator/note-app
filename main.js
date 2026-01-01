// ===== GLOBAL STATE =====
const AppState = {
  history: [],        // تاریخچه ورودی‌ها
  currentInput: ""    // ورودی فعلی
};

// ===== START =====
window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";

  if (AppState.currentInput) {
    AppState.history.push(AppState.currentInput);
  }

  AppState.currentInput = input;
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

  // رندر لیست
  const listEl = document.getElementById("itemList");
  if (listEl) {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    items.forEach(item => {
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
  if (actions[action]) actions[action]();
}

// ===== ACTIONS =====
const actions = {
  runCommand,

  goHomeAction() {
    if (AppState.history.length === 0) {
      AppState.currentInput = "";
      renderFromEngine("");
      return;
    }

    const prev = AppState.history.pop();
    AppState.currentInput = prev;
    renderFromEngine(prev);
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input || !input.value) return;

    const items = JSON.parse(localStorage.getItem("items") || "[]");
    items.push(input.value);
    localStorage.setItem("items", JSON.stringify(items));
    input.value = "";

    renderFromEngine(AppState.currentInput);
  }
};
