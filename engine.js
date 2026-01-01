function runEngine(input) {
  const lines = input.split("\n").map(l => l.trim()).filter(Boolean);

  let currentPage = "home";

  const pages = {
    home: {
      title: "صفحه اصلی",
      components: [
        { type: "textarea", id: "commandInput", placeholder: "دستور بنویس..." },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    },
    note: {
      title: "یادداشت‌ها",
      components: [
        { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
        { type: "button", label: "ذخیره", action: "saveNote" },
        { type: "button", label: "بازگشت", action: "go home" }
      ]
    },
    list: {
      title: "لیست من",
      components: [
        { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
        { type: "button", label: "اضافه کن", action: "addItem" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "بازگشت", action: "go home" }
      ]
    }
  };

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "go") {
      const target = parts[1];
      if (pages[target]) {
        currentPage = target;
      }
    }
  });

  return {
    schema: pages[currentPage],
    meta: null
  };
}
