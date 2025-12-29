function generateApp() {
  const command = document.getElementById("command").value;
  const code = Engine.build(command);

  localStorage.setItem("generatedApp", code);
  alert("اپ ساخته شد ✅ حالا پیش‌نمایش بزن");
}

function previewApp() {
  const iframe = document.getElementById("previewFrame");
  const code = localStorage.getItem("generatedApp");

  if (!code) {
    alert("اول اپ رو بساز");
    return;
  }

  iframe.srcdoc = code;
}
