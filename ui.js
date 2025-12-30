let calcValue = "";

function calcPress(val) {
  calcValue += val;
  document.getElementById("calcDisplay").value = calcValue;
}

function calcClear() {
  calcValue = "";
  document.getElementById("calcDisplay").value = "";
}

function calcEqual() {
  try {
    calcValue = eval(calcValue).toString();
    document.getElementById("calcDisplay").value = calcValue;
  } catch {
    document.getElementById("calcDisplay").value = "Error";
    calcValue = "";
  }
}
