function generateAppFromInput() {
  const input = document.getElementById("commandInput").value;
  generateApp(input);
}

window.onload = () => {
  router.navigate("home");
};
