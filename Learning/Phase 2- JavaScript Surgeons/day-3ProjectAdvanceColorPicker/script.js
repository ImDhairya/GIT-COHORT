const colorInput = document.getElementById("colorInput");
const colorCode = document.getElementById("colorCode");
const complementaryColorContainer = document.getElementById(
  "complementaryContainer"
);
const copyButton = document.getElementById("copyButton");

colorInput.addEventListener("change", getColorValue);

function getColorValue() {
  const currColor = colorInput.value;
  colorCode.innerHTML = `${currColor}`;
  getInverseColor(currColor);
}

function getInverseColor(currColor) {
  // #d72d2d
  const colorValue = currColor.slice(1, 7);
  console.log(colorValue, currColor);

  const redContent = colorValue.slice(0, 2);
  const greenContent = colorValue.slice(2, 4);
  const blueContent = colorValue.slice(4, 6);
  // console.log(redContent, greenContent, blueContent)

  // get the color in hexadecimal value and then xor it with 0xFFFFFF

  const base = parseInt(String(colorValue), 16);
  const inverseValue = 0xffffff ^ base;
  const inverseColor = inverseValue.toString(16).padStart(6, "0");
  // console.log("#"+inverseColor);
  complementaryColorContainer.style.height = "100px";
  complementaryColorContainer.style.width = "100px";
  complementaryColorContainer.style.backgroundColor = `#${inverseColor}`;
}

function copyColor() {
  const val = document.getElementById("colorCode");
  navigator.clipboard.writeText(val.textContent);
  console.log(val.textContent, "FEF")
}

console.log(navigator.keyboard)
