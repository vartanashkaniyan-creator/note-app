// engine.js
// Simple App Code Generator (Notes + Calculator)

function generateApp(type) {
  if (type === "note") {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Note App</title>
</head>
<body>
  <h2>Note</h2>
  <textarea id="note" rows="10" cols="30"></textarea><br><br>
  <button onclick="saveNote()">Save</button>

  <script>
    function saveNote() {
      localStorage.setItem("note", document.getElementById("note").value);
      alert("Saved");
    }

    document.getElementById("note").value =
      localStorage.getItem("note") || "";
  </script>
</body>
</html>
`;
  }

  if (type === "calculator") {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Calculator</title>
</head>
<body>
  <h2>Calculator</h2>
  <input id="a" type="number">
  <input id="b" type="number"><br><br>
  <button onclick="calc()">+</button>
  <p id="result"></p>

  <script>
    function calc() {
      const a = Number(document.getElementById("a").value);
      const b = Number(document.getElementById("b").value);
      document.getElementById("result").innerText = a + b;
    }
  </script>
</body>
</html>
`;
  }

  return "Unknown app type";
}

// example
// generateApp("note")
// generateApp("calculator")
