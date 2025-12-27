document.getElementById("generate-btn").addEventListener("click", function() {
  const command = document.getElementById("command-text").value.trim();
  const outputType = document.getElementById("output-select").value;

  const generatedCode = generateCode(command, outputType);
  document.getElementById("generated-code").textContent = generatedCode;
});

function generateCode(command, outputType) {
  let code = "";

  if (outputType === "mobile") {
    if (command === "افزودن آیتم") {
      code = "<ul><li>آیتم 1</li><li>آیتم 2</li></ul>";
    } else if (command === "ساخت فرم") {
      code = `
        <form>
          <label for="name">نام:</label>
          <input type="text" id="name" name="name">
          <input type="submit" value="ارسال">
        </form>`;
    }
    code += "\n\n// این کد برای اپ موبایل (React Native یا Flutter) است.";
  } else if (outputType === "desktop") {
    code = `
      // این کد برای ساخت اپ دسکتاپ با Electron است
      const { app, BrowserWindow } = require('electron');
      let win;
      app.on('ready', () => {
        win = new BrowserWindow({ width: 800, height: 600 });
        win.loadFile('index.html');
      });
    `;
  } else if (outputType === "web") {
    code = `
      // این کد برای اپ وب با React است
      import React from 'react';
      const App = () => {
        return <h1>سلام، خوش آمدید به اپ وب!</h1>;
      };
      export default App;
    `;
  } else {
    code = "دستور نامعتبر است.";
  }

  return code;
}
