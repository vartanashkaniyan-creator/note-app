// ===== ENGINE.JS =====
// موتور تحلیل دستورات (مرحله ۱)

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(line) {
  return line
    .toLowerCase()
    .trim()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go");
}

function runEngine(input) {
  let screen = "home";
  let actions = [];

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input.split("\n").map(normalize).filter(Boolean);

    for (const line of lines) {
      const parts = line.split(" ");
      const cmd = parts[0];

      // تغییر صفحه
      if ((cmd === "screen" || cmd === "go") && ALLOWED_SCREENS.has(parts[1])) {
        screen = parts[1];
      }

      // پیام
      if (cmd === "alert") {
        actions.push({
          type: "alert",
          text: parts.slice(1).join(" ")
        });
      }

      // تأخیر
      if (cmd === "delay") {
        const sec = Number(parts[1]);
        if (!isNaN(sec)) {
          actions.push({
            type: "delay",
            time: sec
          });
        }
      }

      // شرط
      if (cmd === "if") {
        actions.push({
          type: "if",
          condition: parts.slice(1).join(" ")
        });
      }
    }
  }

  return {
    schema: getScreenSchema(screen),
    actions
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
      { type: "textarea", id: "commandInput", placeholder: "commands" },
      { type: "button", label: "execute", action: "runCommand" }
    ]
  };
}

window.runEngine = runEngine;
