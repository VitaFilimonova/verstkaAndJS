
const buttonSales = document.querySelectorAll('#contact-sales')
const cookiesButtonAccept = document.querySelectorAll('#accept-cookies')
const cookiesButtonDecline = document.querySelectorAll('#decline-cookies')
const cookiesButtonClose = document.querySelector('.cookies__close-button')
const cookies = document.querySelector('#cookies')


// buttonSales.addEventListener('click',openForm)
// cookiesButtonAccept.addEventListener('click',)
// cookiesButtonDecline.addEventListener('click',)


// cookiesButtonClose.forEach(button => {
//     button.addEventListener('click', () => {
//         const modal = document.querySelector(button.dataset.modalTarget)
//         closeCookies(modal)
//     }
//   )})

cookiesButtonClose.addEventListener('click', closeCookies)

// function openForm () {
//
// }

function closeCookies () {
    // if (modal != null) return
    cookies.classList.add('non-active')
}