// ===== ENGINE =====

function parseCommand(input) {
  const parts = input.trim().toLowerCase().split(" ");
  return {
    action: parts[0] || "",
    target: parts[1] || ""
  };
}

function runEngine(command) {
  const cmd = parseCommand(command);

  if (cmd.action === "screen" && cmd.target === "note") {
    return {
      screen: "note",
      ui: {
        title: "Note",
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

  // HOME (default)
  return {
    screen: "home",
    ui: {
      title: "Advanced App Builder",
      fields: [
        {
          id: "commandInput",
          type: "textarea",
          placeholder: "مثال: screen note"
        }
      ],
      buttons: [
        { id: "run", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
