function runEngine(command) {
  command = command.toLowerCase().trim();

  // صفحه نوت
  if (command === "note") {
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

  // صفحه اصلی
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
    },
    actions: {
      run: "runCommand"
    }
  };
}
