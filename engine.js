// engine.js
// Advanced Engine v2 — Command Based

function runEngine(input) {
  const command = input.trim().toLowerCase();

  let result = {
    ui: `<p>دستور نامعتبر</p>`,
    logic: ""
  };

  // ---------- CREATE NOTE ----------
  if (command === "create note") {
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

  // ---------- CREATE CALCULATOR ----------
  else if (command === "create calculator") {
    result.ui = `<p>Calculator فعلاً غیرفعال است</p>`;
    result.logic = "";
  }

  return result;
}
