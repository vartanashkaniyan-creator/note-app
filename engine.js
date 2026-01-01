// engine.js

// ===== GLOBAL ENGINE STATE =====
const EngineState = {
  notes: [],
  list: []
};

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";

  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen note / list
    if (parts[0] === "screen") {
      screen = parts[1];
    }

    // add item ...
    if (parts[0] === "add" && parts[1] === "item") {
      const text = parts.slice(2).join(" ");
      if (text) EngineState.list.push(text);
    }
  });

  // ===== NOTE SCREEN =====
  if (screen === "note") {
    return {
      schema: {
        title,
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

  // ===== LIST SCREEN =====
  if (screen === "list") {
    return {
      schema: {
        title,
        components: [
          {
            type: "textarea",
            id: "itemInput",
            placeholder: "آیتم جدید..."
          },
          {
            type: "button",
            label: "اضافه کن",
            action: "addItemAction"
          },
          {
            type: "list",
            items: EngineState.list
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
      title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
            "مثال:\nset title تست\nscreen note\nscreen list\nadd item خرید نان"
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
