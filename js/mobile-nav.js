const burgerMenu = document.querySelector(".burger-button");
const closeBurgerMenu = document.querySelector("");
const mobileNav = document.querySelector(".mobile-menu__container");

burgerMenu.onclick = function () {
  document.body.style.overflow = "hidden";
  mobileNav.classList.add("open");
  closeBurgerMenu.classList.toggle("open");
};
