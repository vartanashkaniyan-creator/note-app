// ===== SMART ENGINE v3 (STATEFUL) =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";

  // ===== STATE =====
  const state = {
    hasNote: !!localStorage.getItem("note"),
    hasItems: JSON.parse(localStorage.getItem("items") || "[]").length > 0
  };

  // ===== PARSER =====
  lines.forEach(line => {
    const parts = line.split(" ");

    // set title xxx
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen xxx
    if (parts[0] === "screen") {
      screen = parts[1];
    }

    // شرط ساده
    // if hasNote screen note
    if (parts[0] === "if") {
      const condition = parts[1];
      const action = parts[2];
      const target = parts[3];

      if (condition === "hasNote" && state.hasNote) {
        if (action === "screen") screen = target;
      }

      if (condition === "hasItems" && state.hasItems) {
        if (action === "screen") screen = target;
      }
    }
  });

  // ===== SCREENS =====
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
`مثال‌ها:
if hasNote screen note
if hasItems screen list
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
