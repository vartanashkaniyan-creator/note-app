function generateCode() {
  const outputType = document.getElementById('outputType').value;
  const language = document.getElementById('language').value;
  const command = document.getElementById('command').value.trim();

  let generatedCode = `
  // این کد برای اپ ${outputType} با زبان ${language} است.
  // دستور وارد شده: ${command}
  `;

  if (outputType === "mobile") {
    generatedCode += `
    // برای خروجی موبایل (APK/IPA) شما باید از React Native یا Flutter استفاده کنید.
    // در اینجا کد موبایل تولید شده است:
    // ${generateMobileCode(command, language)}
    `;
  } else if (outputType === "web") {
    generatedCode += `
    // برای خروجی وب:
    // ${generateWebCode(command)}
    `;
  }

  document.getElementById('outputArea').textContent = generatedCode;
}

function generateMobileCode(command, language) {
  if (language === "React Native") {
    return `// React Native - دستور: ${command}
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>دستور شما: ${command}</Text>
    </View>
  );
}`;
  } else if (language === "Flutter") {
    return `// Flutter - دستور: ${command}
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('دستور شما: ${command}'),
        ),
      ),
    );
  }
}`;
  }
}

function generateWebCode(command) {
  return `// Web - دستور: ${command}
import React from 'react';

function App() {
  return (
    <div>
      <h1>دستور شما: ${command}</h1>
    </div>
  );
}

export default App;`;
}
