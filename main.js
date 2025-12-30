// main.js – Core Notes Engine (FA + EN)

const state = {
  lang: "fa",
  notes: JSON.parse(localStorage.getItem("notes") || "[]")
};

function t(fa, en) {
  return state.lang === "fa" ? fa : en;
}

function render() {
  document.body.innerHTML = `
    <div style="padding:16px;font-family:sans-serif">
      <h2>${t("یادداشت‌ها", "Notes")}</h2>

      <textarea id="noteInput" placeholder="${t(
        "یادداشت جدید...",
        "New note..."
      )}" style="width:100%;height:80px"></textarea>

      <br/><br/>

      <button onclick="addNote()">
        ${t("افزودن", "Add")}
      </button>

      <button onclick="toggleLang()">
        ${t("English", "فارسی")}
      </button>

      <hr/>

      <ul>
        ${state.notes
          .map(
            (n, i) =>
              `<li>
                ${n}
                <button onclick="removeNote(${i})">❌</button>
              </li>`
          )
          .join("")}
      </ul>
    </div>
  `;
}

function addNote() {
  const input = document.getElementById("noteInput");
  if (!input.value.trim()) return;
  state.notes.push(input.value);
  input.value = "";
  save();
}

function removeNote(index) {
  state.notes.splice(index, 1);
  save();
}

function toggleLang() {
  state.lang = state.lang === "fa" ? "en" : "fa";
  render();
}

function save() {
  localStorage.setItem("notes", JSON.stringify(state.notes));
  render();
}

render();
