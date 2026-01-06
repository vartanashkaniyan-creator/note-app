// engine.js - Advanced Engine v3
const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

let variables = {}; // ذخیره متغیرها

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/تکرار/g, "loop")
    .replace(/پایان تکرار/g, "endloop")
    .replace(/بذار/g, "set")
    .replace(/هشدار/g, "alert")
    .trim();
}

// جایگذاری متغیرها در متن
function interpolate(text) {
  return text.replace(/\{([a-zA-Z0-9_]+)\}/g, (m, v) => {
    return variables[v] !== undefined ? variables[v] : `{${v}}`;
  });
}

function runEngine(input) {
  let screen = "home";
  let alertText = null;
  variables = {}; // ریست متغیرها در هر اجرای جدید

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    const stack = []; // برای حلقه‌ها
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const parts = line.split(" ");
      const cmd = parts[0];

      // حلقه
      if (cmd === "loop" && parts[1]) {
        const count = parseInt(parts[1]);
        if (!isNaN(count) && count > 0) {
          const loopLines = [];
          i++;
          // جمع آوری خطوط داخل حلقه
          while (i < lines.length && lines[i] !== "endloop") {
            loopLines.push(lines[i]);
            i++;
          }
          // اجرای حلقه
          for (let j = 0; j < count; j++) {
            loopLines.forEach(l => executeLine(l));
          }
        }
      } else {
        executeLine(line);
      }

      i++;
    }
  }

  return {
    schema: getScreenSchema(screen),
    meta: { alertText, variables, currentScreen: screen }
  };
}

// اجرای یک خط دستور
function executeLine(line) {
  const parts = line.split(" ");
  const cmd = parts[0];

  if (cmd === "screen" || cmd === "go") {
    if (parts[1] && ALLOWED_SCREENS.has(parts[1])) {
      currentScreen = parts[1];
    }
  } else if (cmd === "alert") {
    const text = parts.slice(1).join(" ");
    alertText = interpolate(text);
    // alert(alertText); // اجرای alert توسط main.js
  } else if (cmd === "set" && parts[1]) {
    const varName = parts[1];
    const value = parts.slice(2).join(" ");
    // بررسی جایگذاری متغیرها در مقدار
    variables[varName] = interpolate(value);
  } else if (cmd === "plugin" && parts[1] && window.PluginSystem) {
    window.PluginSystem.execute(parts[1], ...parts.slice(2));
  }
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
    title: "home",
    components: [
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

window.runEngine = runEngine;
