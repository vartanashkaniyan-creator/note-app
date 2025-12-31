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

    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
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

  // ===== CALCULATOR SCREEN =====
  if (screen === "calculator") {
    return {
      schema: {
        title,
        components: [
          {
            type: "input",
            id: "a",
            placeholder: "عدد اول"
          },
          {
            type: "input",
            id: "b",
            placeholder: "عدد دوم"
          },
          {
            type: "button",
            label: "جمع",
            action: "calcAdd"
          },
          {
            type: "text",
            id: "result"
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
          placeholder: "مثال:\nset title تست\nscreen note\nscreen calculator"
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
