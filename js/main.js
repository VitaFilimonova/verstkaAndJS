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

const mobileMenu =  document.querySelector(".mobile-menu__container")
buttonSales.forEach((button) => {
    button.addEventListener("click", () => {
    // const modal = document.querySelector(button.dataset.modalTarget);
    openContactsTab();
  });
});

closeButton.forEach(function(button) {
    button.addEventListener("click",
        function() {
        // Получаем родительский элемент кнопки и добавляем класс "close"
        const parent = button.parentElement;
        console.log(parent.className)
        parent.classList.remove("open");
        parent.classList.add("close");
        overlay.classList.remove("overlay-active")
            document.body.style.overflow = 'auto';
    });
});

// cookiesButtonClose.addEventListener("click", closeCookies);
// closeButton.addEventListener("click", closeCookies);
cookiesButtonDecline.addEventListener("click", closeCookies);
cookiesButtonAccept.addEventListener("click", closeCookies);


buttonSubmitForm.addEventListener("click", openThanksTab)

burgerButton.addEventListener("click", function () {
    mobileMenu.classList.add('open')
    document.body.style.overflow = 'hidden';
})
closeBurgerMenu.addEventListener("click", function () {
    mobileMenu.classList.remove('open')
    document.body.style.overflow = 'auto';
})

superButton.addEventListener("click", function () {
    thanksForm.classList.remove("open");
    overlay.classList.remove("overlay-active")
    document.body.style.overflow = 'auto';
    // thanksForm.classList.add("close");
})

requiredFields.forEach(field => {
    field.addEventListener("submit", value => {
       console.log(requiredFields.value)
        if (requiredFields.value ==='') {
            error.forEach(err=> {
                err.classList.add("open")
            })
        }
    })
})
function closeCookies() {
  // if (modal != null) return
  cookies.classList.add("close");
}

function openContactsTab() {
  // if (modal === null) return;
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