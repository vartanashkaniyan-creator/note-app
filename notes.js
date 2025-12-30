// NOTES APP

const notesKey = "my_notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(notesKey)) || [];
}

function saveNotes(notes) {
  localStorage.setItem(notesKey, JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();

  app.innerHTML = `
    <h2>📝 نوت‌ها</h2>

    <textarea id="noteText" placeholder="نوت جدید بنویس..."></textarea>
    <br>
    <button onclick="addNote()">➕ افزودن</button>
    <button onclick="goTo('home')">⬅ بازگشت</button>

    <div id="notesList"></div>
  `;

  const list = document.getElementById("notesList");

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p>${note}</p>
      <button onclick="deleteNote(${index})">🗑 حذف</button>
    `;
    list.appendChild(div);
  });
}

function addNote() {
  const text = document.getElementById("noteText").value.trim();
  if (!text) return;

  const notes = getNotes();
  notes.push(text);
  saveNotes(notes);
  renderNotes();
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}
