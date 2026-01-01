// engine.js

function runEngine(input) {
  const raw = (input || "").trim();
  const cmd = raw.toLowerCase();

  // ===== HOME =====
  if (cmd === "" || cmd === "home" || cmd === "screen home") {
    return homeScreen();
  }

  // ===== NOTE WITH TEXT =====
  if (cmd.startsWith("note")) {
    const text = raw.slice(4).trim(); // متن بعد از note
    return noteScreen(text);
  }

  // ===== LIST =====
  if (cmd === "screen list") {
    return listScreen();
  }

  // ===== UNKNOWN =====
  return unknownScreen();
}

// ===== SCREENS =====

function homeScreen() {
  return {
    schema: {
      title: "🏠 صفحه اصلی",
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder: "مثلاً: note خرید نان"
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

function noteScreen(prefillText = "") {
  return {
    schema: {
      title: "📝 یادداشت",
      components: [
        {
          type: "textarea",
          id: "noteText",
          placeholder: "یادداشت...",
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

function listScreen() {
  return {
    schema: {
      title: "📋 لیست",
      components: [
        {
          type: "textarea",
          id: "listText",
          placeholder: "هر خط یک آیتم"
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

function unknownScreen() {
  return {
    schema: {
      title: "❌ دستور نامعتبر",
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
