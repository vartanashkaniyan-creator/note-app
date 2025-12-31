function runEngine(command) {
  if (command.includes("note")) {
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
      }
    };
  }

  return {
    screen: "home",
    ui: {
      title: "Advanced App Builder",
      fields: [
        { id: "commandInput", type: "textarea", placeholder: "دستور را وارد کن..." }
      ],
      buttons: [
        { id: "run", label: "اجرا" }
      ]
    }
  };
}
