// ===== CALCULATOR SCREEN =====
if (screen === "calculator") {
  return {
    schema: {
      title,
      components: [
        {
          type: "input",
          id: "a",
          placeholder: "عدد اول"
        },
        {
          type: "input",
          id: "b",
          placeholder: "عدد دوم"
        },
        {
          type: "button",
          label: "جمع",
          action: "calcAdd"
        },
        {
          type: "button",
          label: "بازگشت",
          action: "goHomeAction"
        },
        {
          type: "text",
          id: "result"
        }
      ]
    }
  };
}
