// ====== Core Simple App Builder Engine ======

let appState = {
  title: "اپ من",
  lists: []
};

// اجرای دستور متنی
function runCommand(command) {
  command = command.trim();

  // تغییر عنوان اپ
  if (command.startsWith("title:")) {
    appState.title = command.replace("title:", "").trim();
    render();
    return;
  }

  // ساخت لیست جدید
  if (command.startsWith("list:")) {
    const listName = command.replace("list:", "").trim();
    appState.lists.push({
      name: listName,
      items: []
    });
    render();
    return;
  }

  // افزودن آیتم به لیست
  if (command.startsWith("add:")) {
    // مثال: add: خرید نان -> خرید
    const parts = command.replace("add:", "").split("->");
    if (parts.length === 2) {
      const item = parts[0].trim();
      const listName = parts[1].trim();

      const list = appState.lists.find(l => l.name === listName);
      if (list) {
        list.items.push(item);
        render();
      } else {
        alert("لیست پیدا نشد");
      }
    }
    return;
  }

  alert("دستور شناخته نشد");
}

// رندر خروجی اپ
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerText = appState.title;
  app.appendChild(h1);

  appState.lists.forEach(list => {
    const h3 = document.createElement("h3");
    h3.innerText = list.name;
    app.appendChild(h3);

    const ul = document.createElement("ul");
    list.items.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ul.appendChild(li);
    });

    app.appendChild(ul);
  });
}

// اتصال دکمه اجرا
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("run");
  const input = document.getElementById("command");

  if (btn && input) {
    btn.onclick = () => runCommand(input.value);
  }
});
