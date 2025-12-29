const UI = {
  render(page) {
    const app = document.getElementById("app");

    if (page === "home") {
      app.innerHTML = `
        <h2>📱 App Creator</h2>
        <button onclick="Router.go('calculator')">Calculator</button>
        <button onclick="Router.go('notes')">Notes</button>
      `;
    }

    if (page === "calculator") {
      app.innerHTML = `
        <h3>Calculator</h3>
        <input id="a" type="number">
        <input id="b" type="number">
        <button onclick="alert(+a.value + +b.value)">+</button>
        <br><br>
        <button onclick="Router.go('home')">⬅ Back</button>
      `;
    }

    if (page === "notes") {
      const notes = Storage.load("notes");

      app.innerHTML = `
        <h3>Notes</h3>
        <textarea id="note"></textarea>
        <button onclick="UI.addNote()">Save</button>
        <ul>
          ${notes.map(n => `<li>${n}</li>`).join("")}
        </ul>
        <button onclick="Router.go('home')">⬅ Back</button>
      `;
    }
  },

  addNote() {
    const notes = Storage.load("notes");
    notes.push(document.getElementById("note").value);
    Storage.save("notes", notes);
    this.render("notes");
  }
};
