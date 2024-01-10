const buttonSales = document.querySelectorAll(".button-sales");
const cookiesButtonAccept = document.querySelector("#accept-cookies");
const cookiesButtonDecline = document.querySelector("#decline-cookies");
// const cookiesButtonClose = document.querySelector(".cookies__close-button");
const cookies = document.querySelector(".cookies");
const contactsTab = document.querySelector(".contacts-tab");
const buttonSubmitForm = document.querySelector(".submit");
const thanksForm = document.querySelector(".thanks-tab");
const closeButton = document.querySelectorAll(".close-button");

const requiredFields = document.querySelectorAll(".required-value");
const superButton = document.querySelector(".button--super");
const overlay = document.querySelector(".overlay");
const error = document.querySelectorAll(".contacts-form__error");

const closeMobileMenu = document.querySelector(".mobile-menu__close-button");
const burgerButton = document.querySelector(".burger-button");

const mobileMenu = document.querySelector(".mobile-menu__container");
const globalError = document.querySelector(".contacts-form__global-error");
const submitButton = document.querySelector(".button-submit");

const inputs = document.querySelectorAll("input");
buttonSales.forEach((button) => {
  button.addEventListener("click", () => {
    // const modal = document.querySelector(button.dataset.modalTarget);
    openContactsTab();
  });
});

closeButton.forEach(function (button) {
  button.addEventListener("click", function () {
    // Получаем родительский элемент кнопки и добавляем класс "close"
    const parent = button.parentElement;
    parent.classList.remove("open");
    parent.classList.add("close");
    overlay.classList.remove("overlay-active");
    document.body.style.overflow = "auto";
  });
});

cookiesButtonDecline.addEventListener("click", closeCookies);
cookiesButtonAccept.addEventListener("click", closeCookies);

// buttonSubmitForm.addEventListener("click", openThanksTab)

burgerButton.addEventListener("click", function () {
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
});
closeMobileMenu.addEventListener("click", function () {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "auto";
});
// const requiredInputs = document.querySelectorAll(".required-value")

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
    if (phoneInput.value.length >= 16) {
      toggleErrorElement(input);
    }

    const hasEmptyRequiredFields = [...requiredInputs].some(
      (input) => input.value.trim().length === 0,
    );

    const globalErrorElement = document.querySelector(".global-error");
    globalErrorElement.classList.toggle("open", hasEmptyRequiredFields);
    buttonSubmitForm.disabled = !checkRequiredInputs();
  });
});

// function checkRequiredInputs() {
//     return [...requiredInputs].every((input) =>
//         input.value.trim().length !== 0 && phoneInput.values.length > 10
//
//     );
// }
//
// requiredInputs.forEach((input) => {
//     input.addEventListener("focusout", () => {
//         const errorElement = input.nextElementSibling;
//         errorElement.classList.toggle("open", input.value.trim().length === 0);
//         if(errorElement.className === "error open") {
//             input.classList.add("input-error")
//         } else {
//             input.classList.remove("input-error")
//         }
//
//         buttonSubmitForm.disabled = !checkRequiredInputs();
//
//
//
//         const hasEmptyRequiredFields = [...requiredInputs].some(
//             (input) => input.value.trim().length === 0
//         );
//
//         // Отображаем или скрываем глобальную ошибку
//         const globalErrorElement = document.querySelector(".global-error");
//         globalErrorElement.classList.toggle("open", hasEmptyRequiredFields);
//     });
// });

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  inputs.forEach((input) => {
    input.value = ""; // Устанавливаем значение инпута в пустую строку
  });

  buttonSubmitForm.disabled = true;

  openThanksTab();
});

superButton.addEventListener("click", function () {
  thanksForm.classList.remove("open");
  overlay.classList.remove("overlay-active");
  document.body.style.overflow = "auto";
});

function closeCookies() {
  cookies.classList.add("close");
}

function openContactsTab() {
  contactsTab.classList.add("open");
  overlay.classList.add("overlay-active");
  document.body.style.overflow = "hidden"; // Блокируем скроллинг страницы
}

function openThanksTab() {
  contactsTab.classList.remove("open");
  thanksForm.classList.add("open");
}

const phoneInput = document.querySelector("#phone-number");

const prefixNumber = (str) => {
  return "+7 ";
};

phoneInput.addEventListener("input", (e) => {
  const value = phoneInput.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result = "";

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
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
const invalidError = document.querySelector(".error-invalid");

phoneInput.addEventListener("focusout", function () {
  console.log(phoneInput.value.length);
  if (phoneInput.value.length < 16) {
    invalidError.classList.add("open");
  } else {
    invalidError.classList.remove("open");
  }
});
