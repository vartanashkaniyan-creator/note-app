// engine.js

const EngineState = {
  title: "Advanced App Builder",
  screen: "home",
  noteText: "",
  listItems: []
};

function runEngine(input) {
  if (input) {
    parseCommands(input);
  }

  return buildSchema();
}

// ===== COMMAND PARSER =====
function parseCommands(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      EngineState.title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      EngineState.screen = parts[1];
    }
  });
}

// ===== SCHEMA BUILDER =====
function buildSchema() {
  if (EngineState.screen === "note") {
    return {
      schema: {
        title: EngineState.title,
        components: [
          {
            type: "textarea",
            id: "noteText",
            placeholder: "یادداشت بنویس...",
            value: EngineState.noteText
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
            type: "list",
            id: "itemList",
            items: EngineState.listItems
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

  // ===== HOME =====
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

// ===== STATE MUTATORS (used by main.js) =====
function setNoteText(text) {
  EngineState.noteText = text;
}

function addListItem(text) {
  if (text) {
    EngineState.listItems.push(text);
  }
}

function goHome() {
  EngineState.screen = "home";
}
