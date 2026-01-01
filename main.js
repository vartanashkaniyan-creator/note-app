// main.js
let currentState = null;
let savedNote = "";
let savedList = [];

// اجرای موتور
function runApp(input) {
  currentState = runEngine(input);
  render(currentState);
  handleMeta(currentState.meta);
}

// رندر UI
function render(state) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerText = state.schema.title;
  app.appendChild(h1);

  state.schema.components.forEach(c => {
    if (c.type === "textarea") {
      const t = document.createElement("textarea");
      t.id = c.id;
      t.placeholder = c.placeholder || "";
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
      savedList.forEach(i => {
        const li = document.createElement("li");
        li.innerText = i;
        ul.appendChild(li);
      });
      app.appendChild(ul);
    }
  });
}

// اکشن‌ها
function handleAction(action) {
  if (action === "runCommand") {
    const v = document.getElementById("commandInput").value;
    runApp(v);
  }

  if (action === "goHomeAction") {
    runApp("clear");
  }

  if (action === "saveNote") {
    savedNote = document.getElementById("noteText").value;
    alert("ذخیره شد");
  }

  if (action === "addItem") {
    const v = document.getElementById("itemInput").value;
    if (v) {
      savedList.push(v);
      render(currentState);
    }
  }
}

// اجرای meta
function handleMeta(meta) {
  if (!meta) return;

  if (meta.alertText) {
    alert(meta.alertText);
  }

  if (meta.autoSave) {
    const note = document.getElementById("noteText");
    if (note) {
      note.oninput = () => {
        savedNote = note.value;
      };
    }
  }
}
