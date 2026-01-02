// plugin-system.js
// سیستم مدیریت پلاگین‌ها

class PluginSystem {
  constructor() {
    this.plugins = new Map(); // ذخیره پلاگین‌ها
  }

  // ثبت پلاگین جدید
  register(plugin) {
    if (!plugin.name) {
      console.error("❌ پلاگین باید نام داشته باشد");
      return false;
    }
    
    this.plugins.set(plugin.name, plugin);
    console.log(`✅ پلاگین "${plugin.name}" ثبت شد`);
    return true;
  }

  // اجرای پلاگین
  execute(name, ...args) {
    const plugin = this.plugins.get(name);
    
    if (!plugin) {
      console.error(`❌ پلاگین "${name}" پیدا نشد`);
      return `<div class="error">پلاگین یافت نشد: ${name}</div>`;
    }
    
    try {
      // اجرای پلاگین
      const result = plugin.execute(...args);
      return result;
    } catch (error) {
      console.error("❌ خطا در اجرای پلاگین:", error);
      return `<div class="error">خطا در اجرای پلاگین ${name}</div>`;
    }
  }

  // دریافت لیست همه پلاگین‌ها
  getAll() {
    const list = [];
    this.plugins.forEach((plugin, name) => {
      list.push({
        name: plugin.name,
        description: plugin.description || "بدون توضیح",
        icon: plugin.icon || "🔌"
      });
    });
    return list;
  }
}

// ایجاد یک نمونه از سیستم پلاگین در پنجره مرورگر
window.PluginSystem = new PluginSystem();

// پیام موفقیت
console.log("🚀 سیستم پلاگین بارگذاری شد");
