// engine.js
function runEngine(input) {
  let screen = input || "home";
  let title = "Advanced App Builder";

  // ===== SCREENS =====
  if (screen === "note") {
    return {
      schema: {
        title: "یادداشت‌ها",
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHome" }
        ]
      }
    };
  }

  if (screen === "list") {
    return {
      schema: {
        title: "لیست من",
        components: [
          { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
          { type: "button", label: "اضافه کن", action: "addItem" },
          { type: "list", id: "itemsList" },
          { type: "button", label: "بازگشت", action: "goHome" }
        ]
      }
    };
  }

  // ===== HOME =====
  return {
    schema: {
      title: "صفحه اصلی",
      components: [
        { type: "button", label: "یادداشت‌ها", action: "goNote" },
        { type: "button", label: "لیست", action: "goList" }
      ]
    }
  };
}
