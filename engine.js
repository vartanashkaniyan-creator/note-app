// engine.js
// Engine v3 — JSON Based Commands

function runEngine(input) {
  let result = {
    ui: "<p>دستور نامعتبر</p>",
    logic: ""
  };

  let command;

  try {
    command = JSON.parse(input);
  } catch (e) {
    return {
      ui: "<p>فرمت دستور اشتباه است (JSON)</p>",
      logic: ""
    };
  }

  // ---------- NOTE ----------
  if (command.type === "note") {
    result.ui = `
      <h2>Note</h2>
      <textarea id="noteText" placeholder="یادداشت..."></textarea>
      <button onclick="saveNote()">ذخیره</button>
    `;

    result.logic = `
      function saveNote() {
        const text = document.getElementById("noteText").value;
        localStorage.setItem("note", text);
        alert("ذخیره شد");
      }
    `;
  }

  // ---------- CALCULATOR (فعلاً خاموش) ----------
  else if (command.type === "calculator") {
    result.ui = "<p>Calculator هنوز فعال نشده</p>";
  }

  return result;
}
