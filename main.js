window.onload = () => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
};

function handleRoute() {
  const page = location.hash.replace("#", "") || "home";
  const app = document.getElementById("app");
  if (!app) return;

  if (page === "home") {
    app.innerHTML = `
      <h1>Home</h1>
      <p>صفحه اصلی لود شد ✅</p>
      <button onclick="go('notes')">Notes</button>
    `;
  }

  if (page === "notes") {
    app.innerHTML = `
      <h1>Notes</h1>
      <textarea placeholder="یادداشت بنویس..."></textarea>
      <button onclick="go('home')">Back</button>
    `;
  }
}

function go(page) {
  location.hash = page;
}
