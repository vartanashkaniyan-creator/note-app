function runApp(input) {
  currentState = window.runEngine(input || "");
  render(currentState);
  executeActions(currentState.actions);
}

async function executeActions(actions = []) {
  for (const act of actions) {
    if (act.type === "alert") {
      alert(act.text);
    }

    if (act.type === "delay") {
      await new Promise(r => setTimeout(r, act.time * 1000));
    }

    if (act.type === "if") {
      if (act.condition === "note empty") {
        if (!localStorage.getItem("note")) alert("یادداشتی وجود ندارد");
      }
      if (act.condition === "note not empty") {
        if (localStorage.getItem("note")) alert("یادداشت داری");
      }
      if (act.condition === "list empty") {
        const list = JSON.parse(localStorage.getItem("items") || "[]");
        if (list.length === 0) alert("لیست خالی است");
      }
    }
  }
}
