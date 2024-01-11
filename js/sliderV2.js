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

let start = Date.now(); // запомнить время начала

let interval;
let isAnimating = false;
let stopAllAnimation = false;

function startSlider() {
  interval = setInterval(function () {
    if (!isAnimating) {
      isAnimating = true;

      let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
      let newMargin = marginLeft - imageWidth;

      let animationStartTime = Date.now();

      function animate() {
        let currentTime = Date.now() - animationStartTime;

        if (currentTime < animationSpeed) {
          let easedProgress = (currentTime / animationSpeed) ** 2; // Quadratic easing

          slides.style.marginLeft =
            marginLeft - easedProgress * imageWidth + "px";

          requestAnimationFrame(animate);
        } else {
          updatePoints();
          currentSlide++;

          if (currentSlide === 6) {
            currentSlide = 0;

            slides.style.marginLeft = "0";
            stopSlider();
            updatePoints();
            stopAllAnimation = true;
          }

          isAnimating = false;
        }
      }

      animate();
      console.log(currentSlide);
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
console.log(points[0]);

rightButton.onclick = function () {
  slideTo(active === lengthItems ? 0 : active + 1);
};

leftButton.onclick = function () {
  slideTo(active === 0 ? lengthItems : active - 1);
};

// points.forEach((el, index) => {
//     el.addEventListener('click', function () {
//         slideTo(index);
//     });
// });
