// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let state = {
    title: "Advanced App Builder",
    screen: "home",
    alerts: [],
    logs: [],
    clear: false
  };

  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      state.title = parts.slice(2).join(" ");
    }

    // screen note / home
    if (parts[0] === "screen") {
      state.screen = parts[1];
    }

    // alert ...
    if (parts[0] === "alert") {
      state.alerts.push(parts.slice(1).join(" "));
    }

    // log ...
    if (parts[0] === "log") {
      state.logs.push(parts.slice(1).join(" "));
    }

    // clear
    if (parts[0] === "clear") {
      state.clear = true;
    }
  });

  return buildScreen(state);
}

// ===== SCREEN FACTORY =====
function buildScreen(state) {

  // اجرای alertها
  state.alerts.forEach(msg => alert(msg));
  state.logs.forEach(msg => console.log("ENGINE:", msg));

  if (state.clear) {
    return {
      screen: "clear",
      schema: {
        title: state.title,
        components: []
      }
    };
  }

  if (state.screen === "note") {
    return {
      screen: "note",
      schema: {
        title: state.title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHome" }
        ]
      }
    };
  }

  // HOME
  return {
    screen: "home",
    schema: {
      title: state.title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
`مثال:
set title تست
alert سلام
screen note`
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
           }
