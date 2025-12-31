// main.js

window.onload = () => {
  renderHome();
};

function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Advanced App Builder</h2>
    <textarea id="commandInput" placeholder="مثال:
set title تست
screen note"></textarea>
    <button id="runBtn">اجرا</button>
  `;

  document.getElementById("runBtn").onclick = runCommand;
}

function runCommand() {
  const input = document.getElementById("commandInput").value;
  const result = runEngine(input);

  renderUI(result.ui);
}

// ===== UI RENDERER =====
function renderUI(ui) {
  const app = document.getElementById("app");

  let html = `<h2>${ui.title}</h2>`;

  ui.fields.forEach(f => {
    if (f.type === "textarea") {
      html += `<textarea id="${f.id}" placeholder="${f.placeholder}"></textarea>`;
    }
  });

  ui.buttons.forEach(b => {
    html += `<button onclick="${b.action}()">${b.label}</button>`;
  });

  app.innerHTML = html;
}

// ===== ACTIONS =====
function goHome() {
  renderHome();
}

function saveNote() {
  const text = document.getElementById("noteText").value;
  localStorage.setItem("note", text);
  alert("ذخیره شد ✅");
}
