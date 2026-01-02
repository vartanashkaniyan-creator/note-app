// engine.js - FINAL STABLE VERSION
// Compatible 100% with main.js (FA + EN)

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;

  if (typeof input === "string" && input !== "home") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");
      if ((parts[0] === "screen" || parts[0] === "go") && parts[1]) {
        if (ALLOWED_SCREENS.has(parts[1])) {
          screen = parts[1];
        }
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

// ===== SCHEMA DEFINITIONS =====
function getScreenSchema(screen) {
  if (screen === "note") {
    return {
      title: "note",
      components: [
        {
          type: "textarea",
          id: "noteText",
          placeholder: "note"
        },
        {
          type: "button",
          label: "save",
          action: "saveNote"
        },
        {
          type: "button",
          label: "back",
          action: "goHomeAction"
        }
      ]
    };
  }

  if (screen === "list") {
    return {
      title: "list",
      components: [
        {
          type: "textarea",
          id: "itemInput",
          placeholder: "item"
        },
        {
          type: "button",
          label: "add",
          action: "addItem"
        },
        {
          type: "list",
          id: "itemsList"
        },
        {
          type: "button",
          label: "back",
          action: "goHomeAction"
        }
      ]
    };
  }

  // ===== HOME =====
  return {
    title: "title",
    components: [
      {
        type: "button",
        label: "note",
        action: "openNote"
      },
      {
        type: "button",
        label: "list",
        action: "openList"
      },
      {
        type: "textarea",
        id: "commandInput",
        placeholder: "commands"
      },
      {
        type: "button",
        label: "execute",
        action: "runCommand"
      }
    ]
  };
}

// ===== EXPORT =====
window.runEngine = runEngine;
