// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  // ===== STATE =====
  const state = {
    title: "Advanced App Builder",
    screen: "home"
  };

  // ===== PARSE COMMANDS =====
  lines.forEach(line => {
    const parts = line.split(" ");

    // set title xxx
    if (parts[0] === "set" && parts[1] === "title") {
      state.title = parts.slice(2).join(" ");
    }

    // screen note / screen list
    if (parts[0] === "screen") {
      state.screen = parts[1];
    }
  });

  // ===== SCREENS =====
  if (state.screen === "note") {
    return {
      schema: {
        title: state.title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHomeAction" }
        ]
      }
    };
  }

  if (state.screen === "list") {
    return {
      schema: {
        title: state.title,
        components: [
          { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
          { type: "button", label: "اضافه کن", action: "addItem" },
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
set title برنامه من
screen note
screen list`
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
