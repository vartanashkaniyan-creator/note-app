// ================== GLOBAL STATE (مغز اپ) ==================
const State = {
  title: "Advanced App Builder",
  screen: "home", // home | note | list
  notes: []
};

// ================== START ==================
window.onload = () => {
  render();
};

// ================== COMMAND RUNNER ==================
function runCommand() {
  const inputEl = document.getElementById("commandInput");
  if (!inputEl) return;

  const raw = inputEl.value.trim();
  if (!raw) return;

  const lines = raw.split("\n");

  lines.forEach(line => {
    executeCommand(line.trim());
  });

  inputEl.value = "";
  render();
}

// ================== COMMAND ENGINE ==================
function executeCommand(cmd) {
  if (cmd.startsWith("set title")) {
    State.title = cmd.replace("set title", "").trim() || State.title;
    return;
  }

  if (cmd === "screen home") {
    State.screen = "home";
    return;
  }

  if (cmd === "screen note") {
    State.screen = "note";
    return;
  }

  if (cmd === "screen list") {
    State.screen = "list";
    return;
  }

  if (cmd.startsWith("add note")) {
    const text = cmd.replace("add note", "").trim();
    if (text) State.notes.push(text);
    return;
  }

  alert("دستور ناشناخته ❌\n" + cmd);
}

// ================== RENDER ==================
function render() {
  const app = document.getElementById("app");
  if (!app) return;

  let html = `<h2>${State.title}</h2>`;

  // ---------- HOME ----------
  if (State.screen === "home") {
    html += `
      <textarea id="commandInput" placeholder="مثال:
set title تست
screen note
add note سلام"></textarea>

      <button onclick="runCommand()">اجرا</button>
    `;
  }

  // ---------- NOTE ----------
  if (State.screen === "note") {
    html += `
      <textarea id="noteText" placeholder="یادداشت..."></textarea>

      <button onclick="saveNote()">اضافه کن</button>
      <button onclick="goHome()">بازگشت</button>
    `;
  }

  // ---------- LIST ----------
  if (State.screen === "list") {
    html += `
      <ul>
        ${State.notes.map(n => `<li>${n}</li>`).join("")}
      </ul>

      <button onclick="goHome()">بازگشت</button>
    `;
  }

  app.innerHTML = html;
}

// ================== ACTIONS ==================
function goHome() {
  State.screen = "home";
  render();
}

function saveNote() {
  const el = document.getElementById("noteText");
  if (!el || !el.value.trim()) return;

  State.notes.push(el.value.trim());
  el.value = "";
  alert("ذخیره شد ✅");
}
