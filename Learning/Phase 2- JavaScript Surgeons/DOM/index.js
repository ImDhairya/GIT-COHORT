console.log(window);

// DOM manipulation but a depricated.
// window.document.write('Hello From JS')

const themeBtn = document.getElementById("theme_btn");

themeBtn.addEventListener("click", () => {
  const currentColor = document.body.style.backgroundColor;
  if (!currentColor) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else if (currentColor == "black") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "black";
  }
});
