const routes = {
  home: () => {
    app.innerHTML = `
      <h2>Home</h2>
      <p>خوش اومدی 👋</p>

      <button onclick="goTo('note')">نوت</button>
      <button onclick="goTo('calculator')">ماشین حساب</button>
    `;
  },

  note: () => {
    app.innerHTML = `
      <h2>Note</h2>
      <textarea placeholder="یادداشت بنویس..."></textarea>
      <br><br>
      <button onclick="goTo('home')">بازگشت</button>
    `;
  },

  calculator: () => {
    app.innerHTML = `
      <h2>Calculator</h2>
      <p>بعداً کاملش می‌کنیم</p>
      <button onclick="goTo('home')">بازگشت</button>
    `;
  }
};

function router() {
  const page = location.hash.replace("#", "") || "home";
  routes[page] ? routes[page]() : routes.home();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
