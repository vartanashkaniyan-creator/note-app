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
    return {
      screen: "note",
      ui: {
        title: "Note",
        fields: [
          { id: "noteText", type: "textarea", placeholder: "یادداشت..." }
        ],
        buttons: [
          { id: "save", label: "ذخیره" },
          { id: "back", label: "بازگشت" }
        ]
      },
      actions: {
        save: "saveNote",
        back: "goHome"
      }
    };
  }

  // home
  return {
    screen: "home",
    ui: {
      title: "Advanced App Builder",
      fields: [
        { id: "commandInput", type: "textarea", placeholder: "مثال: screen note" }
      ],
      buttons: [
        { id: "run", label: "اجرا" }
      ]
    },
    actions: {
      run: "runCommand"
    }
  };
}
