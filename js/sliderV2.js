const rightButton = document.querySelector(".slider__arrow--right");
const leftButton = document.querySelector(".slider__arrow--left");
const buttons = document.querySelectorAll(".slider__arrow");
let images = document.querySelectorAll(" .slider__slides img");
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

            slides.style.marginLeft = -800 + "px";
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

// const lastClone = images[allImagesLength - 1].cloneNode(true);
// lastClone.id = "last-clone";
// slides.prepend(lastClone);

// rightButton.onclick = function () {
//   slides.style.marginLeft = -imageWidth + "px";
// };
//
// leftButton.onclick = function () {
//   slides.style.marginLeft = imageWidth + "px";
// };

// function moveSlider(direction) {
//   if (!isAnimating) {
//     isAnimating = true;
//     let marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
//     let targetMargin;
//
//     if (direction === "left") {
//       currentSlide--;
//       if (currentSlide < 1) {
//         currentSlide = 5;
//         slides.style.marginLeft = -imageWidth * (currentSlide - 1) + "px";
//         // slides.style.marginLeft = -3200 + "px";
//         // marginLeft = parseInt(getComputedStyle(slides).marginLeft, 10);
//       }
//
//       targetMargin = marginLeft + imageWidth;
//     } else {
//       currentSlide++;
//       if (currentSlide > 5) {
//         currentSlide = 1;
//       }
//       targetMargin = marginLeft - imageWidth;
//     }
//
//     let animationStartTime = Date.now();
//     console.log(currentSlide);
//     function animate() {
//       let currentTime = Date.now() - animationStartTime;
//
//       if (currentTime < animationSpeed) {
//         let progress = currentTime / animationSpeed;
//         let currentMargin = marginLeft + (targetMargin - marginLeft) * progress;
//
//         slides.style.marginLeft = currentMargin + "px";
//         requestAnimationFrame(animate);
//       } else {
//         updatePoints();
//         // if (currentSlide === 5) {
//         //   slides.style.marginLeft = 3200 + "px";
//         // } else {
//         slides.style.marginLeft = -imageWidth * (currentSlide - 1) + "px";
//         // }
//
//         isAnimating = false;
//         disableButtons(false);
//       }
//     }
//
//     animate();
//     isAnimating = true;
//     disableButtons(true);
//   }
// }
let totalSlides = 5;
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
  } else {
    currentSlide++;
    targetMargin = marginLeft - imageWidth;
    if (currentSlide >= totalSlides) {
      currentSlide = 0; // Loop back to the start
    }
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
      if (currentSlide === 0) {
        slides.style.marginLeft = "0px"; // Reset to start position
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

window.onload = function () {
  slides.style.marginLeft = "-800px"; // Set to the first actual slide
};
// points.forEach((el, index) => {
//     el.addEventListener('click', function () {
//       moveSlider(index);
//     });
// });
