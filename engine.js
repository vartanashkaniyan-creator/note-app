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

    // set title
    if (parts[0] === "set" && parts[1] === "title") {
      state.title = parts.slice(2).join(" ");
    }

    // screen
    if (parts[0] === "screen") {
      state.screen = parts[1];
    }
  });

  // ===== NOTE =====
  if (state.screen === "note") {
    return buildNote(state.title);
  }

  // ===== LIST =====
  if (state.screen === "list") {
    return buildList(state.title);
  }

  // ===== DEFAULT (HOME) =====
  return buildHome(state.title);
}

// ===== SCHEMA BUILDERS =====
function buildHome(title) {
  return {
    schema: {
      title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
`دستور بنویس:
set title تست
screen note
screen list`
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}

function buildNote(title) {
  return {
    schema: {
      title,
      components: [
        { type: "textarea", id: "noteText", placeholder: "یادداشت..." },
        { type: "button", label: "ذخیره", action: "saveNote" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    }
  };
}

function buildList(title) {
  return {
    schema: {
      title,
      components: [
        { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
        { type: "button", label: "اضافه کن", action: "addItem" },
        { type: "list", id: "itemList" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    }
  };
}
