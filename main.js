// ===== GLOBAL STATE =====
const AppState = {
  history: []
};

// ===== START =====
window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const input = document.getElementById("commandInput")?.value || "";
  renderFromEngine(input, true);
}

function renderFromEngine(input, pushHistory = false) {
  if (pushHistory) {
    AppState.history.push(input);
  }

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
        <textarea id="${c.id}" placeholder="${c.placeholder || ""}"></textarea>
      `;
    }

    if (c.type === "button") {
      html += `
        <button data-action="${c.action}">${c.label}</button>
      `;
    }
  });

  app.innerHTML = html;

  // اتصال اکشن‌ها
  app.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => {
      dispatchAction(btn.dataset.action);
    };
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

    const items = JSON.parse(localStorage.getItem("items") || "[]");
    items.push(input.value.trim());
    localStorage.setItem("items", JSON.stringify(items));
    input.value = "";
    alert("آیتم اضافه شد ✅");
  }
};
