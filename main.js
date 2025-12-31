// ===== STATE =====
let currentScreen = "home";

// ===== ACTIONS =====
const actions = {
  runCommand() {
    const cmd = document.getElementById("commandInput").value;
    const result = runEngine(cmd);
    render(result.ui);
  },

  goHome() {
    render(runEngine("").ui);
  },

  saveNote() {
    const text = document.getElementById("noteText").value;
    localStorage.setItem("note", text);
    alert("ذخیره شد ✅");
  }
};

// ===== RENDER =====
function render(ui) {
  const app = document.getElementById("app");
  let html = `<h2>${ui.title}</h2>`;

  ui.fields.forEach(f => {
    if (f.type === "textarea") {
      html += `<textarea id="${f.id}" placeholder="${f.placeholder}"></textarea>`;
    }
  });

  ui.buttons.forEach(b => {
    html += `<button id="${b.id}">${b.label}</button>`;
  });

  app.innerHTML = html;

  ui.buttons.forEach(b => {
    const btn = document.getElementById(b.id);
    if (btn && actions[b.action]) {
      btn.onclick = actions[b.action];
    }
  });
}

// ===== INIT =====
window.onload = () => {
  const result = runEngine("");
  render(result.ui);
};
