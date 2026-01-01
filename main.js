// ===== GLOBAL STATE =====
const AppState = {
  history: [],       // تاریخچه دستورات
  lastCommand: ""    // آخرین دستور
};

// ===== START =====
window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const inputEl = document.getElementById("commandInput");
  const input = inputEl ? inputEl.value : "";

  AppState.lastCommand = input;
  renderFromEngine(input, true);
}

function renderFromEngine(input, pushHistory = false) {
  const result = runEngine(input);

  if (pushHistory) {
    AppState.history.push(input);
  }

  renderUI(result.schema);
}

// ===== UI RENDERER =====
function renderUI(schema) {
  const app = document.getElementById("app");

  let html = `<h2>${schema.title}</h2>`;

  schema.components.forEach(c => {
    if (c.type === "textarea") {
      const value =
        c.id === "noteText"
          ? localStorage.getItem("note") || ""
          : "";

      html += `
        <textarea
          id="${c.id}"
          placeholder="${c.placeholder || ""}"
        >${value}</textarea>
      `;
    }

    if (c.type === "button") {
      html += `
        <button data-action="${c.action}">
          ${c.label}
        </button>
      `;
    }
  });

  app.innerHTML = html;

  // اتصال اکشن‌ها
  app.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = () => {
      const action = btn.getAttribute("data-action");
      dispatchAction(action);
    };
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
    // اگر تاریخچه خالی بود، مستقیم خانه
    if (AppState.history.length === 0) {
      renderFromEngine("");
      return;
    }

    // حذف صفحه فعلی
    AppState.history.pop();

    // گرفتن قبلی
    const prevCommand =
      AppState.history.length > 0
        ? AppState.history[AppState.history.length - 1]
        : "";

    renderFromEngine(prevCommand);
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  }
};
