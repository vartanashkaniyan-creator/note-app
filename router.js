const routes = {};

function go(route) {
  window.location.hash = route;
}

routes.home = function () {
  app.innerHTML = `
    <h2>Home</h2>
    <button onclick="go('notes')">Notes</button>
    <button onclick="go('calculator')">Calculator</button>
  `;
};

routes.notes = function () {
  app.innerHTML = `
    <h2>Notes</h2>
    <textarea placeholder="Write your note..."></textarea>
    <br>
    <button onclick="go('home')">Back</button>
  `;
};

routes.calculator = function () {
  app.innerHTML = `
    <h2>Calculator</h2>
    <input id="a" type="number" placeholder="Number 1">
    <input id="b" type="number" placeholder="Number 2">
    <br><br>
    <button onclick="calc()">+</button>
    <h3 id="result"></h3>
    <br>
    <button onclick="go('home')">Back</button>
  `;
};

window.onhashchange = function () {
  const route = location.hash.replace('#', '') || 'home';
  routes[route]();
};

window.onload = function () {
  const route = location.hash.replace('#', '') || 'home';
  routes[route]();
};
