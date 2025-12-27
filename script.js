const btn = document.getElementById("runBtn");
const commandInput = document.getElementById("command");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const cmd = commandInput.value.trim();

  if (cmd === "") {
    output.innerHTML = "❌ دستور وارد نشده";
    return;
  }

  if (cmd.includes("لیست")) {
    output.innerHTML = `
      <ul>
        <li>آیتم اول</li>
        <li>آیتم دوم</li>
        <li>آیتم سوم</li>
      </ul>
    `;
  } else {
    output.innerHTML = "⚠️ دستور شناخته نشد";
  }
});
