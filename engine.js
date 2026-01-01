function runEngine(input) {
  input = (input || "").trim();

  let currentPage = "home";

  if (input === "note") currentPage = "note";
  if (input === "list") currentPage = "list";
  if (input === "home") currentPage = "home";

  const pages = {
    home: {
      title: "صفحه اصلی",
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder: "دستور بنویس (note / list)..."
        },
        {
          type: "button",
          label: "اجرا",
          action: "runCommand"
        }
      ]
    },

    note: {
      title: "یادداشت‌های من",
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
    },

    list: {
      title: "لیست من",
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
          id: "itemsList"
        },
        {
          type: "button",
          label: "بازگشت",
          action: "goHomeAction"
        }
      ]
    }
  };

  return {
    schema: pages[currentPage],
    meta: null
  };
}
