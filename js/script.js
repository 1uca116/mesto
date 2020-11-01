// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
let popUpElement = document.querySelector(".popup");

let editButton = document.querySelector(".profile__edit")
let popUpCloseButton = document.querySelector(".popup__button-close")


function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = formElement.querySelector(".popup__type-name");
    let jobInput = formElement.querySelector(".popup__type-job");

    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__job");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopUp();
}

function openPopUp() {
    popUpElement.classList.add("popup_opened");
}
function closePopUp() {
    popUpElement.classList.remove("popup_opened");
}
function profileEditClickHandler(evt) {
    openPopUp();
}
function popUpCloseClickHandler(evt) {
    closePopUp();
}


formElement.addEventListener('submit', formSubmitHandler);
popUpCloseButton.addEventListener('click', popUpCloseClickHandler)
editButton.addEventListener('click', profileEditClickHandler);