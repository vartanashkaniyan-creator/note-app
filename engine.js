// engine.js - FIXED & STABLE
const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/سلام/g, "alert سلام") // مثال ساده alert فارسی
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;
  let pluginCommand = null;

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");
      const cmd = parts[0];

      // صفحه‌ها
      if ((cmd === "screen" || cmd === "go") && parts[1]) {
        if (ALLOWED_SCREENS.has(parts[1])) screen = parts[1];
      }

      // alert
      if (cmd === "alert") {
        alertText = parts.slice(1).join(" ");
      }

      // plugin
      if (cmd === "plugin" && parts[1]) {
        pluginCommand = parts.slice(1).join(" ");
      }
    });
  }

  return {
    schema: getScreenSchema(screen),
    meta: { alertText, pluginCommand, currentScreen: screen }
  };
}

// ===== SCHEMA DEFINITIONS =====
function getScreenSchema(screen) {
  if (screen === "note") {
    return {
      title: "note",
      components: [
        { type: "textarea", id: "noteText", placeholder: "note" },
        { type: "button", label: "save", action: "saveNote" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  if (screen === "list") {
    return {
      title: "list",
      components: [
        { type: "textarea", id: "itemInput", placeholder: "item" },
        { type: "button", label: "add", action: "addItem" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "back", action: "goHomeAction" }
      ]
    };
  }

  // HOME
  return {
    title: "title",
    components: [
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

// ===== EXPORT =====
window.runEngine = runEngine;
