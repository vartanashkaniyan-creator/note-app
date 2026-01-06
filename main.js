// main.js - FINAL WORKING VERSION

const app = document.getElementById("app");

let notes = "";
let items = [];

// اجرای برنامه
function runApp(command = "home") {
  const result = window.runEngine(command);
  render(result.schema);

  if (result.meta?.alertText) {
    alert(result.meta.alertText);
  }
}

// رندر UI
function render(schema) {
  app.innerHTML = "";

  schema.components.forEach(comp => {
    if (comp.type === "button") {
      const btn = document.createElement("button");
      btn.innerText = comp.label;
      btn.onclick = () => handleAction(comp.action);
      app.appendChild(btn);
    }

    if (comp.type === "textarea") {
      const ta = document.createElement("textarea");
      ta.id = comp.id;
      ta.placeholder = comp.placeholder || "";
      app.appendChild(ta);
    }

    if (comp.type === "list") {
      const ul = document.createElement("ul");
      items.forEach(i => {
        const li = document.createElement("li");
        li.innerText = i;
        ul.appendChild(li);
      });
      app.appendChild(ul);
    }
  });
}

// مدیریت اکشن‌ها
function handleAction(action) {
  switch (action) {

    case "runCommand": {
      const input = document.getElementById("commandInput")?.value || "";
      runApp(input);
      break;
    }

    case "openNote":
      runApp("screen note");
      break;

    case "openList":
      runApp("screen list");
      break;

    case "goHomeAction":
      runApp("home");
      break;

    case "saveNote": {
      const ta = document.getElementById("noteText");
      if (ta) {
        notes = ta.value;
        alert("Note saved");
      }
      break;
    }

    case "addItem": {
      const ta = document.getElementById("itemInput");
      if (ta && ta.value.trim()) {
        items.push(ta.value.trim());
        ta.value = "";
        runApp("screen list");
      }
      break;
    }

    default:
      console.warn("Unknown action:", action);
  }
}

// اجرای اولیه
document.addEventListener("DOMContentLoaded", () => {
  runApp();
});
