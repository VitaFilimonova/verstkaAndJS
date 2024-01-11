const rightButton = document.querySelector(".slider__arrow--right");
const leftButton = document.querySelector(".slider__arrow--left");
const buttons = document.querySelectorAll(".slider__arrow");
let images = document.querySelectorAll(" .slider__slides img");
let slides = document.querySelector(".slider__slides");
const container = document.querySelector(".slider__slides-container");
const points = document.querySelectorAll(".point");
// let imageIndex = 1;
// let intervalId;
//
//
// const autoSlide = () => {
//     intervalId = setInterval(()=> slideImage(++imageIndex),2000)
// }
// autoSlide()
// const slideImage = () => {
//
//     imageIndex = imageIndex ===images.length ? 0 : imageIndex < 0 ? images.length -1 : imageIndex
//
//     slides.style.transform = `translate(-${imageIndex * 100}%)`
// }
//
// const updateClick  = (e) => {
//     clearInterval(intervalId)
//     imageIndex += e.target.id === "next" ? 1 : -1
//     console.log()
//     slideImage(imageIndex)
//     autoSlide()
// }
// buttons.forEach((button) => button.addEventListener("click", updateClick))
//
// container.addEventListener("mouseover", () => clearInterval(intervalId))
// container.addEventListener("mouseleave", autoSlide)

// console.log(images)
//
let active = 1;
let lengthItems = images.length;
console.log(lengthItems);

const firstClone = images[0].cloneNode(true);
const lastClone = images[lengthItems - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slides.append(firstClone);
slides.prepend(lastClone);

slides.style.transform = `translateX(${-800 * active}px`;

rightButton.onclick = function () {
  console.log(active);
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  // reloadSlider();
};
leftButton.onclick = function () {
  console.log(active);
  if (active < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  // if (active === 0 ) {
  //     active = lengthItems
  // }
  // reloadSlider();
};
// let refreshSlider = setInterval(() => {
//     rightButton.click()
// }, 5000)
slides.addEventListener("transitionend", function (event) {
  console.log(event.propertyName);
  if (event.propertyName === "transform") {
    console.log(active);
    images = document.querySelectorAll(".slider__slides img");
    // Обработка завершения анимации свойства transform
    if (images[active].id === firstClone.id) {
      active = 1;
      slides.style.transform = `translateX(${-active * 800}px`;
    } else if (images[active].id === "last-clone") {
      // slides.style.transition = "none";
      active = lengthItems;
      slides.style.transform = `translateX(${-800 * active}px`;
    }
  }
});

const startSlide = () => {
  setInterval(() => {
    active++;
    slides.style.transform = `translateX(${-800 * active}px`;
  }, 2000);
  console.log(active);
};
startSlide();

// function reloadSlider() {
//     let checkLeft = images[active].offsetLeft;
//     // console.log(checkLeft)
//     // slides.style.left = -checkLeft + 'px';
//     slides.style.transform = `translate(${-active * 800}px)`
//
//     let lastActiveDot = document.querySelector('.point--active');
//     lastActiveDot.classList.remove('point--active');
//     points[active].classList.add('point--active');
//     clearInterval(refreshSlider)
//     refreshSlider = setInterval(() => {
//         rightButton.click()
//     }, 3000)
// }

points.forEach((el, index) => {
  el.addEventListener("click", function () {
    active = index;
    // reloadSlider()
  });
});

// let active = 0;
// let lengthItems = images.length - 1;
// let animationFrameId;
// let isAnimating = false;
//
// function slideTo(index) {
//     if (isAnimating || index === active) return;
//     isAnimating = true;
//     const offset = -images[0].offsetWidth * index;
//     const start = parseFloat(getComputedStyle(slides).left);
//     const duration = 500; // Продолжительность анимации (миллисекунды)
//
//     function animateSlide(timestamp) {
//         if (!startTime) {
//             startTime = timestamp;
//         }
//
//         const progress = timestamp - startTime;
//         slides.style.left = `${start + (offset - start) * (progress / duration)}px`;
//
//         if (progress < duration) {
//             animationFrameId = requestAnimationFrame(animateSlide);
//         } else {
//             active = index;
//             slides.style.left = `${-images[0].offsetWidth * active}px`;
//             isAnimating = false;
//             cancelAnimationFrame(animationFrameId);
//             updatePoints();
//         }
//     }
//
//     let startTime = null;
//     animationFrameId = requestAnimationFrame(animateSlide);
// }
//
// function updatePoints() {
//     points.forEach((el, index) => {
//         if (index === active) {
//             el.classList.add('point--active');
//         } else {
//             el.classList.remove('point--active');
//         }
//     });
// }
//
// rightButton.onclick = function () {
//     slideTo(active === lengthItems ? 0 : active + 1);
// }
//
// leftButton.onclick = function () {
//     slideTo(active === 0 ? lengthItems : active - 1);
// }
//
// points.forEach((el, index) => {
//     el.addEventListener('click', function () {
//         slideTo(index);
//     });
// });
//
// // Автоматическое переключение слайдов
// let refreshSlider = setInterval(() => slideTo(active === lengthItems ? 0 : active + 1), 5000);

// const imageContainer = document.querySelector('.slides');
//
// // Создайте массив с путями к изображениям
// const imageSources = [
//     './../image-slider/image1.jpg',
//     'image2.jpg',
//     'image3.jpg',
//     'image4.jpg',
//     'image5.jpg',
//     'image6.jpg',
//     'image7.jpg',
//     'image8.jpg',
//     'image9.jpg',
//     'image10.jpg'
// ];
//
// // Создайте и добавьте элементы <img> в контейнер
// imageSources.forEach((src, index) => {
//     const img = document.createElement('img');
//     img.src = src;
//     img.alt = `image ${index + 1}`;
//     imageContainer.appendChild(img);
// });
