let canGoPreview = false;

function buildApp(command) {
  if (!command || command.trim() === "") {
    alert("دستور خالیه");
    return;
  }

  console.log("Command:", command);
  canGoPreview = true;
  alert("اپ ساخته شد");
}

function goPreview() {
  if (!canGoPreview) {
    alert("اول اپ رو بساز");
    return;
  }

  window.location.href = "preview.html";
}
