// engine.js
// ===== ENGINE v2 with BACK COMMAND =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";
  let command = null;

  // ===== PARSER =====
  lines.forEach(line => {
    const parts = line.split(" ");

    if (line === "back") {
      command = "back";
    }

    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      screen = parts[1];
    }
  });

  // ===== BACK COMMAND =====
  if (command === "back") {
    return {
      command: "back"
    };
  }

  // ===== NOTE SCREEN =====
  if (screen === "note") {
    return {
      schema: {
        title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goBack" }
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
          { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
          { type: "button", label: "اضافه کن", action: "addItem" },
          { type: "list", id: "itemList" },
          { type: "button", label: "بازگشت", action: "goBack" }
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
            "مثال:\nscreen note\nscreen list\nback"
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
