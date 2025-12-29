const Engine = {
  build(command) {
    if (command.includes("ماشین حساب")) {
      return this.calculatorApp();
    }

    return `<h2>دستور شناخته نشد</h2>`;
  },

  calculatorApp() {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: sans-serif; padding:20px; }
button { margin:5px; }
</style>
</head>
<body>

<h2>ماشین حساب</h2>

<input id="a" type="number">
<input id="b" type="number">

<br><br>

<button onclick="add()">+</button>
<button onclick="sub()">-</button>

<h3 id="result"></h3>

<script>
function add(){
  result.innerText = Number(a.value) + Number(b.value);
}
function sub(){
  result.innerText = Number(a.value) - Number(b.value);
}
</script>

</body>
</html>
`;
  }
};
