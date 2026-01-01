// engine.js
// ===== SIMPLE APP ENGINE v1.0 =====

function runEngine(input) {
  const lines = input
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let currentPage = "home";

  const pages = {
    home: {
      title: "اپ شخصی من",
      components: []
    }
  };

  let activeSchema = pages.home;
  let alertText = null;

  lines.forEach(line => {
    const parts = line.split(" ");

    // ===== PAGE =====
    if (parts[0] === "page") {
      const pageName = parts[1];
      if (!pages[pageName]) {
        pages[pageName] = {
          title: "صفحه جدید",
          components: []
        };
      }
      currentPage = pageName;
      activeSchema = pages[pageName];
      return;
    }

    // ===== TITLE =====
    if (parts[0] === "title") {
      activeSchema.title = parts.slice(1).join(" ");
      return;
    }

    // ===== NOTE =====
    if (line === "note") {
      activeSchema.components.push({
        type: "textarea",
        id: "noteText",
        placeholder: "یادداشت بنویس..."
      });
      return;
    }

    // ===== LIST =====
    if (line === "list") {
      activeSchema.components.push({
        type: "list",
        id: "itemsList"
      });
      return;
    }

    // ===== BUTTON =====
    if (parts[0] === "button") {
      activeSchema.components.push({
        type: "button",
        label: parts[1],
        action: parts[2],
        target: parts[3] || null
      });
      return;
    }

    // ===== ALERT =====
    if (parts[0] === "alert") {
      alertText = parts.slice(1).join(" ");
      return;
    }
  });

  return {
    schema: pages[currentPage],
    meta: { alertText }
  };
}
