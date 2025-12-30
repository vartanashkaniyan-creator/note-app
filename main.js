function saveCurrentNote() {
  const text = document.getElementById("noteText").value;
  saveNote(text);

  const msg = document.getElementById("saveMsg");
  msg.innerText = "یادداشت ذخیره شد ✔";
  
  setTimeout(() => {
    msg.innerText = "";
  }, 1500);
}
