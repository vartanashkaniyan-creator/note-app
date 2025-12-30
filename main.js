window.onload = () => {
  // اگر آدرس هَش داشت (مثلاً #note)
  if (location.hash) {
    loadPage(location.hash.replace("#", ""));
  } else {
    // صفحه پیش‌فرض
    loadPage("home");
  }

  // تغییر صفحه با هَش
  window.onhashchange = () => {
    loadPage(location.hash.replace("#", ""));
  };
};
