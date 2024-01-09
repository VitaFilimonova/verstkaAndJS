const buttonSales = document.querySelectorAll(".button-sales");
const cookiesButtonAccept = document.querySelector("#accept-cookies");
const cookiesButtonDecline = document.querySelector("#decline-cookies");
// const cookiesButtonClose = document.querySelector(".cookies__close-button");
const cookies = document.querySelector("#cookies");
const contactsTab = document.querySelector(".contacts-tab");
const buttonSubmitForm = document.querySelector(".submit");
const thanksForm = document.querySelector(".thanks-tab");
const closeButton = document.querySelectorAll('.close-button')

const requiredFields = document.querySelectorAll(".required-value")
const superButton = document.querySelector(".super-button")
const overlay = document.querySelector(".overlay")
const error = document.querySelectorAll(".error")

const closeBurgerMenu = document.querySelector(".close-burger-menu")
const burgerButton = document.querySelector(".burger-button")

const mobileMenu = document.querySelector(".mobile-menu__container")
const globalError = document.querySelector(".global-error")
const submitButton = document.querySelector(".submit")

const inputs = document.querySelectorAll("input");
buttonSales.forEach((button) => {
    button.addEventListener("click", () => {
        // const modal = document.querySelector(button.dataset.modalTarget);
        openContactsTab();
    });
});

closeButton.forEach(function (button) {
    button.addEventListener("click",
        function () {
            // Получаем родительский элемент кнопки и добавляем класс "close"
            const parent = button.parentElement;
            parent.classList.remove("open");
            parent.classList.add("close");
            overlay.classList.remove("overlay-active")
            document.body.style.overflow = 'auto';

        });
});


cookiesButtonDecline.addEventListener("click", closeCookies);
cookiesButtonAccept.addEventListener("click", closeCookies);


// buttonSubmitForm.addEventListener("click", openThanksTab)

burgerButton.addEventListener("click", function () {
    mobileMenu.classList.add('open')
    document.body.style.overflow = 'hidden';
})
closeBurgerMenu.addEventListener("click", function () {
    mobileMenu.classList.remove('open')
    document.body.style.overflow = 'auto';
})
// const requiredInputs = document.querySelectorAll(".required-value")


const requiredInputs = document.querySelectorAll(".required-value");

// const buttonSubmitForm = document.querySelector(".submit");

function checkRequiredInputs() {
    return [...requiredInputs].every((input) => input.value.trim().length !== 0);
}

requiredInputs.forEach((input) => {
    input.addEventListener("focusout", () => {
        const errorElement = input.nextElementSibling;
        errorElement.classList.toggle("open", input.value.trim().length === 0);
        buttonSubmitForm.disabled = !checkRequiredInputs();
    });
});

//
// requiredInputs.forEach((input) => {
//     input.addEventListener("focusout", (event) => {
//         // const value = input.value;
//         let errorElement = event.target.nextElementSibling
//         console.log(event.target.nextElementSibling)
//         // console.log(event.target.validity.valid)
//         // console.log()
//
//         if (event.target.value.trim().length === 0) {
//             errorElement.classList.add("open"); // Show the error message
//         }
//         else {
//             errorElement.classList.remove("open"); // Show the error message
//         }
//
//         const showenErrors = input
//         console.log(showenErrors)
//         if (showenErrors.length === 0) {
//             buttonSubmitForm.disabled = false;
//             // openThanksTab()
//         }
//         else {
//             buttonSubmitForm.disabled = true;
//         }
//     })
// })
submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    inputs.forEach((input) => {
        input.value = ""; // Устанавливаем значение инпута в пустую строку
    });


    buttonSubmitForm.disabled = true


    openThanksTab()
})

superButton.addEventListener("click", function () {
    thanksForm.classList.remove("open");
    overlay.classList.remove("overlay-active")
    document.body.style.overflow = 'auto';
})

// requiredFields.forEach(field => {
//     field.addEventListener("submit", value => {
//         console.log(requiredFields.value)
//         if (requiredFields.value === '') {
//             error.forEach(err => {
//                 err.classList.add("open")
//             })
//         }
//     })
// })

function closeCookies() {
    cookies.classList.add("close");
}

function openContactsTab() {
    contactsTab.classList.add("open");
    overlay.classList.add("overlay-active")
    document.body.style.overflow = 'hidden'; // Блокируем скроллинг страницы
}

function openThanksTab() {
    contactsTab.classList.remove("open");
    thanksForm.classList.add("open")

}

function closeTab() {
    const parent = button.parentElement;
    console.log(parent)
    parent.classList.remove("open");
    parent.classList.add("close");
}


