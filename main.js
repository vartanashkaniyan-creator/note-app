function render(ui, actions) {
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

  // اتصال اکشن‌ها
  Object.keys(actions).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) btn.onclick = () => handleAction(actions[btnId]);
  });
}
