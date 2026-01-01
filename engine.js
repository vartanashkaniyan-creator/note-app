// engine.js

function runEngine(input) {
  const cmd = (input || "").trim().toLowerCase();

  // ===== HOME =====
  if (cmd === "" || cmd === "screen home") {
    return {
      schema: {
        title: "🏠 صفحه اصلی",
        components: [
          {
            type: "textarea",
            id: "commandInput",
            placeholder: "دستور را وارد کن (مثلاً: screen note)"
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

  // ===== NOTE =====
  if (cmd === "screen note") {
    return {
      schema: {
        title: "📝 یادداشت",
        components: [
          {
            type: "textarea",
            id: "noteText",
            placeholder: "یادداشت خود را بنویس"
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

  // ===== LIST =====
  if (cmd === "screen list") {
    return {
      schema: {
        title: "📋 لیست ساده",
        components: [
          {
            type: "textarea",
            id: "listInput",
            placeholder: "هر خط = یک آیتم"
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

  // ===== COUNTER =====
  if (cmd === "screen counter") {
    return {
      schema: {
        title: "🔢 شمارنده (نمایشی)",
        components: [
          {
            type: "button",
            label: "بازگشت",
            action: "goHomeAction"
          }
        ]
      }
    };
  }

  // ===== UNKNOWN COMMAND =====
  return {
    schema: {
      title: "❌ دستور ناشناخته",
      components: [
        {
          type: "button",
          label: "بازگشت به خانه",
          action: "goHomeAction"
        }
      ]
    }
  };
          }
