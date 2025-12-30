window.onload = () => {
  ui.init();

  if (location.hash) {
    loadPage(location.hash.replace("#", ""));
  }

  window.onhashchange = () => {
    loadPage(location.hash.replace("#", ""));
  };
};
