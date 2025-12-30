const app = document.getElementById("app");

function renderHome() {
  app.innerHTML = `
    <h2>Home</h2>
    <p>اپ ساز شخصی شما آماده است 🚀</p>

    <button onclick="goTo('note')">نوت</button>
    <button onclick="goTo('calculator')">ماشین حساب</button>
  `;
}

function goTo(page) {
  location.hash = page;
}

renderHome();
