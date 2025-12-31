// main.js

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
        >${c.value || ""}</textarea>
      `;
    }

    if (c.type === "button") {
      html += `
        <button onclick="dispatchAction('${c.action}')">
          ${c.label}
        </button>
      `;
    }

    if (c.type === "list") {
      html += `<ul id="${c.id}">`;
      (c.items || []).forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += `</ul>`;
    }
  });

  app.innerHTML = html;
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
    goHome();
    renderFromEngine("");
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    setNoteText(text);
    alert("یادداشت ذخیره شد ✅");
  },

  addItem() {
    const text = document.getElementById("itemInput")?.value || "";
    addListItem(text);
    renderFromEngine("");
  }
};
