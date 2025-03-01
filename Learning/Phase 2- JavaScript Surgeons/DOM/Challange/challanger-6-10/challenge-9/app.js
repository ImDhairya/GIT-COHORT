const listItems = document.querySelectorAll(".menu-item");
const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const panel = document.getElementsByClassName("panel")[0];
const closeBtn = document.getElementsByClassName("close-btn")[0];

toggleBtn.addEventListener("click", () => {
  panel.classList.toggle("active"); // Use class toggle instead of inline styles
});

closeBtn.addEventListener("click", () => {
  panel.classList.remove("active"); // Close when X is clicked
});

// Close the panel when clicking outside
document.addEventListener("click", (e) => {
  if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
    panel.classList.remove("active");
  }
});

// Add event listeners for menu items
listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    alert(`${event.target.innerText}`);
  });
});
