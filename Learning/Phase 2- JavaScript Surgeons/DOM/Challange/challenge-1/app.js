/**
 * Write your challenge solution here
 */

toggleBtn = document.getElementById("toggleButton");
currentState = document.getElementById("status");

console.log(currentState.innerText, "DF")

let light = true;
toggleBtn.addEventListener("click", () => {
  console.log("abc", light);
  light ? (light = false) : (light = true);

  if (light) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    currentState.innerText = "Status: Off";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    currentState.innerText = "Status: On";
  }
});
