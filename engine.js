// engine.js
// Engine v5 — Smart Text Commands

function runEngine(input) {
  let result = {
    ui: "<p>دستور نامعتبر</p>",
    logic: ""
  };

  if (!input || !input.trim()) return result;

  input = input.toLowerCase();

  // تشخیص نوع اپ
  let type = null;
  if (input.includes("note")) type = "note";
  if (input.includes("calc")) type = "calculator";

  if (!type) return result;

  // قابلیت‌ها
  const hasSave = input.includes("save");
  const hasBack = input.includes("back");

  return buildApp(type, { hasSave, hasBack });
}

// ===== APP BUILDER =====
function buildApp(type, options) {

  // ---------- NOTE ----------
  if (type === "note") {
    return {
      ui: `
        <h2>Note</h2>
        <textarea id="noteText" placeholder="یادداشت..."></textarea>

        ${options.hasSave ? `<button onclick="saveNote()">ذخیره</button>` : ``}
        ${options.hasBack ? `<button onclick="goHome()">بازگشت</button>` : ``}
      `,
      logic: `
        function saveNote() {
          const text = document.getElementById("noteText").value;
          localStorage.setItem("note", text);
          alert("ذخیره شد");
        }

        function goHome() {
          location.reload();
        }
      `
    };
  }

  // ---------- CALCULATOR ----------
  if (type === "calculator") {
    return {
      ui: `
        <h2>Calculator</h2>
        <input id="a" type="number">
        <input id="b" type="number">
        <button onclick="calc()">+</button>
        <p id="result"></p>

        ${options.hasBack ? `<button onclick="goHome()">بازگشت</button>` : ``}
      `,
      logic: `
        function calc() {
          const a = Number(document.getElementById("a").value);
          const b = Number(document.getElementById("b").value);
          document.getElementById("result").innerText = a + b;
        }

        function goHome() {
          location.reload();
        }
      `
    };
  }

  return { ui: "", logic: "" };
}
