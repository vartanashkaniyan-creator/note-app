// engine.js - FINAL WORKING VERSION

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/برو/g, "go")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;

  if (input && input !== "home") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");

      if (
        (parts[0] === "screen" || parts[0] === "go") &&
        ALLOWED_SCREENS.has(parts[1])
      ) {
        screen = parts[1];
      }

      if (parts[0] === "alert") {
        alertText = parts.slice(1).join(" ");
      }
    });
  }

  return {
    schema: getScreenSchema(screen),
    meta: { alertText }
  };
}

function getScreenSchema(screen) {
  if (screen === "note") {
    return {
      components: [
        { type: "textarea", id: "noteText", placeholder: "note" },
        { type: "button", label: "save", action: "saveNote" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  if (screen === "list") {
    return {
      components: [
        { type: "textarea", id: "itemInput", placeholder: "item" },
        { type: "button", label: "add", action: "addItem" },
        { type: "list" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  return {
    components: [
      { type: "button", label: "note", action: "openNote" },
      { type: "button", label: "list", action: "openList" },
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

window.runEngine = runEngine;
