// engine.js
// ===== STABLE COMMAND ENGINE v2 =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";
  let alertText = null;
  let autoSave = false;

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

    // alert متن
    if (parts[0] === "alert") {
      alertText = parts.slice(1).join(" ");
    }

    // save auto
    if (parts[0] === "save" && parts[1] === "auto") {
      autoSave = true;
    }

    // clear
    if (parts[0] === "clear") {
      screen = "home";
      title = "Advanced App Builder";
    }
  });

  // ===== NOTE SCREEN =====
  if (screen === "note") {
    return {
      meta: {
        alertText,
        autoSave
      },
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
      meta: {
        alertText
      },
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

  // ===== HOME SCREEN =====
  return {
    meta: {
      alertText
    },
    schema: {
      title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
            "مثال:\nset title تست\nscreen note\nalert سلام\nsave auto"
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
