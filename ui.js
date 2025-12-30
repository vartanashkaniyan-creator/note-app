const UI = {
  button(text, onClick) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
  },

  input(placeholder = "") {
    const input = document.createElement("input");
    input.placeholder = placeholder;
    return input;
  },

  title(text) {
    const h = document.createElement("h2");
    h.textContent = text;
    return h;
  }
};
