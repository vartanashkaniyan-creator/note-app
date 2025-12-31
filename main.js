// main.js

window.onload = () => {
  showHome();
};

// ===== HOME =====
function showHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Advanced App Builder</h2>

    <textarea
      id="commandInput"
      placeholder="مثال:
set title تست
screen note"
      rows="5"
    ></textarea>

    <button id="runBtn">اجرا</button>
  `;

  document.getElementById("runBtn").onclick = runCommand;
}

// ===== RUN COMMAND =====
function runCommand() {
  const input = document.getElementById("commandInput").value.trim();
  if (!input) return;

  const result = runEngine(input);
  renderFromSchema(result.schema);
}

// ===== RENDERER (خیلی مهم) =====
function renderFromSchema(schema) {
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
        <button onclick="${c.action}()">
          ${c.label}
        </button>
      `;
    }
  });

  app.innerHTML = html;
}

// ===== ACTIONS =====
function goHome() {
  showHome();
}

function saveNote() {
  const text = document.getElementById("noteText").value;
  localStorage.setItem("note", text);
  alert("ذخیره شد ✅");
}
