// main.js

window.onload = () => {
  goHome();
};

// ===== HOME =====
function goHome() {
  const result = runEngine("");
  renderSchema(result.schema);
}

// ===== RUN COMMAND =====
function runCommand() {
  const input = document.getElementById("commandInput").value;
  const result = runEngine(input);
  renderSchema(result.schema);
}

// ===== RENDER ENGINE OUTPUT =====
function renderSchema(schema) {
  const app = document.getElementById("app");
  if (!schema) return;

  let html = `<h2>${schema.title || ""}</h2>`;

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
function saveNote() {
  const text = document.getElementById("noteText").value;
  localStorage.setItem("note", text);
  alert("ذخیره شد ✅");
}

function goHomeAction() {
  goHome();
}
