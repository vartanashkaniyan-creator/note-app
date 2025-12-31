window.onload = () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <textarea id="commandInput" placeholder="دستور را وارد کن..."></textarea>
    <button id="runBtn">اجرا</button>
  `;

  document.getElementById("runBtn").onclick = () => {
    const cmd = document.getElementById("commandInput").value;
    const result = runEngine(cmd);
    app.innerHTML = result.ui;
  };
};
