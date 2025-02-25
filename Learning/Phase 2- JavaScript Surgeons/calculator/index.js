let currentInput = "";
let operator = null; // the current operator that is being used
let operand1 = null; // this is where I will store the lft set

let keystroke = document.addEventListener("keyup", (e) => {
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["+", "-", "/", "*"];

  if (nums.includes(e.key) || e.key === ".") {
    currentInput += e.key;
    console.log("Current Input", currentInput);
  }

  if (operators.includes(e.key)) {
    // Save the first operand and operator if not set already
    if (currentInput !== "") {
      operand1 = parseFloat(currentInput);
      operator = e.key;
      currentInput = ""; // Clear input for the next number
      console.log("Operator pressed:", operator);
    }
  }

  // logic for calculation
  console.log(e.key);
  if (e.key == "Enter" && operand1 !== null && currentInput !== null) {
    let operand2 = parseFloat(currentInput);
    let result;
    switch (operator) {
      case "+":
        result = operand1 + operand2;
        break;

      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;

      case "/":
        result = operand1 / operand2;
        break;
    }
    
    console.log("RESULT", result);

    // currentInput = result.toString();
    operand1 = null;
    operand2 = null;
  }

  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    console.log("After backspace, Current Input:", currentInput);
  }
});
