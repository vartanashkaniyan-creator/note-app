// main.js
let currentState = null;

// ===== STORAGE =====
function getNote() {
  return localStorage.getItem("note") || "";
}

function getList() {
  return JSON.parse(localStorage.getItem("items") || "[]");
}

// ===== START APP =====
window.addEventListener("DOMContentLoaded", () => {
  runApp("home");
});

// ===== RUN ENGINE =====
function runApp(input) {
  currentState = runEngine(input);
  render(currentState);
  handleMeta(currentState.meta);
}

// ===== RENDER =====
function render(state) {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";

  // عنوان صفحه
  const h1 = document.createElement("h1");
  h1.innerText = state.schema.title;
  app.appendChild(h1);

  // کامپوننت‌ها
  state.schema.components.forEach(c => {
    if (c.type === "textarea") {
      const t = document.createElement("textarea");
      t.id = c.id;
      t.placeholder = c.placeholder || "";

      if (c.id === "noteText") t.value = getNote();
      if (c.id === "itemInput") t.value = "";

      app.appendChild(t);
    }

    if (c.type === "button") {
      const b = document.createElement("button");
      b.innerText = c.label;
      b.onclick = () => handleAction(c.action);
      app.appendChild(b);
    }

    if (c.type === "list") {
      const ul = document.createElement("ul");
      ul.id = c.id;

      getList().forEach(i => {
        const li = document.createElement("li");
        li.innerText = i;
        ul.appendChild(li);
      });

      app.appendChild(ul);
    }
  });
}

// ===== ACTIONS =====
function handleAction(action) {
  switch (action) {
    case "runCommand":
      const v = document.getElementById("commandInput")?.value || "";
      runApp(v);
      break;

    case "goHomeAction":
      runApp("home");
      break;

    case "saveNote":
      const note = document.getElementById("noteText")?.value || "";
      localStorage.setItem("note", note);
      alert("ذخیره شد ✅");
      break;

    case "addItem":
      const input = document.getElementById("itemInput");
      if (!input || !input.value) return;

      const items = getList();
      items.push(input.value);
      localStorage.setItem("items", JSON.stringify(items));
      input.value = ""; // پاک کردن ورودی بعد از اضافه کردن
      render(currentState);
      break;

    default:
      console.warn("Action not recognized:", action);
  }
}

// ===== META =====
function handleMeta(meta) {
  if (!meta) return;

  if (meta.alertText) {
    alert(meta.alertText);
  }
}
