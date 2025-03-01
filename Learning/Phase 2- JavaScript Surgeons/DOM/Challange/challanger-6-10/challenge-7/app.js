const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item, index) => {
  const button = item.querySelector(".accordion-button");
  const content = item.querySelector(".accordion-content");
  const arrow = button.querySelector(".arrow");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // Close all other accordions
    closeAllAccordions(index);

    if (isOpen) {
      item.classList.remove("active");
      content.style.maxHeight = "0px";
    } else {
      item.classList.add("active");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

function closeAllAccordions(currentIndex) {
  accordionItems.forEach((item, index) => {
    if (index !== currentIndex) {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.maxHeight = "0px";
    }
  });
}
