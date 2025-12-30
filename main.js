// main.js – Calculator Engine (FA + EN)

const state = {
  lang: "fa",
  expr: ""
};

function t(fa, en) {
  return state.lang === "fa" ? fa : en;
}

function render() {
  document.body.innerHTML = `
    <div style="padding:16px;font-family:sans-serif">
      <h2>${t("ماشین‌حساب", "Calculator")}</h2>

      <input id="display" value="${state.expr}" disabled
        style="width:100%;height:40px;font-size:18px"/>

      <div style="margin-top:10px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
        ${["7","8","9","/",
           "4","5","6","*",
           "1","2","3","-",
           "0",".","=","+"]
          .map(b => `<button onclick="press('${b}')">${b}</button>`)
          .join("")}
      </div>

      <br/>

      <button onclick="clearAll()">${t("پاک‌کردن", "Clear")}</button>
      <button onclick="toggleLang()">${t("English", "فارسی")}</button>
    </div>
  `;
}

function press(v) {
  if (v === "=") {
    try {
      state.expr = String(eval(state.expr));
    } catch {
      state.expr = "";
    }
  } else {
    state.expr += v;
  }
  render();
}

function clearAll() {
  state.expr = "";
  render();
}

function toggleLang() {
  state.lang = state.lang === "fa" ? "en" : "fa";
  render();
}

render();
