function saveCurrentNote() {
  const text = document.getElementById("noteText").value;
  saveNote(text);
  alert("Saved!");
}

// صفحه شروع
window.addEventListener("load", () => {
  if (!location.hash) {
    loadPage("home");
  } else {
    loadPage(location.hash.replace("#", ""));
  }
});

// واکنش به تغییر route
window.addEventListener("hashchange", () => {
  loadPage(location.hash.replace("#", ""));
});
