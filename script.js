// باز کردن یا ایجاد پایگاه داده (Database)
let db;
const request = indexedDB.open("CodeDatabase", 1);

request.onerror = function(event) {
  console.log("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("Database opened successfully!");
  loadCodeFromIndexedDB(); // بارگذاری کد ذخیره شده در صورت وجود
};

// ایجاد شی (object store) برای ذخیره‌سازی کدها
request.onupgradeneeded = function(event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("codes", { keyPath: "id" });
  objectStore.createIndex("code", "code", { unique: false });
};

// ذخیره کد در IndexedDB
function saveCodeToIndexedDB(code) {
  const transaction = db.transaction(["codes"], "readwrite");
  const objectStore = transaction.objectStore("codes");
  const codeEntry = { id: 1, code: code }; // id می‌تواند عدد منحصر به فرد باشد
  const request = objectStore.put(codeEntry);

  request.onsuccess = function() {
    console.log("Code saved to IndexedDB");
  };

  request.onerror = function() {
    console.log("Error saving code to IndexedDB");
  };
}

// بارگذاری کد از IndexedDB
function loadCodeFromIndexedDB() {
  const transaction = db.transaction(["codes"]);
  const objectStore = transaction.objectStore("codes");
  const request = objectStore.get(1); // دریافت کد با id برابر 1

  request.onsuccess = function() {
    if (request.result) {
      console.log("Loaded code: ", request.result.code);
      document.getElementById("output").innerText = request.result.code;
    }
  };
}

// تولید کد
function generateCode() {
    const language = document.getElementById("language").value;
    const appType = document.getElementById("appType").value;

    let code = '';

    // تولید کد برای زبان‌های مختلف
    if (language === 'java') {
        code = `// Java Code for ${appType === 'mobile' ? 'Mobile App' : 'Desktop App'}\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`;
    } else if (language === 'kotlin') {
        code = `// Kotlin Code for ${appType === 'mobile' ? 'Mobile App' : 'Desktop App'}\n\nfun main() {\n    println("Hello, World!")\n}`;
    } else if (language === 'reactNative') {
        code = `// React Native Code for ${appType === 'mobile' ? 'Mobile App' : 'Desktop App'}\n\nimport React from 'react';\nimport { Text, View } from 'react-native';\n\nconst App = () => {\n  return (\n    <View>\n      <Text>Hello, World!</Text>\n    </View>\n  );\n};\n\nexport default App;`;
    } else if (language === 'flutter') {
        code = `// Flutter Code for ${appType === 'mobile' ? 'Mobile App' : 'Desktop App'}\n\nimport 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        body: Center(\n          child: Text('Hello, World!'),\n        ),\n      ),\n    );\n  }\n}`;
    }

    // نمایش کد تولید شده
    document.getElementById("output").innerText = code;

    // ذخیره کد در IndexedDB
    saveCodeToIndexedDB(code);
}
