runBtn.onclick = () => {
  const result = runEngine(textArea.value);

  const app = document.getElementById("app");
  app.innerHTML = result.ui;

  if (result.logic) {
    const s = document.createElement("script");
    s.innerHTML = result.logic;
    document.body.appendChild(s);
  }
};
