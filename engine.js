// engine.js
// ===== SIMPLE & STABLE ENGINE v2 =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";
  let addValue = null;

  // ===== PARSER =====
  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen note | screen list
    if (parts[0] === "screen") {
      screen = parts[1];
    }

    // add something
    if (parts[0] === "add") {
      addValue = parts.slice(1).join(" ");
      screen = "list";
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
        meta: {
          addValue
        },
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

  // ===== HOME SCREEN =====
  return {
    schema: {
      title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
            "دستورها:\nset title تست\nscreen note\nscreen list\nadd سیب"
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
