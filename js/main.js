const overlay = document.querySelector(".overlay");
const globalError = document.querySelector(".contacts-form__global-error");
const inputs = document.querySelectorAll(".contacts-form__input-field");

// Сookies

const cookies = document.querySelector(".cookies");
const cookiesButtonAccept = document.querySelector("#accept-cookies");
const cookiesButtonDecline = document.querySelector("#decline-cookies");

cookiesButtonDecline.addEventListener("click", closeCookies);
cookiesButtonAccept.addEventListener("click", closeCookies);

function closeCookies() {
  cookies.classList.toggle("open");
}

// Mobile menu

const mobileMenu = document.querySelector(".mobile-menu__container");
const closeMobileMenu = document.querySelector(".mobile-menu__close-button");
const openMobileMenu = document.querySelector(".mobile-menu__open-button");
openMobileMenu.addEventListener("click", function () {
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
});
closeMobileMenu.addEventListener("click", function () {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto";
});

// Button sales

const buttonSales = document.querySelectorAll(".button-sales");
const contactsTab = document.querySelector(".contacts-tab__content");
buttonSales.forEach((button) => {
  button.addEventListener("click", openContactsTab);
});

function openContactsTab() {
  contactsTab.classList.add("open");
  overlay.classList.add("overlay-active");
  document.body.style.overflow = "hidden"; // Block page's scroll
}

// Close button

const closeButton = document.querySelectorAll(".close-button");
closeButton.forEach(function (button) {
  button.addEventListener("click", function () {
    const parent = button.parentElement;
    parent.classList.toggle("open");
    // parent.classList.add("close");
    overlay.classList.remove("overlay-active");
    document.body.style.overflow = "auto";
  });
});

// Valid form

const requiredInputs = document.querySelectorAll(".required-value");

function checkRequiredInputs() {
  return [...requiredInputs].every(
    (input) =>
      input.value.trim().length !== 0 && phoneInput.value.length === 16,
  );
}

function toggleErrorElement(input) {
  const errorElement = input.nextElementSibling;
  errorElement.classList.toggle("open", input.value.trim().length === 0);

  if (errorElement.className === "contacts-form__error open") {
    input.classList.add("input-error");
  } else {
    input.classList.remove("input-error");
  }
}

requiredInputs.forEach((input) => {
  input.addEventListener("focusout", () => {
    const isPhoneInputValid = phoneInput.value.length === 16;

    toggleErrorElement(input);
    const hasEmptyRequiredFields = [...requiredInputs].some(
      (input) => input.value.trim().length === 0,
    );

    globalError.classList.toggle(
      "open",
      !isPhoneInputValid || hasEmptyRequiredFields,
    );
    buttonSubmitForm.disabled = !checkRequiredInputs();
  });
});

// Mask for phone number

const phoneInput = document.querySelector("#phone-number");
const invalidError = document.querySelector(".error-invalid");

phoneInput.addEventListener("input", () => {
  const value = phoneInput.value.replace(/\D+/g, "");
  const numberLength = 11;
  const prefixNumber = "+7 ";

  let result = "";

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber;
        continue;
      case 4:
        result += " ";
        break;
      case 7:
        result += " ";
        break;
      case 9:
        result += " ";
        break;
      default:
        break;
    }
    result += value[i];
  }
  //
  phoneInput.value = result;
});

phoneInput.addEventListener("focusout", function () {
  console.log(phoneInput.value.length);

  if (phoneInput.value.length > 3 && phoneInput.value.length < 16) {
    // 3 is the number of the prefix and 16 is the sum of the number and ' '
    invalidError.classList.add("open");
    phoneInput.classList.add("input-error");
  } else {
    invalidError.classList.remove("open");
    phoneInput.nextElementSibling.classList.add("open");
    phoneInput.classList.add("input-error");
    // phoneInput.classList.remove("input-error");
  }
  if (phoneInput.value.length === 16) {
    phoneInput.nextElementSibling.classList.remove("open");
    phoneInput.classList.remove("input-error");
  }
});

// Button submit form

const buttonSubmitForm = document.querySelector(".button-submit");

buttonSubmitForm.addEventListener("click", (event) => {
  event.preventDefault();
  inputs.forEach((input) => {
    input.value = ""; // Clean inputs for the next time
  });
  buttonSubmitForm.disabled = true;
  openThanksTab();
});

function openThanksTab() {
  contactsTab.classList.remove("open");
  thanksForm.classList.add("open");
}

// Thanks tab

const thanksForm = document.querySelector(".thanks-tab");
const superButton = document.querySelector(".button-super");

superButton.addEventListener("click", function () {
  thanksForm.classList.remove("open");
  overlay.classList.remove("overlay-active");
  document.body.style.overflow = "auto";
});
