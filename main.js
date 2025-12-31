// ===== STATE =====
let currentScreen = "home";

// ===== ENGINE =====
function parseCommand(input) {
  const parts = input.trim().split(" ");
  return {
    type: parts[0] || "",
    value: parts[1] || ""
  };
}

function runEngine(command) {
  const cmd = parseCommand(command);

  if (cmd.type === "screen" && cmd.value === "note") {
    currentScreen = "note";
  } else {
    currentScreen = "home";
  }

  return getScreenConfig(currentScreen);
}

function getScreenConfig(screen) {
  if (screen === "note") {
    return {
      title: "Note",
      fields: [
        { id: "noteText", type: "textarea", placeholder: "یادداشت..." }
      ],
      buttons: [
        { id: "save", label: "ذخیره" },
        { id: "back", label: "بازگشت" }
      ]
    };
  }

  // HOME
  return {
    title: "Advanced App Builder",
    fields: [
      { id: "commandInput", type: "textarea", placeholder: "مثال: screen note" }
    ],
    buttons: [
      { id: "run", label: "اجرا" }
    ]
  };
}

// ===== RENDER =====
function render(ui) {
  const app = document.getElementById("app");
  let html = `<h2>${ui.title}</h2>`;

  ui.fields.forEach(f => {
    if (f.type === "textarea") {
      html += `
        <textarea id="${f.id}" placeholder="${f.placeholder}"></textarea>
      `;
    }
  });

  ui.buttons.forEach(b => {
    html += `<button id="${b.id}">${b.label}</button>`;
  });

  app.innerHTML = html;

  // events
  ui.buttons.forEach(b => {
    const btn = document.getElementById(b.id);
    if (!btn) return;

    if (b.id === "run") {
      btn.onclick = () => {
        const cmd = document.getElementById("commandInput").value;
        render(runEngine(cmd));
      };
    }

    if (b.id === "back") {
      btn.onclick = () => {
        render(getScreenConfig("home"));
      };
    }

    if (b.id === "save") {
      btn.onclick = () => {
        alert("یادداشت ذخیره شد (فعلاً نمایشی)");
      };
    }
  });
}

// ===== INIT =====
window.onload = () => {
  render(getScreenConfig("home"));
};
