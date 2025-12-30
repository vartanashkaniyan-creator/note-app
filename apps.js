// apps.js

window.apps = {

  note() {
    return {
      ui: `
        <h2>📝 Note</h2>
        <textarea id="noteText"></textarea>
        <button onclick="saveNote()">Save</button>
      `,
      logic: `
        function saveNote() {
          const t = document.getElementById("noteText").value;
          localStorage.setItem("note", t);
          alert("Saved ✅");
        }
      `
    };
  },

  calculator() {
    return {
      ui: `
        <h2>🧮 Calculator</h2>
        <input id="a" type="number">
        <input id="b" type="number">
        <button onclick="calc()">+</button>
        <p id="res"></p>
      `,
      logic: `
        function calc() {
          const a = Number(a.value);
          const b = Number(b.value);
          res.innerText = a + b;
        }
      `
    };
  }

};
