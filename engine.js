// engine.js - نسخه امن
// ===== BILINGUAL ENGINE v2.1 (SECURE) =====

const ALLOWED_SCREENS = new Set(['home', 'note', 'list']);
const MAX_INPUT_LENGTH = 5000;

function normalize(cmd) {
  if (typeof cmd !== 'string') return '';
  
  return cmd
    .toLowerCase()
    .replace(/صفحه/g, "screen")
    .replace(/یادداشت/g, "note")
    .replace(/لیست/g, "list")
    .replace(/عنوان/g, "title")
    .replace(/هشدار/g, "alert")
    .replace(/برو/g, "go")
    .trim();
}

function validateInput(input) {
  if (typeof input !== 'string') return false;
  if (input.length > MAX_INPUT_LENGTH) return false;
  
  // جلوگیری از تزریق JS
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /localStorage\./i,
    /alert\(/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
}

function runEngine(input) {
  // اعتبارسنجی ورودی
  if (!validateInput(input)) {
    return {
      schema: getScreen('home'),
      meta: { alertText: 'ورودی نامعتبر است' }
    };
  }

  const lines = input.split("\n")
    .map(l => normalize(l))
    .filter(Boolean);

  let screen = "home";
  let title = "Advanced App Builder";
  let alertText = null;

  lines.forEach(line => {
    const parts = line.split(" ");
    if (parts.length === 0) return;

    const command = parts[0];
    const param = parts.slice(1).join(" ");

    if (command === "title") {
      title = param.substring(0, 100); // محدودیت طول
    }
    if ((command === "screen" || command === "go") && parts[1]) {
      screen = ALLOWED_SCREENS.has(parts[1]) ? parts[1] : 'home';
    }
    if (command === "alert") {
      alertText = param.substring(0, 200);
    }
  });

  return {
    schema: getScreen(screen),
    meta: { alertText }
  };
}

// ===== SCREENS DEFINITION =====
function getScreen(screenName) {
  const screens = {
    home: {
      title: "Advanced App Builder",
      components: [
        { type: "button", label: "یادداشت‌ها", action: "openNote", id: "btn-note" },
        { type: "button", label: "لیست من", action: "openList", id: "btn-list" },
        { type: "textarea", id: "commandInput", placeholder: "دستورات..." },
        { type: "button", label: "اجرا", action: "runCommand", id: "btn-run" }
      ]
    },
    note: {
      title: "یادداشت‌ها",
      components: [
        { type: "textarea", id: "noteText", placeholder: "یادداشت بنویس..." },
        { type: "button", label: "ذخیره", action: "saveNote", id: "btn-save" },
        { type: "button", label: "بازگشت", action: "goHomeAction", id: "btn-back" }
      ]
    },
    list: {
      title: "لیست کارها",
      components: [
        { type: "textarea", id: "itemInput", placeholder: "آیتم جدید..." },
        { type: "button", label: "اضافه کن", action: "addItem", id: "btn-add" },
        { type: "list", id: "itemsList" },
        { type: "button", label: "بازگشت", action: "goHomeAction", id: "btn-back-list" }
      ]
    }
  };

  return screens[screenName] || screens.home;
}

// Export برای استفاده در فایل‌های دیگر
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runEngine, normalize, validateInput };
} else {
  window.runEngine = runEngine;
}
