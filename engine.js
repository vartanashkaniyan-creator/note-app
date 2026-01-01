// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const state = {
    title: "Advanced App Builder",
    screen: "home"
  };

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      state.title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      state.screen = parts[1];
    }
  });

  // ===== NOTE =====
  if (state.screen === "note") {
    return {
      schema: {
        title: state.title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHomeAction" }
        ]
      }
    };
  }

  // ===== LIST =====
  if (state.screen === "list") {
    return {
      schema: {
        title: state.title,
        components: [
          { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
          { type: "button", label: "اضافه کن", action: "addItem" },
          { type: "list", id: "itemList" },
          { type: "button", label: "بازگشت", action: "goHomeAction" }
        ]
      }
    };
  }

  // ===== HOME =====
  return {
    schema: {
      title: state.title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
`مثال:
set title لیست من
screen list`
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
