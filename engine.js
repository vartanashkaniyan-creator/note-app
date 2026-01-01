// engine.js

const engineState = {
  title: "Advanced App Builder",
  screen: "home",
  data: {
    note: localStorage.getItem("note") || "",
    list: JSON.parse(localStorage.getItem("list") || "[]")
  }
};

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  lines.forEach(line => {
    const parts = line.split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      engineState.title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      engineState.screen = parts[1];
    }
  });

  // ===== NOTE SCREEN =====
  if (engineState.screen === "note") {
    return {
      schema: {
        title: engineState.title,
        components: [
          {
            type: "textarea",
            id: "noteText",
            placeholder: "یادداشت...",
            value: engineState.data.note
          },
          {
            type: "button",
            label: "ذخیره",
            action: "saveNote"
          },
          {
            type: "button",
            label: "بازگشت",
            action: "goHomeAction"
          }
        ]
      }
    };
  }

  // ===== HOME SCREEN =====
  return {
    schema: {
      title: engineState.title,
      components: [
        {
          type: "textarea",
          id: "commandInput",
          placeholder: "مثال:\nset title تست\nscreen note\nscreen list"
        },
        {
          type: "button",
          label: "اجرا",
          action: "runCommand"
        }
      ]
    }
  };
}

// ===== STATE HELPERS =====
function updateNote(value) {
  engineState.data.note = value;
  localStorage.setItem("note", value);
}
