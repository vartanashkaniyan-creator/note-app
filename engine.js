function generateApp(type) {

  if (type === "note") {
    return `
      <h2>📝 یادداشت</h2>
      <textarea id="noteText" placeholder="یادداشت بنویس..."></textarea>
      <button onclick="saveNote()">ذخیره</button>
      <button onclick="goTo('home')">بازگشت</button>
    `;
  }

  if (type === "calculator") {
    return `
      <h2>🧮 ماشین حساب</h2>
      <input id="a" type="number" placeholder="عدد اول">
      <input id="b" type="number" placeholder="عدد دوم">
      <button onclick="calc()">جمع</button>
      <p id="result"></p>
      <button onclick="goTo('home')">بازگشت</button>
    `;
  }

  return "<p>اپ پیدا نشد</p>";
}

function saveNote() {
  const text = document.getElementById("noteText").value;
  localStorage.setItem("note", text);
  alert("ذخیره شد ✅");
}

function calc() {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);
  document.getElementById("result").innerText = a + b;
}
