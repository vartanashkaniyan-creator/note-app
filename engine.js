// engine.js
// موتور پایه حرفه‌ای (Pure Function)

function runEngine(input) {
  const command = input.trim().toLowerCase();

  // خروجی پیش‌فرض
  let result = {
    ui: `<p>دستور نامعتبر</p>`,
    logic: ""
  };

  // دستور note
  if (command === "note") {
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

  // دستور calculator (فعلاً خالی طبق خواسته تو)
  else if (command === "calculator") {
    result.ui = `<p>Calculator فعلاً غیرفعال است</p>`;
    result.logic = "";
  }

  return result;
}
