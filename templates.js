// templates.js
const AppTemplates = {
  calculator: {
    name: "Calculator",
    ui: `
      <h2>ماشین حساب</h2>
      <input id="a" type="number">
      <input id="b" type="number">
      <button onclick="calc('+')">+</button>
      <button onclick="calc('-')">-</button>
      <p id="result"></p>
    `,
    logic: `
      function calc(op){
        const a = Number(document.getElementById('a').value);
        const b = Number(document.getElementById('b').value);
        document.getElementById('result').innerText =
          op === '+' ? a + b : a - b;
      }
    `
  },

  todo: {
    name: "ToDo",
    ui: `
      <h2>لیست کارها</h2>
      <input id="task">
      <button onclick="addTask()">افزودن</button>
      <ul id="list"></ul>
    `,
    logic: `
      function addTask(){
        const li = document.createElement('li');
        li.innerText = task.value;
        list.appendChild(li);
        task.value = '';
      }
    `
  },

  "language-learning": {
    name: "Language Learning",
    ui: `
      <h2>آموزش زبان</h2>
      <p>Hello = سلام</p>
      <button onclick="next()">درس بعد</button>
    `,
    logic: `
      function next(){
        alert("درس بعدی اضافه می‌شود");
      }
    `
  }
};
