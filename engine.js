function generateApp(commandText) {
  commandText = commandText.toLowerCase();

  if (commandText.includes("calculator") || commandText.includes("ماشین")) {
    router.navigate("calculator");
    return;
  }

  if (commandText.includes("note") || commandText.includes("یادداشت")) {
    router.navigate("notes");
    return;
  }

  alert("اپ مورد نظر شناخته نشد");
}
