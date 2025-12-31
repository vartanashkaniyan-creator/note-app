// ===== STATE =====
let currentScreen = "home";

// ===== ENGINE =====
function parseCommand(input) {
  const parts = input.trim().split(" ");
  return {
    action: parts[0] || "",
    target: parts[1] || ""
  };
}

function handleCommand(command) {
  const cmd = parseCommand(command);

  if (cmd.action === "screen") {
    if (cmd.target === "note") currentScreen = "note";
    if (cmd.target === "about") currentScreen = "about";
    if (cmd.target === "home") currentScreen = "home";
  }
}

// ===== SCREENS =====
function getScreen() {
  if (currentScreen === "note") {
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

  if (currentScreen === "about") {
    return {
      title: "About",
      fields: [],
      buttons: [
        { id: "back", label: "بازگشت" }
      ]
    };
  }

  // HOME
  return {
    title: "Advanced App Builder",
    fields: [
      {
        id: "commandInput",
        type: "textarea",
        placeholder: "مثال: screen note | screen about"
      }
    ],
    buttons: [
      { id: "run", label: "اجرا" }
    ]
  };
}

// ===== RENDER =====
function render() {
  const ui = getScreen();
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

  // events
  ui.buttons.forEach(b => {
    const btn = document.getElementById(b.id);
    if (!btn) return;

    if (b.id === "run") {
      btn.onclick = () => {
        const cmd = document.getElementById("commandInput").value;
        handleCommand(cmd);
        render();
      };
    }

    if (b.id === "back") {
      btn.onclick = () => {
        currentScreen = "home";
        render();
      };
    }

    if (b.id === "save") {
      btn.onclick = () => {
        alert("یادداشت ذخیره شد (مرحله بعدی ذخیره واقعی)");
      };
    }
  });
}

// ===== INIT =====
window.onload = render;
