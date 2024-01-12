const rightButton = document.querySelector(".slider__arrow--right");
const leftButton = document.querySelector(".slider__arrow--left");
const startAnimationButton = document.querySelector(".start-button");

const container = document.querySelector(".slider__slides-container");
const slides = document.querySelector(".slider__slides");
let images = document.querySelectorAll(" .slider__slides img");
const points = document.querySelectorAll(".slider__point");

const imageWidth = parseFloat(getComputedStyle(container).width);

const lastSlide = images.length - 1;
const totalSlides = images.length - 2;

const animationSpeed = 1000;
const pause = 1000;

let interval;
let currentSlide = 1;
let isAnimating = false;

//  Before use slider set "marginLeft" and hide this moment from users via style.display = "block";
window.onload = function () {
  slides.style.marginLeft = `-${imageWidth}px`;
  container.style.display = "block";
};
//  The button that start slider-show
startAnimationButton.addEventListener("click", startSlider);

function startSlider() {
  disableButtons(true); // Block all actions during animation

  interval = setInterval(function () {
    if (!isAnimating) {
      isAnimating = true;

      let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10); // Actual value marginLeft from CSS
      let newMargin = marginLeft - imageWidth;

      let animationStartTime = Date.now();

      function animate() {
        let currentTime = Date.now() - animationStartTime;

        if (currentTime < animationSpeed) {
          let progress = currentTime / animationSpeed;
          let currentMargin = marginLeft - progress * imageWidth;

          slides.style.marginLeft = currentMargin + "px";
          requestAnimationFrame(animate);
        } else {
          currentSlide++;

          if (currentSlide === lastSlide) {
            currentSlide = 1;
            slides.style.marginLeft = `-${imageWidth}px`;

            stopSlider(); // Clear timer
            disableButtons(false); // Unlock all actions after animation
          } else {
            marginLeft = newMargin;
            slides.style.marginLeft = marginLeft + "px";
          }
          isAnimating = false;
        }
        updatePoints();
      }

      animate();
    }
  }, pause);
}

function stopSlider() {
  clearInterval(interval);
}

function moveSlider(direction) {
  if (isAnimating) return;
  isAnimating = true;

  let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10); // Actual value marginLeft from CSS
  let targetMargin;

  if (direction === "left") {
    currentSlide--;

    if (currentSlide < 1) {
      currentSlide = totalSlides;
      slides.style.marginLeft = -imageWidth * (totalSlides + 1) + "px"; // Move instantly to the duplicate slide
      marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
    }
    targetMargin = marginLeft + imageWidth;
  } else if (direction === "right") {
    currentSlide++;
    targetMargin = marginLeft - imageWidth;

    if (currentSlide > totalSlides) {
      currentSlide = 1; // Loop back to the start
    }
  }
  updatePoints();
  animateMarginChange(marginLeft, targetMargin);
}

function animateMarginChange(startMargin, endMargin) {
  let animationStartTime = Date.now();

  function animate() {
    let currentTime = Date.now() - animationStartTime;
    let progress = currentTime / animationSpeed;

    if (progress < 1) {
      let currentMargin = startMargin + (endMargin - startMargin) * progress;
      slides.style.marginLeft = currentMargin + "px";
      requestAnimationFrame(animate);
    } else {
      slides.style.marginLeft = endMargin + "px";
      if (currentSlide === 1) {
        slides.style.marginLeft = `-${imageWidth}px`; // Reset to start position
      }
      isAnimating = false;
    }
  }

  requestAnimationFrame(animate);
}

// Update active point
function updatePoints() {
  points.forEach((elem, index) => {
    index === currentSlide - 1
      ? elem.classList.add("slider__point--active")
      : elem.classList.remove("slider__point--active");
  });
}

// Disable buttons and points click
function disableButtons(disable) {
  leftButton.disabled = disable;
  rightButton.disabled = disable;
  startAnimationButton.disabled = disable;
  points.forEach((el) => {
    disable ? el.classList.add("disable") : el.classList.remove("disable");
  });
}

rightButton.onclick = function () {
  moveSlider("right");
};

leftButton.onclick = function () {
  moveSlider("left");
};

points.forEach((el, index) => {
  el.addEventListener("click", () => moveSliderPoint(index));
});

function moveSliderPoint(index) {
  if (isAnimating) return;
  isAnimating = true;

  let startMargin = parseInt(getComputedStyle(slides).marginLeft, 10);
  currentSlide = index + 1;
  let endMargin = -imageWidth * currentSlide;

  animateMarginChange(startMargin, endMargin);
  updatePoints();
}
