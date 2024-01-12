const rightButton = document.querySelector(".slider__arrow--right");
const leftButton = document.querySelector(".slider__arrow--left");
const buttons = document.querySelectorAll(".slider__arrow");
let images = document.querySelectorAll(" .slider__slides img");
// let slides = document.querySelector(".slider__slides");
const container = document.querySelector(".slider__slides-container");
const points = document.querySelectorAll(".point");
console.log(images.length);
let currentSlide = 1;

const computedStyles = getComputedStyle(container);
const imageWidth = parseFloat(computedStyles.width);
console.log(imageWidth);
const animationSpeed = 1000;
const pause = 1000;
const startAnimationButton = document.querySelector(".start-button");
const slides = document.querySelector(".slider__slides");
const allImagesLength =
  document.querySelectorAll(".slider__slides img").length - 1;
let start = Date.now(); // запомнить время начала

let interval;
let isAnimating = false;
let isAnimationInProgress = false;

window.onload = function () {
  slides.style.marginLeft = `-${imageWidth}px`;
  container.style.display = "block";
};

const num = images.length - 1;

function startSlider(item) {
  interval = setInterval(function () {
    // if (!stopAllAnimation) {
    if (!isAnimating) {
      isAnimating = true;

      let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
      let newMargin = marginLeft - imageWidth;

      let animationStartTime = Date.now();

      function animate() {
        let currentTime = Date.now() - animationStartTime;

        if (currentTime < animationSpeed) {
          let easedProgress = currentTime / animationSpeed; // Quadratic easing
          let currentMargin = marginLeft - easedProgress * imageWidth;

          slides.style.marginLeft = currentMargin + "px";
          isAnimationInProgress = false;

          requestAnimationFrame(animate);
        } else {
          updatePoints();
          currentSlide++;
          console.log(currentSlide);
          if (currentSlide === num) {
            currentSlide = 1;

            slides.style.marginLeft = `-${imageWidth}px`;
            stopSlider();
            updatePoints();
            isAnimationInProgress = false;
            disableButtons(false);
          } else {
            marginLeft = newMargin;
            slides.style.marginLeft = marginLeft + "px";
            isAnimating = false;
            updatePoints();
          }
          isAnimating = false;
        }
      }

      animate();
      isAnimationInProgress = true;
      disableButtons(true);
      // }
    }
  }, pause);
}

function stopSlider() {
  clearInterval(interval);
}

startAnimationButton.addEventListener("click", startSlider);

//
function updatePoints() {
  points.forEach((el, index) => {
    if (index === currentSlide - 1) {
      el.classList.add("point--active");
    } else {
      el.classList.remove("point--active");
    }
  });
}

function disableButtons(disable) {
  leftButton.disabled = disable;
  rightButton.disabled = disable;
}

let totalSlides = images.length - 2;

function moveSlider(direction) {
  if (isAnimating) return;

  isAnimating = true;
  let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
  let targetMargin;

  if (direction === "left") {
    currentSlide--;

    if (currentSlide < 1) {
      currentSlide = totalSlides; // Assuming totalSlides is the total number of slides excluding the duplicate
      slides.style.marginLeft = -imageWidth * (totalSlides + 1) + "px"; // Move instantly to the duplicate slide
      marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
    }
    targetMargin = marginLeft + imageWidth;
    updatePoints();
  } else if (direction === "right") {
    currentSlide++;
    targetMargin = marginLeft - imageWidth;

    if (currentSlide > totalSlides) {
      currentSlide = 1; // Loop back to the start
    }
    updatePoints();
  }
  console.log(currentSlide);
  animateMarginChange(marginLeft, targetMargin);
}

function animateMarginChange(startMargin, endMargin) {
  let animationStartTime = Date.now();

  function animate() {
    let timeElapsed = Date.now() - animationStartTime;
    let progress = timeElapsed / animationSpeed;
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

rightButton.onclick = function () {
  moveSlider("right");
};

leftButton.onclick = function () {
  moveSlider("left");
};

points.forEach((el, index) => {
  el.addEventListener("click", function () {
    moveSliderPoint(index);
  });
});

function moveSliderPoint(index) {
  if (isAnimating) return;

  isAnimating = true;
  let startMargin = parseInt(getComputedStyle(slides).marginLeft, 10);
  let targetSlideIndex = index + 1; // Adjusting for the duplicate slide at the start
  let endMargin = -imageWidth * targetSlideIndex;

  currentSlide = index + 1; // Update the current slide index
  animateMarginChange(startMargin, endMargin);
  updatePoints(); // Update the points to reflect the new current slide
}
