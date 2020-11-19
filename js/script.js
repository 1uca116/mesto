// Находим форму в DOM
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const userTemplate = document.querySelector("#card-template");
const userTemplateContent = userTemplate.content;
const placesList = document.querySelector(".places");

initialCards.forEach(item => {
    let newElement = userTemplateContent.cloneNode(true);
    newElement.querySelector(".card__image").src = item.link;
    newElement.querySelector(".card__name").textContent = item.name;

    newElement.querySelector('.card__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__button-like_active');
    }); 
    placesList.append(newElement);
})




let formElement = document.querySelector(".popup__form");
let popUpElement = document.querySelector(".popup");

let editButton = document.querySelector(".profile__edit");
let popUpCloseButton = document.querySelector(".popup__button-close");

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let popupInputName = formElement.querySelector(".popup__input_el_name");
let popupInputJob = formElement.querySelector(".popup__input_el_job");

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
