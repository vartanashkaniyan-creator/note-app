function runEngine(input) {
  const lines = input.split("\n").map(l => l.trim()).filter(Boolean);

  const schema = {
    title: "اپ شخصی من",
    components: []
  };

  lines.forEach(line => {
    if (line.startsWith("title")) {
      schema.title = line.replace("title", "").trim();
    }

    if (line === "note") {
      schema.components.push({
        type: "textarea",
        id: "noteText",
        placeholder: "یادداشت بنویس..."
      });
    }

    if (line.startsWith("button")) {
      const parts = line.split(" ");
      schema.components.push({
        type: "button",
        label: parts[1],
        action: parts[2]
      });
    }

    if (line === "list") {
      schema.components.push({
        type: "list",
        id: "itemsList"
      });
    }
  });

  return {
    schema,
    meta: null
  };
}
