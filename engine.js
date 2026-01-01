// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";

  // ===== PARSE COMMANDS =====
  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen note | screen home | screen list
    if (parts[0] === "screen" && parts[1]) {
      screen = parts[1];
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

  // ===== LIST SCREEN (آماده برای آینده) =====
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
`مثال:
set title تست
screen note`
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
