const buttonSales = document.querySelectorAll(".button");
const cookiesButtonAccept = document.querySelector("#accept-cookies");
const cookiesButtonDecline = document.querySelector("#decline-cookies");
const cookiesButtonClose = document.querySelector(".cookies__close-button");
const cookies = document.querySelector("#cookies");
const contactsTab = document.querySelector(".contacts-tab");
// buttonSales.addEventListener('click',openForm)
// cookiesButtonAccept.addEventListener('click',)
// cookiesButtonDecline.addEventListener('click',)

buttonSales.forEach((button) => {
  button.addEventListener("click", () => {
    // const modal = document.querySelector(button.dataset.modalTarget);
    openContactsTab();
  });
});

cookiesButtonClose.addEventListener("click", closeCookies);
cookiesButtonDecline.addEventListener("click", closeCookies);
cookiesButtonAccept.addEventListener("click", closeCookies);

function closeCookies() {
  // if (modal != null) return
  cookies.classList.add("non-active");
}

function openContactsTab() {
  // if (modal === null) return;
  contactsTab.classList.add("open", "overlay");
}
