const Router = {
  pages: {},

  register(name, renderFn) {
    this.pages[name] = renderFn;
  },

  go(name) {
    const app = document.getElementById("app");
    app.innerHTML = "";
    if (this.pages[name]) {
      this.pages[name](app);
    } else {
      app.innerHTML = "<p>Page not found</p>";
    }
  }
};
