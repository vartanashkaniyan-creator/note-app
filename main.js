const runBtn = document.querySelector("button:nth-of-type(1)");
const clearBtn = document.querySelector("button:nth-of-type(2)");
const titleInput = document.querySelector("input");
const textArea = document.querySelector("textarea");

runBtn.onclick = () => {
  if (!textArea.value.trim()) {
    alert("دستوری وارد نکردی");
    return;
  }

  alert("دستور اجرا شد:\n\n" + textArea.value);
};

clearBtn.onclick = () => {
  titleInput.value = "";
  textArea.value = "";
};
