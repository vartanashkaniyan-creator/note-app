// main.js

window.onload = () => {
  // صفحه شروع
  render(
    {
      title: "Advanced App Builder",
      fields: [
        {
          id: "commandInput",
          type: "textarea",
          placeholder: "مثال: screen note"
        }
      ],
      buttons: [
        { id: "run", label: "اجرا" }
      ]
    },
    {
      run: "runCommand"
    }
  );
};

function render(ui, actions) {
  const app = document.getElementById("app");
  let html = `<h2>${ui.title}</h2>`;

  // فیلدها
  ui.fields.forEach(f => {
    if (f.type === "textarea") {
      html += `
        <textarea id="${f.id}" placeholder="${f.placeholder}"></textarea>
      `;
    }
  });

  // دکمه‌ها
  ui.buttons.forEach(b => {
    html += `<button id="${b.id}">${b.label}</button>`;
  });

  app.innerHTML = html;

  // اتصال اکشن‌ها
  Object.keys(actions).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = () => handleAction(actions[btnId]);
    }
  });
}

function handleAction(action) {
  if (action === "runCommand") {
    const cmd = document.getElementById("commandInput").value;
    const result = runEngine(cmd);
    render(result.ui, result.actions);
  }

  if (action === "goHome") {
    window.onload();
  }

  if (action === "saveNote") {
    const text = document.getElementById("noteText").value;
    localStorage.setItem("note", text);
    alert("ذخیره شد");
  }
}
