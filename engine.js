function runEngine(command) {
  command = command.trim().toLowerCase();

  if (command === "calculator") {
    return {
      ui: `
        <h2>Calculator</h2>
        <input id="a" type="number" placeholder="A">
        <input id="b" type="number" placeholder="B">
        <button onclick="calc()">+</button>
        <p id="result"></p>
      `,
      logic: `
        function calc() {
          const a = Number(document.getElementById("a").value);
          const b = Number(document.getElementById("b").value);
          document.getElementById("result").innerText = a + b;
        }
      `
    };
  }

  if (command === "note") {
    return {
      ui: `
        <h2>Note</h2>
        <textarea id="noteText"></textarea>
        <button onclick="saveNote()">Save</button>
      `,
      logic: `
        function saveNote() {
          const text = document.getElementById("noteText").value;
          localStorage.setItem("note", text);
          alert("Saved");
        }
      `
    };
  }

  return null;
}
