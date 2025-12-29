const Storage = {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  load(key, def = []) {
    return JSON.parse(localStorage.getItem(key)) || def;
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};
