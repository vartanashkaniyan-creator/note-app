// ===== ENGINE.JS =====

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  if (typeof cmd !== "string") return "";
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .replace(/اگر/g, "if")
    .replace(/خالی/g, "empty")
    .replace(/نباشد|نیست/g, "not")
    .replace(/تاخیر|مکث/g, "delay")
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let actions = [];

  if (typeof input === "string" && input.trim() !== "") {
    const lines = input
      .split("\n")
      .map(l => normalize(l))
      .filter(Boolean);

    lines.forEach(line => {
      const parts = line.split(" ");
      const cmd = parts[0];

      // تغییر صفحه
      if ((cmd === "screen" || cmd === "go") && ALLOWED_SCREENS.has(parts[1])) {
        screen = parts[1];
      }

      // alert
      if (cmd === "alert") {
        actions.push({ type: "alert", text: parts.slice(1).join(" ") });
      }

      // delay
      if (cmd === "delay") {
        actions.push({ type: "delay", time: Number(parts[1]) || 1 });
      }

      // شرط
      if (cmd === "if") {
        actions.push({ type: "if", condition: parts.slice(1).join(" ") });
      }
    });
  }

  return {
    schema: getScreenSchema(screen),
    actions,
    currentScreen: screen
  };
}

function getScreenSchema(screen) {
  if (screen === "note") {
    return {
      title: "note",
      components: [
        { type: "textarea", id: "noteText", placeholder: "یادداشت..." },
        { type: "button", label: "ذخیره", action: "saveNote" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    };
  }

  if (screen === "list") {
    return {
      title: "list",
      components: [
        { type: "textarea", id: "itemInput", placeholder: "آیتم..." },
        { type: "button", label: "افزودن", action: "addItem" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    };
  }

  return {
    title: "home",
    components: [
      { type: "textarea", id: "commandInput", placeholder: "دستور بنویس..." },
      { type: "button", label: "اجرا", action: "runCommand" }
    ]
  };
}

window.runEngine = runEngine;
