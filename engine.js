// ===== ENGINE v5 =====

const EngineState = {
  vars: {}
};

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(l => l);

  let lastUI = null;

  lines.forEach(line => {
    const parts = line.split(" ");
    const cmd = parts[0];

    // ===== SET VARIABLE =====
    if (cmd === "set") {
      const key = parts[1];
      const value = parts.slice(2).join(" ");
      EngineState.vars[key] = value;
    }

    // ===== SCREEN =====
    if (cmd === "screen") {
      const target = parts[1];
      lastUI = buildScreen(target);
    }
  });

  // اگر دستوری نبود → Home
  return lastUI || buildScreen("home");
}

// ===== SCREENS =====
function buildScreen(name) {
  if (name === "note") {
    return {
      ui: {
        title: EngineState.vars.title || "Note",
        fields: [
          { id: "noteText", type: "textarea", placeholder: "یادداشت..." }
        ],
        buttons: [
          { id: "save", label: "ذخیره", action: "saveNote" },
          { id: "back", label: "بازگشت", action: "goHome" }
        ]
      }
    };
  }

  // HOME
  return {
    ui: {
      title: "Advanced App Builder",
      fields: [
        {
          id: "commandInput",
          type: "textarea",
          placeholder: "مثال:\nset title تست\nscreen note"
        }
      ],
      buttons: [
        { id: "run", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
