function runEngine(command) {
  command = command.toLowerCase();

  // NOTE
  if (command.includes("note") || command.includes("یادداشت")) {
    return {
      ui: `
        <h2>📝 Note</h2>
        <textarea id="noteText" placeholder="یادداشت بنویس..."></textarea>
        <br>
        <button onclick="saveNote()">ذخیره</button>
        <button onclick="goHome()">بازگشت</button>
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

  // CALCULATOR
  if (command.includes("calculator") || command.includes("ماشین")) {
    return {
      ui: `
        <h2>🧮 Calculator</h2>
        <input id="a" type="number">
        <input id="b" type="number">
        <button onclick="calc()">جمع</button>
        <p id="result"></p>
        <button onclick="goHome()">بازگشت</button>
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

  // DEFAULT
  return {
    ui: "<p>❌ دستور شناخته نشد</p><button onclick='goHome()'>بازگشت</button>",
    logic: ""
  };
}
