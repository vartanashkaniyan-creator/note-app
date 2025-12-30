function saveNote(text) {
  localStorage.setItem("note", text);
}

function loadNote() {
  return localStorage.getItem("note") || "";
}
