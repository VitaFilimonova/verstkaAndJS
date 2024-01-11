const rightButton = document.querySelector(".slider__arrow--right");
const leftButton = document.querySelector(".slider__arrow--left");
const buttons = document.querySelectorAll(".slider__arrow");
let images = document.querySelectorAll(" .slider__slides");
// let slides = document.querySelector(".slider__slides");
const container = document.querySelector(".slider__slides-container");
const points = document.querySelectorAll(".point");

let currentSlide = 1;
const imageWidth = 800;
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
          if (currentSlide === 6) {
            currentSlide = 1;

            slides.style.marginLeft = "0";
            stopSlider();
            updatePoints();
            isAnimationInProgress = false;
            disableButtons(false);
          } else {
            marginLeft = newMargin;
            slides.style.marginLeft = marginLeft + "px";
            isAnimating = false;
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
    if (index === currentSlide) {
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

// rightButton.onclick = function () {
//   slides.style.marginLeft = -imageWidth + "px";
// };
//
// leftButton.onclick = function () {
//   slides.style.marginLeft = imageWidth + "px";
// };

function moveSlider(direction) {
  if (!isAnimating) {
    isAnimating = true;
    let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
    let targetMargin;

    if (direction === "left") {
      currentSlide--;
      if (currentSlide < 1) {
        currentSlide = 5;
      }
      targetMargin = marginLeft + imageWidth;
    } else {
      currentSlide++;
      if (currentSlide > 5) {
        currentSlide = 1;
      }
      targetMargin = marginLeft - imageWidth;
    }

    let animationStartTime = Date.now();

    function animate() {
      let currentTime = Date.now() - animationStartTime;

      if (currentTime < animationSpeed) {
        let progress = currentTime / animationSpeed;
        let currentMargin = marginLeft + (targetMargin - marginLeft) * progress;

        slides.style.marginLeft = currentMargin + "px";

        requestAnimationFrame(animate);
      } else {
        updatePoints();
        slides.style.marginLeft = -imageWidth * (currentSlide - 1) + "px";

        isAnimating = false;
        disableButtons(false);
      }
    }

    animate();
    isAnimating = true;
    disableButtons(true);
  }
}

rightButton.onclick = function () {
  moveSlider("right");
};

leftButton.onclick = function () {
  moveSlider("left");
};

// points.forEach((el, index) => {
//     el.addEventListener('click', function () {
//         slideTo(index);
//     });
// });
