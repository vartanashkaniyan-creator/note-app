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
}
