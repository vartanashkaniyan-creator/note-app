window.onload = () => {
  const app = document.getElementById("app");

  function renderScreen(screenData) {
    let html = `<h2>${screenData.ui.title}</h2>`;

    // فیلدها
    screenData.ui.fields.forEach(field => {
      if (field.type === "textarea") {
        html += `
          <textarea id="${field.id}" placeholder="${field.placeholder}"></textarea>
        `;
      }
    });

    // دکمه‌ها
    screenData.ui.buttons.forEach(btn => {
      html += `
        <button data-action="${btn.id}">${btn.label}</button>
      `;
    });

    app.innerHTML = html;

    // اکشن دکمه‌ها
    app.querySelectorAll("button").forEach(button => {
      button.onclick = () => handleAction(button.dataset.action);
    });
  }

  function handleAction(action) {
    if (action === "run") {
      const command = document.getElementById("commandInput").value;
      const result = runEngine(command);
      renderScreen(result);
    }

    if (action === "back") {
      const result = runEngine("");
      renderScreen(result);
    }

    if (action === "save") {
      const text = document.getElementById("noteText").value;
      alert("ذخیره شد:\n" + text);
    }
  }

  // اجرای صفحه اولیه
  const home = runEngine("");
  renderScreen(home);
};
