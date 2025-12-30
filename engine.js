function runEngine(input) {
  let data;

  // 1️⃣ parse امن ورودی
  try {
    data = typeof input === "string" ? JSON.parse(input) : input;
  } catch (e) {
    return {
      ui: `<pre style="color:red">JSON نامعتبره</pre>`,
      logic: ""
    };
  }

  // 2️⃣ خروجی‌ها
  let ui = "";
  let logic = "";

  // 3️⃣ screen
  if (!data.screen) {
    return {
      ui: `<pre style="color:red">screen تعریف نشده</pre>`,
      logic: ""
    };
  }

  // title
  if (data.screen.title) {
    ui += `<h2>${data.screen.title}</h2>`;
  }

  // components
  if (Array.isArray(data.screen.components)) {
    data.screen.components.forEach((c, i) => {

      // TEXT
      if (c.type === "text") {
        ui += `<p>${c.value || ""}</p>`;
      }

      // BUTTON
      if (c.type === "button") {
        const id = `btn_${i}`;
        ui += `<button id="${id}">${c.text || "Button"}</button>`;

        if (c.onClick) {
          logic += `
            document.getElementById("${id}").onclick = function () {
              ${c.onClick}
            };
          `;
        }
      }

    });
  }

  // 4️⃣ خروجی نهایی
  return { ui, logic };
}
