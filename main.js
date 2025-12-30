function go(page) {
  const pageDiv = document.getElementById("page");

  if (page === "home") {
    pageDiv.innerHTML = `
      <h2>Home</h2>
      <p>Home Loaded ✅</p>
    `;
  }

  if (page === "notes") {
    pageDiv.innerHTML = `
      <h2>Notes</h2>
      <textarea placeholder="Write note..."></textarea>
    `;
  }

  if (page === "calculator") {
    pageDiv.innerHTML = `
      <h2>Calculator</h2>
      <input type="number" id="a" placeholder="Number 1">
      <input type="number" id="b" placeholder="Number 2">
      <button onclick="sum()">جمع</button>
      <p id="result"></p>
    `;
  }
}

function sum() {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);
  document.getElementById("result").innerText = a + b;
}

// صفحه پیش‌فرض
go("home");
