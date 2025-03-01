/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

const carouselTrack = document.getElementById("carouselTrack");
const captionElement = document.getElementById("caption");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");
const autoplayBtn = document.getElementById("autoPlayButton");
const carouselNav = document.getElementById("carouselNav");

let currentIndex = 0;
let intervalId = null;

images.forEach((image, index) => {
  let img = document.createElement("div");
  img.classList.add("carousel-slide");
  img.style.backgroundImage = `url(${image.url})`;
  carouselTrack.appendChild(img);

  const indicator = document.createElement("div");
  indicator.classList.add("carousel-indicator");
  if (index === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => goToSlide(index));
  carouselNav.appendChild(indicator);
});

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  captionElement.textContent = images[currentIndex].caption;

  // Update indicators
  document.querySelectorAll(".carousel-indicator").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Next & Prev Buttons
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

// Auto-play functionality
function startAutoplay() {
  intervalId = setInterval(() => {
    nextBtn.click();
  }, 3000);
  autoplayBtn.textContent = "Stop Auto Play";
}

function stopAutoplay() {
  clearInterval(intervalId);
  intervalId = null;
  autoplayBtn.textContent = "Start Auto Play";
}

autoplayBtn.addEventListener("click", () => {
  if (intervalId) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

// Initialize first slide
updateCarousel();

// images.map((e) => {
//   const image = document.createElement("img");
//   // image.style.objectFit = "fill"
//   // image.style.height = "100%";
//   image.style.width = "200%";
//   image.style.backgroundPosition = "center";
//   // image.style.height = '80px'
//   image.src = e.url;
//   corousalTrack.appendChild(image);
// });
