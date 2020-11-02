// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
let popUpElement = document.querySelector(".popup");

let editButton = document.querySelector(".profile__edit")
let popUpCloseButton = document.querySelector(".popup__button-close")

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let popupInputName = formElement.querySelector(".popup__type-name");
let popupInputJob = formElement.querySelector(".popup__type-job");

function openPopUp() {
    popUpElement.classList.add("popup_opened");
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
}

function closePopUp() {
    popUpElement.classList.remove("popup_opened");
}
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);
popUpCloseButton.addEventListener('click', closePopUp);
editButton.addEventListener('click', openPopUp);
