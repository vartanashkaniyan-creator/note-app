// engine.js

const EngineState = {
  title: "Advanced App Builder",
  screen: "home"
};

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  // پردازش همه دستورات (نه فقط آخری)
  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      EngineState.title = parts.slice(2).join(" ");
    }

    // screen xxx
    if (parts[0] === "screen") {
      EngineState.screen = parts[1];
    }
  });

  return buildSchema();
}

// =====================
// SCHEMA BUILDER
// =====================
function buildSchema() {
  if (EngineState.screen === "note") {
    return {
      schema: {
        title: EngineState.title,
        components: [
          {
            type: "textarea",
            id: "noteText",
            placeholder: "یادداشت بنویس..."
          },
          {
            type: "button",
            label: "ذخیره",
            action: "saveNote"
          },
          {
            type: "button",
            label: "بازگشت",
            action: "goHomeAction"
          }
        ]
      }
    };
  }

  if (EngineState.screen === "list") {
    return {
      schema: {
        title: EngineState.title,
        components: [
          {
            type: "textarea",
            id: "itemInput",
            placeholder: "آیتم جدید..."
          },
          {
            type: "button",
            label: "اضافه کن",
            action: "addItem"
          },
          {
            type: "button",
            label: "بازگشت",
            action: "goHomeAction"
          }
        ]
      }
    };
  }

  // HOME
  return {
    schema: {
      title: EngineState.title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
            "مثال:\nset title تست\nscreen note\nscreen list"
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
