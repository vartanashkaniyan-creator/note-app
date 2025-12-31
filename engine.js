function runEngine(input) {
  const lines = input.trim().split("\n");

  let title = "Advanced App Builder";
  let screen = "home";

  lines.forEach(line => {
    const parts = line.trim().split(" ");

    if (parts[0] === "set" && parts[1] === "title") {
      title = parts.slice(2).join(" ");
    }

    if (parts[0] === "screen") {
      screen = parts[1];
    }
  });

  if (screen === "note") {
    return {
      screen: "note",
      schema: {
        title,
        components: [
          { type: "textarea", id: "noteText", placeholder: "یادداشت..." },
          { type: "button", label: "ذخیره", action: "saveNote" },
          { type: "button", label: "بازگشت", action: "goHome" }
        ]
      }
    };
  }

  // HOME
  return {
    screen: "home",
    schema: {
      title,
      components: [
        { type: "textarea", id: "commandInput", placeholder: "مثال: screen note" },
        { type: "button", label: "اجرا", action: "runCommand" }
      ]
    }
  };
}
