// main.js

window.onload = () => {
  renderFromEngine("");
};

// ===== CORE =====
function runCommand() {
  const inputEl = document.getElementById("commandInput");
  const input = inputEl ? inputEl.value : "";
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
  });

  app.innerHTML = html;

  // اتصال اکشن‌ها بعد از رندر
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
    renderFromEngine("");
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  }
};
