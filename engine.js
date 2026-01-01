// ===== SMART ENGINE v2 =====

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

  // ===== SCREENS =====
  switch (screen) {
    case "note":
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

    case "list":
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
              action: "addItem"
            },
            {
              type: "list",
              id: "itemList"
            },
            {
              type: "button",
              label: "بازگشت",
              action: "goHomeAction"
            }
          ]
        }
      };

    default:
      return {
        schema: {
          title,
          components: [
            {
              type: "textarea",
              id: "commandInput",
              placeholder:
`دستورات نمونه:
set title برنامه من
screen note
screen list`
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
}
