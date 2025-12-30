// engine.js

function runEngine(command) {
  command = command.toLowerCase();

  if (command.includes("note") || command.includes("یادداشت")) {
    return apps.note();
  }

  if (command.includes("calc") || command.includes("calculator") || command.includes("ماشین")) {
    return apps.calculator();
  }

  return {
    ui: "<p>❌ دستور شناخته نشد</p>",
    logic: ""
  };
}
