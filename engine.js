// engine.js

function runEngine(commandText) {
  const cmd = commandText.toLowerCase().trim();

  // NOTE APP
  if (cmd.includes("note") || cmd.includes("یادداشت")) {
    return buildNoteApp();
  }

  // CALCULATOR APP
  if (cmd.includes("calculator") || cmd.includes("ماشین")) {
    return buildCalculatorApp();
  }

  // UNKNOWN
  return {
    ui: `
      <h3>❌ دستور نامعتبر</h3>
      <p>مثال دستورها:</p>
      <ul>
        <li>note</li>
        <li>calculator</li>
      </ul>
    `,
    logic: ""
  };
}

/* =========================
   APP BUILDERS
========================= */

function buildNoteApp() {
  return {
    ui: `
      <h2>📝 Note App</h2>

      <textarea id="noteText" placeholder="یادداشت بنویس..."></textarea>

      <button onclick="saveNote()">💾 ذخیره</button>
      <button onclick="loadNote()">📂 بازیابی</button>
    `,
    logic: `
      function saveNote() {
        const text = document.getElementById("noteText").value;
        localStorage.setItem("note_app_data", text);
        alert("ذخیره شد ✅");
      }

      function loadNote() {
        document.getElementById("noteText").value =
          localStorage.getItem("note_app_data") || "";
      }
    `
  };
}

function buildCalculatorApp() {
  return {
    ui: `
      <h2>🧮 Calculator</h2>

      <input id="a" type="number" placeholder="عدد اول">
      <input id="b" type="number" placeholder="عدد دوم">

      <button onclick="calc()">جمع</button>

      <p id="result"></p>
    `,
    logic: `
      function calc() {
        const a = Number(document.getElementById("a").value);
        const b = Number(document.getElementById("b").value);
        document.getElementById("result").innerText = a + b;
      }
    `
  };
}
