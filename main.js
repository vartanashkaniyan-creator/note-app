window.onload = () => {
  // بارگذاری صفحه پیش‌فرض
  if (location.hash) {
    loadPage(location.hash.replace("#", ""));
  } else {
    loadPage("home");
  }

  // تغییر صفحه با hash
  window.onhashchange = () => {
    loadPage(location.hash.replace("#", ""));
  };
};

function loadPage(page) {
  const app = document.getElementById("app");
  if (!app) return;

  switch (page) {
    case "home":
      app.innerHTML = `
        <div class="card">
          <h2>Home</h2>
          <p>Home Loaded ✅</p>
        </div>
      `;
      break;

    case "note":
      app.innerHTML = `
        <div class="card">
          <h2>Note</h2>
          <textarea placeholder="Write your note..."></textarea>
        </div>
      `;
      break;

    case "calculator":
      app.innerHTML = `
        <div class="card">
          <h2>Calculator</h2>
          <p>Calculator Ready ✅</p>
        </div>
      `;
      break;

    default:
      app.innerHTML = `
        <div class="card">
          <h2>404</h2>
          <p>Page not found</p>
        </div>
      `;
  }
}
