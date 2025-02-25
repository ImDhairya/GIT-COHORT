/**
 * Write your challenge solution here
 */

body = document.getElementsByTagName("body");
let btn = document.querySelectorAll("button");

btn.forEach((bt) => {
  bt.addEventListener("click", () => {
    color = bt.id;
    console.log(color);
    switch (bt.id) {
      case "redButton":
        document.body.style.backgroundColor = "red";
        break;
      case "greenButton":
        document.body.style.backgroundColor = "green";
        break;
      case "blueButton":
        document.body.style.backgroundColor = "blue";
        break;
      case "purpleButton":
        document.body.style.backgroundColor = "purple";
        break;
      case "resetButton":
        document.body.style.backgroundColor = "white";
        break;
      default:
        console.log("not selected ");
    }
  });
});
