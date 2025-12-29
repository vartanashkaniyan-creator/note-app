const Router = {
  current: "home",

  go(page) {
    this.current = page;
    UI.render(page);
    history.pushState({ page }, "", "#" + page);
  },

  init() {
    window.onpopstate = (e) => {
      const page = e.state?.page || "home";
      this.current = page;
      UI.render(page);
    };
  }
};
