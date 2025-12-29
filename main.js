document.addEventListener("DOMContentLoaded", () => {
  const buildBtn = document.getElementById("buildBtn");
  const previewBtn = document.getElementById("previewBtn");

  buildBtn.addEventListener("click", () => {
    const command = document.getElementById("command").value;
    buildApp(command);
  });

  previewBtn.addEventListener("click", () => {
    goPreview();
  });
});
