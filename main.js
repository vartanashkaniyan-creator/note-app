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
    // TEXTAREA
    if (c.type === "textarea") {
      html += `
        <textarea
          id="${c.id}"
          placeholder="${c.placeholder || ""}"
        ></textarea>
      `;
    }

    // BUTTON
    if (c.type === "button") {
      html += `
        <button onclick="dispatchAction('${c.action}')">
          ${c.label}
        </button>
      `;
    }

    // LIST
    if (c.type === "list") {
      html += `<ul id="${c.id}"></ul>`;
      renderList(c.id);
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
    renderFromEngine("");
  },

  saveNote() {
    const text = document.getElementById("noteText")?.value || "";
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  },

  addItem() {
    const input = document.getElementById("itemInput");
    if (!input.value) return;

    const items = JSON.parse(localStorage.getItem("items") || "[]");
    items.push(input.value);
    localStorage.setItem("items", JSON.stringify(items));

    input.value = "";
    renderList("itemList");
  }
};

// ===== HELPERS =====
function renderList(listId) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;

  const items = JSON.parse(localStorage.getItem("items") || "[]");
  listEl.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listEl.appendChild(li);
  });
}
