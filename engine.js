// engine.js

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      screen = parts[1];
    }
  });

  // ===== NOTE =====
  if (screen === "note") {
    return {
      schema: {
        title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHomeAction" }
        ]
      }
    };
  }

  // ===== LIST =====
  if (screen === "list") {
    return {
      schema: {
        title,
        components: [
          { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
          { type: "button", label: "اضافه کن", action: "addItem" },
          { type: "list", id: "itemList" },
          { type: "button", label: "بازگشت", action: "goHomeAction" }
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
          placeholder: "مثال:\nset title تست\nscreen note\nscreen list"
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
