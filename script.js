document.getElementById('generate-code').addEventListener('click', function() {
    const language = document.getElementById('language').value;
    const appType = document.getElementById('app-type').value;

    let generatedCode = '';

    if (language === 'Kotlin') {
        generatedCode = `// Kotlin Code for Mobile App
fun main() {
    println("Hello, World!")
}`;
    } else if (language === 'React Native') {
        generatedCode = `// React Native Code for Mobile App
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
}`;
    } else if (language === 'Flutter') {
        generatedCode = `// Flutter Code for Mobile App
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Hello, World!')),
      ),
    );
  }
}`;
    } else if (language === 'Java') {
        generatedCode = `// Java Code for Mobile App
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
    }

    document.getElementById('code-output').textContent = generatedCode;
});
