function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0 || b === 0.0) return "Error";
  return a / b;
}

let operandA = "";
let operandB = "";
let operator = "";
let result = NaN;

let display = document.querySelector("p");
let resultDisplay = document.querySelector("#result");

function operate(op, A, B) {
  A = parseFloat(A);
  B = parseFloat(B);
  switch (op) {
    case "+":
      result = add(A, B);
      break;
    case "-":
      result = subtract(A, B);
      break;
    case "*":
      result = multiply(A, B);
      break;
    case "/":
      result = divide(A, B);
      break;
    default:
      break;
  }

  result = result.toFixed(2);
}

function updateDisplay(equal = false) {
  display.innerText = `${operandA} ${operator} ${operandB}`;
  if (equal) display.innerText += " =\n";

  if (!isNaN(result) || result === "Error") {
    resultDisplay.innerText = `${result}`;
  }
}

function buttonPressed(buttonID) {
  if (buttonID === "=") {
    operate(operator, operandA, operandB);
    updateDisplay(true);
    return;
  } else if (buttonID === "AC") {
    reset();
    return;
  } else if (buttonID === "del") {
    delOperand();
    return;
  }

  let buttonNumber = parseInt(buttonID);
  console.log(isNaN(buttonNumber));
  if (isNaN(buttonNumber) && buttonID !== ".") {
    if (!operandA) return;
    operator = buttonID;
    console.log("Setting operator to " + buttonID);
  } else {
    // If it is a number
    if (!operator) {
      if (buttonID === "." && operandA.includes(buttonID)) return;
      operandA += buttonID;
      console.log("Setting A");
    } else {
      if (buttonID === "." && operandB.includes(buttonID)) return;
      operandB += buttonID;
    }
  }
  updateDisplay();
}

function reset() {
  operandA = "";
  operandB = "";
  operator = "";
  result = NaN;
  display.innerText = "-";
  resultDisplay.innerText = "-";
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  const buttonName = button.innerText;
  console.log(buttonName);
  button.addEventListener("click", () => buttonPressed(buttonName));
});

function delOperand() {
  if (!operator) {
    // Remove A
    operandA = operandA.slice(0, operandA.length - 1);
  } else {
    // Remove B
    operandB = operandB.slice(0, operandB.length - 1);
  }
  updateDisplay();
}

document.onkeydown = (e) => {
  if (e.key === "Backspace") {
    delOperand();
  }
};
