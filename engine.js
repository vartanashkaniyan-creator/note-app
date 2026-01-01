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
    executeLine(line, state);
  });

  switch (state.screen) {
    case "note":
      return buildNote(state.title);
    case "list":
      return buildList(state.title);
    default:
      return buildHome(state.title);
  }
}

// ===== LINE EXECUTOR =====
function executeLine(line, state) {
  // شرط ساده
  if (line.startsWith("if ")) {
    const parts = line.replace("if ", "").split(" ");
    if (parts[0] === "screen=home" && state.screen === "home") {
      if (parts[1] === "screen" && parts[2]) {
        state.screen = parts[2];
      }
    }
    return;
  }

  const parts = line.split(" ");

  // set title
  if (parts[0] === "set" && parts[1] === "title") {
    state.title = parts.slice(2).join(" ");
  }

  // screen + پارامتر
  if (parts[0] === "screen") {
    state.screen = parts[1];

    parts.slice(2).forEach(p => {
      const [key, value] = p.split("=");
      if (key === "title") {
        state.title = value.replaceAll("_", " ");
      }
    });
  }
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
`مثال:
screen note
screen list
screen note title=یادداشت_من
if screen=home screen note`
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
        { type: "textarea", id: "itemInput", placeholder: "آیتم..." },
        { type: "button", label: "اضافه کن", action: "addItem" },
        { type: "list", id: "itemList" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    }
  };
}
