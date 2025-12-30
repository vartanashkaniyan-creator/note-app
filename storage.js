function saveNote() {
  const text = document.getElementById('note').value
  localStorage.setItem('note', text)
  alert('Saved')
}
