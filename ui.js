const ui = {
  renderHome() {
    document.getElementById("app").innerHTML = `
      <h2>App Generator</h2>
      <textarea id="commandInput" rows="4" style="width:90%"></textarea>
      <br><br>
      <button onclick="generateAppFromInput()">Generate</button>
    `;
  }
};
