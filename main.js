// main.js

window.onload = () => {
  const app = document.getElementById("app");

  // UI اولیه
  app.innerHTML = `
    <textarea id="commandInput" placeholder="دستور را وارد کن..."></textarea>
    <button id="runBtn">اجرا</button>
  `;

  const runBtn = document.getElementById("runBtn");
  const textArea = document.getElementById("commandInput");

  runBtn.onclick = () => {
    const result = runEngine(textArea.value);

    app.innerHTML = result.ui;

    // پاک‌سازی اسکریپت‌های قبلی
    document.querySelectorAll(".dynamic-script").forEach(s => s.remove());

    if (result.logic) {
      const script = document.createElement("script");
      script.className = "dynamic-script";
      script.innerHTML = result.logic;
      document.body.appendChild(script);
    }
  };
};
