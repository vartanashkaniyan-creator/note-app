Router.register("home", (app) => {
  app.append(
    UI.title("App Creator"),
    UI.button("Calculator", () => Router.go("calc")),
    UI.button("Notes", () => Router.go("notes"))
  );
});

Router.register("notes", (app) => {
  const input = UI.input("Write note...");
  const btn = UI.button("Save", () => {
    Storage.save("note", input.value);
    alert("Saved");
  });

  app.append(UI.title("Notes"), input, btn);
});

Router.register("calc", (app) => {
  app.append(UI.title("Calculator (next step)"));
});

Router.go("home");
