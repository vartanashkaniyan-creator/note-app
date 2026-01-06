// engine.js - OUTPUT ENABLED & ADVANCED

const ALLOWED_SCREENS = new Set(["home", "note", "list"]);

function normalize(cmd) {
  return (cmd || "")
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/برو/g, "go")
    .trim();
}

function runEngine(input) {
  let screen = "home";
  let output = [];

  const lines = (input || "")
    .split("\n")
    .map(l => normalize(l))
    .filter(Boolean);

  lines.forEach(line => {
    const parts = line.split(" ");
    const cmd = parts[0];

    if ((cmd === "screen" || cmd === "go") && ALLOWED_SCREENS.has(parts[1])) {
      screen = parts[1];
    }

    if (cmd === "print") {
      output.push(parts.slice(1).join(" "));
    }

    if (cmd === "clear") {
      output = [];
    }

    if (cmd === "plugin" && parts[1] && window.PluginSystem) {
      const res = window.PluginSystem.execute(parts[1], ...parts.slice(2));
      output.push(res);
    }
  });

  return { screen, output };
}

window.runEngine = runEngine;
