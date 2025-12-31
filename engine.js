// engine.js
// Engine v4 — JSON + Text Commands

function runEngine(input) {
  let result = {
    ui: "<p>دستور نامعتبر</p>",
    logic: ""
  };

  if (!input || !input.trim()) {
    return result;
  }

  input = input.trim().toLowerCase();

  // ---------- JSON MODE ----------
  if (input.startsWith("{")) {
    try {
      const cmd = JSON.parse(input);
      return handleCommand(cmd.type);
    } catch (e) {
      return {
        ui: "<p>JSON نامعتبر است</p>",
        logic: ""
      };
    }
  }

  // ---------- TEXT MODE ----------
  if (input.includes("note")) {
    return handleCommand("note");
  }

  if (input.includes("calc")) {
    return handleCommand("calculator");
  }

  return result;
}

// ===== COMMAND HANDLER =====
function handleCommand(type) {

  // ---------- NOTE ----------
  if (type === "note") {
    return {
      ui: `
        <h2>Note</h2>
        <textarea id="noteText" placeholder="یادداشت..."></textarea>
        <button onclick="saveNote()">ذخیره</button>
      `,
      logic: `
        function saveNote() {
          const text = document.getElementById("noteText").value;
          localStorage.setItem("note", text);
          alert("ذخیره شد");
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

  return {
    ui: "<p>اپ پشتیبانی نمی‌شود</p>",
    logic: ""
  };
}
