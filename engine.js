function normalize(cmd) {
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/خانه|اصلی/g, "home")
    .replace(/عنوان/g, "title")
    .replace(/هشدار/g, "alert")
    .replace(/برو|باز/g, "go")
    .trim();
}

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => normalize(l))
    .filter(Boolean);

  let screen = "home";
  let title = "اپ شخصی من";
  let alertText = null;

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "title") {
      title = parts.slice(1).join(" ");
    }

    if (parts[0] === "screen" || parts[0] === "go") {
      screen = parts[1];
    }

    if (parts[0] === "alert") {
      alertText = parts.slice(1).join(" ");
    }
  });

  // ===== SCREENS =====
  const pages = {
    home: {
      title,
      components: [
        { type: "button", label: "یادداشت‌ها", action: "openNote" },
        { type: "button", label: "لیست", action: "openList" }
      ]
    },
    note: {
      title,
      components: [
        { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
        { type: "button", label: "ذخیره", action: "saveNote" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    },
    list: {
      title,
      components: [
        { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
        { type: "button", label: "اضافه کن", action: "addItem" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "بازگشت", action: "goHomeAction" }
      ]
    }
  };

  return { schema: pages[screen], meta: { alertText } };
}
