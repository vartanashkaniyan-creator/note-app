function generateApp(type) {

  // NOTE APP
  if (type === "note") {
    return `
      <h2>Note</h2>

      <textarea id="noteText" rows="10" cols="30"></textarea>
      <br><br>
      <button onclick="saveCurrentNote()">Save</button>

      <script>
        document.getElementById("noteText").value =
          localStorage.getItem("note") || "";
      </script>
    `;
  }

  // CALCULATOR APP
  if (type === "calculator") {
    return `
      <h2>Calculator</h2>

      <input id="a" type="number">
      <input id="b" type="number">
      <br><br>
      <button onclick="calc()">+</button>

      <p id="result"></p>

      <script>
        function calc() {
          const a = Number(document.getElementById("a").value);
          const b = Number(document.getElementById("b").value);
          document.getElementById("result").innerText = a + b;
        }
      </script>
    `;
  }

  return "<p>Unknown app type</p>";
}
