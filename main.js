const app = document.getElementById('app');

const routes = {};

/* ---------- NAV ---------- */
function go(route) {
  location.hash = route;
}

/* ---------- HOME ---------- */
routes.home = function () {
  app.innerHTML = `
    <h1>Advanced App Builder</h1>
    <button onclick="go('notes')">Notes</button>
    <button onclick="go('calculator')">Calculator</button>
    <button onclick="go('generator')">Generator</button>
  `;
};

/* ---------- NOTES ---------- */
routes.notes = function () {
  app.innerHTML = `
    <h2>Notes</h2>
    <textarea id="note" placeholder="Write..."></textarea><br><br>
    <button onclick="saveNote()">Save</button>
    <button onclick="go('home')">Back</button>
  `;
};

function saveNote() {
  const text = document.getElementById('note').value;
  localStorage.setItem('note', text);
  alert('Saved');
}

/* ---------- CALCULATOR ---------- */
routes.calculator = function () {
  app.innerHTML = `
    <h2>Calculator</h2>
    <input id="a" type="number" placeholder="Number A">
    <input id="b" type="number" placeholder="Number B"><br><br>
    <button onclick="calc()">+</button>
    <h3 id="result"></h3>
    <button onclick="go('home')">Back</button>
  `;
};

function calc() {
  const a = Number(document.getElementById('a').value);
  const b = Number(document.getElementById('b').value);
  document.getElementById('result').innerText = a + b;
}

/* ---------- GENERATOR ---------- */
routes.generator = function () {
  app.innerHTML = `
    <h2>Generator</h2>
    <p>Coming soon...</p>
    <button onclick="go('home')">Back</button>
  `;
};

/* ---------- ROUTER CORE ---------- */
function loadRoute() {
  const route = location.hash.replace('#', '') || 'home';
  if (routes[route]) routes[route]();
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('load', loadRoute);
