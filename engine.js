// engine.js

function runEngine(command) {
  command = command.trim().toLowerCase();

  // NOTE APP
  if (command.includes("note")) {
    return {
      ui: `
        <h2>📝 Notes</h2>
        <textarea id="noteText" placeholder="یادداشت بنویس..."></textarea>
        <button onclick="saveNote()">ذخیره</button>
      `,
      logic: `
        function saveNote() {
          const text = document.getElementById("noteText").value;
          localStorage.setItem("note", text);
          alert("ذخیره شد ✅");
        }
      `
    };
  }

  // CALCULATOR (فعلاً خالی طبق حرف خودت)
  if (command.includes("calculator")) {
    return {
      ui: "<h2>Calculator (Disabled)</h2>",
      logic: ""
    };
  }

  // UNKNOWN COMMAND
  return {
    ui: "<p>❌ دستور شناخته نشد</p>",
    logic: ""
  };
}
