// engine.js
// ===== CONDITIONAL ENGINE v3 =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";
  let alertText = null;

  let conditionPassed = true;

  lines.forEach((line, index) => {
    const parts = line.split(" ");

    // ===== IF CONDITION =====
    if (parts[0] === "if") {
      conditionPassed = false;

      // if note not_empty
      if (parts[1] === "note" && parts[2] === "not_empty") {
        const note = localStorage.getItem("note");
        conditionPassed = !!note;
      }

      // if list count > 0
      if (parts[1] === "list" && parts[2] === "count" && parts[3] === ">" && parts[4] === "0") {
        const items = JSON.parse(localStorage.getItem("items") || "[]");
        conditionPassed = items.length > 0;
      }

      return;
    }

    // اگر شرط رد شده، این خط اجرا نشه
    if (!conditionPassed) return;

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen ...
    if (parts[0] === "screen") {
      screen = parts[1];
    }

    // alert ...
    if (parts[0] === "alert") {
      alertText = parts.slice(1).join(" ");
    }
  });

  // ===== NOTE SCREEN =====
  if (screen === "note") {
    return {
      meta: { alertText },
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

  // ===== LIST SCREEN =====
  if (screen === "list") {
    return {
      meta: { alertText },
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
    meta: { alertText },
    schema: {
      title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder:
            "مثال:\nif note not_empty\nalert یادداشت داری\nscreen note"
        },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
