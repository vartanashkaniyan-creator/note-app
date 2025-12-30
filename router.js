function loadPage(page) {
  const app = document.getElementById("app");

  if (page === "home") {
    app.innerHTML = `
      <h2>Home</h2>
      <button onclick="loadPage('note')">Note</button>
      <button onclick="loadPage('calculator')">Calculator</button>
    `;
  }

  if (page === "note") {
    const savedNote = loadNote();

    app.innerHTML = `
      <h2>Note</h2>
      <textarea id="noteText" rows="10" style="width:100%">${savedNote}</textarea>
      <br><br>
      <button onclick="saveCurrentNote()">Save</button>
      <button onclick="loadPage('home')">Back</button>
    `;
  }

  if (page === "calculator") {
    app.innerHTML = `
      <h2>Calculator</h2>
      <input id="a" type="number">
      <input id="b" type="number">
      <button onclick="calc()">+</button>
      <p id="result"></p>
      <button onclick="loadPage('home')">Back</button>
    `;
  }
}
