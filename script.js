document.addEventListener('DOMContentLoaded', function() {
  const commandInput = document.getElementById('command-text');
  const addButton = document.getElementById('add-command-btn');
  const commandsList = document.getElementById('commands-list');
  const languageSelect = document.getElementById('language-select');
  const categorySelect = document.getElementById('category-select');

  // تغییر زبان
  languageSelect.addEventListener('change', function() {
    const language = this.value;
    changeLanguage(language);
  });

  // تغییر زبان بر اساس انتخاب
  function changeLanguage(language) {
    if (language === 'fa') {
      commandInput.setAttribute('placeholder', 'دستور جدید');
      addButton.textContent = 'افزودن دستور';
    } else {
      commandInput.setAttribute('placeholder', 'New command');
      addButton.textContent = 'Add Command';
    }
  }

  // افزودن دستور جدید
  addButton.addEventListener('click', function() {
    const commandText = commandInput.value.trim();
    const category = categorySelect.value;
    
    if (commandText) {
      const newCommand = { text: commandText, category, id: Date.now() };
      saveCommand(newCommand);
      renderCommand(newCommand);
      commandInput.value = ''; // پاک کردن ورودی
    }
  });

  // ذخیره دستور جدید
  function saveCommand(command) {
    let commands = JSON.parse(localStorage.getItem('commands')) || [];
    commands.push(command);
    localStorage.setItem('commands', JSON.stringify(commands));
  }

  // نمایش دستور در صفحه
  function renderCommand(command) {
    const commandItem = document.createElement('div');
    commandItem.classList.add('command-item');
    commandItem.dataset.id = command.id;
    commandItem.innerHTML = `
      <span>${command.text} - ${command.category}</span>
      <button class="edit-btn">ویرایش</button>
      <button class="delete-btn">حذف</button>
    `;
    commandsList.appendChild(commandItem);

    // افزودن قابلیت ویرایش و حذف
    commandItem.querySelector('.edit-btn').addEventListener('click', function() {
      const newText = prompt('ویرایش دستور:', command.text);
      if (newText) {
        command.text = newText;
        saveAllCommands();
        loadCommands();
      }
    });

    commandItem.querySelector('.delete-btn').addEventListener('click', function() {
      if (confirm('آیا مطمئن هستید که می‌خواهید این دستور را حذف کنید؟')) {
        deleteCommand(command.id);
      }
    });
  }

  // حذف دستور
  function deleteCommand(id) {
    let commands = JSON.parse(localStorage.getItem('commands')) || [];
    commands = commands.filter(command => command.id !== id);
    localStorage.setItem('commands', JSON.stringify(commands));
    loadCommands();
  }

  // ذخیره تمام دستورات در LocalStorage
  function saveAllCommands() {
    const allCommands = [];
    document.querySelectorAll('.command-item').forEach(function(item) {
      allCommands.push({
        text: item.querySelector('span').textContent,
        id: item.dataset.id,
        category: item.querySelector('span').textContent.split(' - ')[1]
      });
    });
    localStorage.setItem('commands', JSON.stringify(allCommands));
  }

  // بارگذاری دستورات از LocalStorage
  function loadCommands() {
    const commands = JSON.parse(localStorage.getItem('commands')) || [];
    commands.forEach(renderCommand);
  }

  // بارگذاری دستورات هنگام بارگذاری صفحه
  loadCommands();
});
