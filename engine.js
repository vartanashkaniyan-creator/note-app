// engine.js
// ===== PROFESSIONAL ENGINE v2 =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  // ===== DEFAULT STATE =====
  const state = {
    title: "Advanced App Builder",
    screen: "home"
  };

  // ===== PARSER =====
  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      state.title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      state.screen = parts[1];
    }
  });

  // ===== SCREEN REGISTRY =====
  const screens = {
    home: () => ({
      schema: {
        title: state.title,
        components: [
          {
            type: "textarea",
            id: "commandInput",
            placeholder:
              "مثال:\nset title تست\nscreen note\nscreen list"
          },
          {
            type: "button",
            label: "اجرا",
            action: "runCommand"
          }
        ]
      }
    }),

    note: () => ({
      schema: {
        title: state.title,
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
    }),

    list: () => ({
      schema: {
        title: state.title,
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
    })
  };

  // ===== SAFE SCREEN LOAD =====
  if (screens[state.screen]) {
    return screens[state.screen]();
  }

  // ===== FALLBACK =====
  return screens.home();
}
