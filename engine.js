// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let state = {
    title: "Advanced App Builder",
    screen: "home"
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
  });

  return buildScreen(state);
}

// ===== SCREEN FACTORY =====
function buildScreen(state) {
  if (state.screen === "note") {
    return {
      screen: "note",
      schema: {
        title: state.title,
        components: [
          {
            type: "textarea",
            id: "noteText",
            placeholder: "یادداشت..."
          },
          {
            type: "button",
            label: "ذخیره",
            action: "saveNote"
          },
          {
            type: "button",
            label: "بازگشت",
            action: "goHome"
          }
        ]
      }
    };
  }

  // HOME (پیش‌فرض)
  return {
    screen: "home",
    schema: {
      title: state.title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder: "مثال:\nset title تست\nscreen note"
        },
        {
          type: "button",
          label: "اجرا",
          action: "runCommand"
        }
      ]
    }
  };
}
