const val1 = document.getElementById("num1");
const val2 = document.getElementById("num2");

const result = document.getElementById("result");
let res = undefined;

function calculate(val) {
  // console.log(val1.value);
  switch (val) {
    case "+":
      res = Number(val1.value) + Number(val2.value);
      result.textContent = `Result: ${res}`;
      break;
    case "-":
      res = Number(val1.value) - Number(val2.value);
      result.textContent = `Result: ${res}`;
      break;
    case "/":
      res = Number(val1.value) / Number(val2.value);
      result.textContent = `Result: ${res}`;
      break;
    case "*":
      res = Number(val1.value) * Number(val2.value);
      result.textContent = `Result: ${res}`;
      break;
  }
}
