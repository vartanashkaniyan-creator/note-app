// engine.js - FINAL FIXED VERSION
// پشتیبانی از دستورات plugin و صفحات

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/پلاگین/g, "plugin")
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;
  let pluginCommand = null;

  if (typeof input === "string" && input !== "home") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");
      
      // تغییر صفحه
      if ((parts[0] === "screen" || parts[0] === "go") && parts[1]) {
        if (ALLOWED_SCREENS.has(parts[1])) {
          screen = parts[1];
        }
      }

      // نمایش هشدار
      if (parts[0] === "alert") {
        alertText = parts.slice(1).join(" ");
      }

      // فرمان پلاگین
      if (parts[0] === "plugin" && parts[1]) {
        pluginCommand = parts.slice(1).join(" ");
      }
    });
  }

  const schema = pluginCommand ? {
    title: "plugin",
    components: [
      {
        type: "textarea",
        id: "pluginOutput",
        placeholder: "plugin output",
        value: window.PluginSystem ? window.PluginSystem.execute(pluginCommand) : "پلاگین یافت نشد"
      },
      {
        type: "button",
        label: "back",
        action: "goHomeAction"
      }
    ]
  } : getScreenSchema(screen);

  return {
    schema,
    meta: { alertText }
  };
}

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

  return {
    title: "home",
    components: [
      { type: "button", label: "note", action: "openNote" },
      { type: "button", label: "list", action: "openList" },
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

// EXPORT
window.runEngine = runEngine;
