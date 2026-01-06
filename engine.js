// engine.js – v3 (Variables Enabled)
// Compatible with your current main.js

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

// حافظه متغیرها
const VARS = {};

function normalize(cmd) {
  if (typeof cmd !== "string") return "";

  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/بذار/g, "set")
    .replace(/هشدار/g, "alert")
    .trim();
}

// جایگزینی {var}
function interpolate(text) {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return VARS[key] !== undefined ? VARS[key] : `{${key}}`;
  });
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");
      const cmd = parts[0];

      // تغییر صفحه
      if ((cmd === "screen" || cmd === "go") && parts[1]) {
        if (ALLOWED_SCREENS.has(parts[1])) {
          screen = parts[1];
        }
      }

      // تعریف متغیر
      if (cmd === "set" && parts.length >= 3) {
        const key = parts[1];
        const value = parts.slice(2).join(" ");
        VARS[key] = value;
      }

      // alert با متغیر
      if (cmd === "alert") {
        alertText = interpolate(parts.slice(1).join(" "));
      }
    });
  }

  return {
    schema: getScreenSchema(screen),
    meta: { alertText }
  };
}

// ===== UI SCHEMA =====
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
    title: "home",
    components: [
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

// EXPORT
window.runEngine = runEngine;
window.__ENGINE_VARS__ = VARS; // فقط برای دیباگ
