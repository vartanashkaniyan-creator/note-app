// ذخیره‌سازی آیتم‌ها در LocalStorage
function saveList() {
  const items = [];
  document.querySelectorAll('#itemList li').forEach(item => {
    items.push(item.firstChild.textContent.trim());
  });
  localStorage.setItem('itemList', JSON.stringify(items));
}

// بارگذاری آیتم‌ها از LocalStorage
function loadList() {
  const items = JSON.parse(localStorage.getItem('itemList'));
  if (items) {
    items.forEach(itemText => {
      const newItem = document.createElement('li');
      newItem.innerHTML = itemText + ' <button onclick="removeItem(this)">حذف</button> <button onclick="editItem(this)">ویرایش</button>';
      document.getElementById('itemList').appendChild(newItem);
    });
  }
}

// ذخیره‌سازی بعد از هر تغییر
window.addEventListener('beforeunload', saveList);

// بارگذاری لیست هنگام بارگذاری صفحه
loadList();
