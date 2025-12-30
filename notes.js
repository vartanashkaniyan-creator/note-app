function goTo(page) {
  location.hash = page;
}

function loadPage(page) {
  const app = document.getElementById("app");

  if (page === "home") {
    app.innerHTML = `
      <h2>Home</h2>
      <button onclick="goTo('note')">Note</button>
      <button onclick="goTo('calculator')">Calculator</button>
    `;
  }
  else if (page === "note") {
    app.innerHTML = generateApp("note");
  }
  else if (page === "calculator") {
    app.innerHTML = generateApp("calculator");
  }
  else {
    app.innerHTML = "<p>صفحه پیدا نشد</p>";
  }
}
