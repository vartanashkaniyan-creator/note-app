// main.js

window.onload = () => {
  renderHome();
};

function renderHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <textarea id="commandInput" placeholder="دستور را وارد کن..."></textarea>
    <button id="runBtn">اجرا</button>
  `;

  const runBtn = document.getElementById("runBtn");
  const textArea = document.getElementById("commandInput");

  runBtn.onclick = () => {
    const result = runEngine(textArea.value);

    // UI اپ
    app.innerHTML = result.ui;

    // پاک‌سازی اسکریپت‌های قبلی
    document.querySelectorAll(".dynamic-script").forEach(s => s.remove());

    // منطق اپ
    if (result.logic) {
      const script = document.createElement("script");
      script.className = "dynamic-script";
      script.innerHTML = result.logic;
      document.body.appendChild(script);
    }
  };
}

// تابع بازگشت به خانه (برای دکمه Back داخل اپ‌ها)
function goHome() {
  // پاک‌سازی اسکریپت‌های داینامیک
  document.querySelectorAll(".dynamic-script").forEach(s => s.remove());
  renderHome();
}
