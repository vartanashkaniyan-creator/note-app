// engine.js
function generateApp() {
  const text = document.getElementById("command").value.toLowerCase();

  if (!text.includes("ساخت اپ")) {
    alert("دستور نامعتبر است");
    return;
  }

  const type = text.split(":")[1]?.trim();

  if (!AppTemplates[type]) {
    alert("این نوع اپ وجود ندارد");
    return;
  }

  Storage.save("currentApp", AppTemplates[type]);
  Router.go("preview");
}
