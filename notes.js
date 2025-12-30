let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (text === "") return;

  notes.push(text);
  saveNotes();
  input.value = "";
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => deleteNote(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

renderNotes();
