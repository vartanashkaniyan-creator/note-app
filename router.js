const app = document.getElementById('app')
const routes = {}

function go(route) {
  window.location.hash = route
}

/* ---------- HOME ---------- */
routes.home = function () {
  app.innerHTML = `
    <h2>Home</h2>
    <button onclick="go('notes')">Notes</button>
    <button onclick="go('calculator')">Calculator</button>
  `
}

/* ---------- NOTES ---------- */
routes.notes = function () {
  app.innerHTML = `
    <h2>Notes</h2>
    <textarea id="note" placeholder="Write your note..."></textarea>
    <br><br>
    <button onclick="saveNote()">Save</button>
    <button onclick="go('home')">Back</button>
  `
}

/* ---------- CALCULATOR ---------- */
routes.calculator = function () {
  app.innerHTML = `
    <h2>Calculator</h2>
    <input id="a" type="number" placeholder="Number A">
    <input id="b" type="number" placeholder="Number B">
    <br><br>
    <button onclick="calc()">+</button>
    <h3 id="result"></h3>
    <br>
    <button onclick="go('home')">Back</button>
  `
}


/* ---------- ROUTER CORE ---------- */
function loadRoute() {
  const route = location.hash.replace('#', '') || 'home'
  if (routes[route]) routes[route]()
}

window.addEventListener('hashchange', loadRoute)
window.addEventListener('load', loadRoute)
routes.generator = function () {
  app.innerHTML = `
    <h2>Generator</h2>
    <p>Coming soon...</p>
    <button onclick="go('home')">Back</button>
  `;
};


