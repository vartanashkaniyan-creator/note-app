// engine.js

function runEngine(input) {
  const lines = input.trim().split("\n").map(l => l.trim()).filter(Boolean);

  let title = "Advanced App Builder";
  let screen = "home";
  let alertText = null;

  lines.forEach(line => {
    const parts = line.split(" ");

    // set title ...
    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    // screen note | home | calculator
    if (parts[0] === "screen") {
      screen = parts[1];
    }

    // alert ...
    if (parts[0] === "alert") {
      alertText = parts.slice(1).join(" ");
    }
  });

  // ===== SCREENS =====

  if (screen === "note") {
    return {
      ui: {
        title,
        fields: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت..." }
        ],
        buttons: [
          { label: "ذخیره", action: "saveNote" },
          { label: "بازگشت", action: "goHome" }
        ]
      },
      logic: alertText ? `alert("${alertText}")` : ""
    };
  }

  if (screen === "calculator") {
    return {
      ui: {
        title,
        fields: [
          { type: "input", id: "a", placeholder: "عدد اول" },
          { type: "input", id: "b", placeholder: "عدد دوم" }
        ],
        buttons: [
          { label: "جمع", action: "calcSum" },
          { label: "بازگشت", action: "goHome" }
        ]
      },
      logic: `
        function calcSum() {
          const a = Number(document.getElementById("a").value);
          const b = Number(document.getElementById("b").value);
          alert(a + b);
        }
      `
    };
  }

  // ===== HOME (DEFAULT) =====
  return {
    ui: {
      title,
      fields: [
        { type: "textarea", id: "commandInput", placeholder: "مثال:\nscreen note\nalert سلام" }
      ],
      buttons: [
        { label: "اجرا", action: "runCommand" }
      ]
    },
    logic: alertText ? `alert("${alertText}")` : ""
  };
}
