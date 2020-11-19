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

const userTemplateContent = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places');


let imagePopUpElement = document.querySelector(".popup_open-picture");
let imageElement = imagePopUpElement.querySelector(".popup__picture");
let imageCaptionElement = imagePopUpElement.querySelector(".popup__description");
let imageContainerCloseButton = imagePopUpElement.querySelector(".popup__button-close");




initialCards.forEach(item => {
    let newElement = userTemplateContent.cloneNode(true);
    newElement.querySelector(".card__image").src = item.link;
    newElement.querySelector(".card__name").textContent = item.name;

    newElement.querySelector('.card__button-like')
        .addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__button-like_active');
    });

    newElement.querySelector('.card__button-delete')
        .addEventListener('click', function (deleteButton) {
        deleteButton.target.closest('.card').remove();
    });

    newElement.querySelector('.card__image')
        .addEventListener('click', function (image) {
            openImagePopup(item.link, item.name);
    });

    placesList.append(newElement);
})



let formElement = document.querySelector(".popup__form");
let popUpElement = document.querySelector(".popup");

let editButton = document.querySelector(".profile__edit")
let popUpCloseButton = document.querySelector(".popup__button-close")

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let popupInputName = formElement.querySelector(".popup__input_el_name");
let popupInputJob = formElement.querySelector(".popup__input_el_job");



let addCardButton = document.querySelector(".profile__add-card")
let addCardPopup = document.querySelector(".popup_add-card")
let addCardFormElement = addCardPopup.querySelector(".popup__form");
let addCardPopUpCloseButton = addCardPopup.querySelector(".popup__button-close")

let popupInputCardName = addCardPopup.querySelector(".popup__input_el_card-name");
let popupInputCardLink = addCardPopup.querySelector(".popup__input_el_card-link");



function openEditProfilePopUp() {
    popUpElement.classList.add("popup_opened");
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
}

function openAddCardPopup() {
    addCardPopup.classList.add("popup_opened");
    popupInputCardName.value = '';
    popupInputCardLink.value = '';
}

function openImagePopup(imageLink, imageCaption) {
    imagePopUpElement.classList.add("popup_opened");
    imageElement.src = imageLink;
    imageCaptionElement.textContent = imageCaption;
}


function closeEditProfilePopUp() {
    popUpElement.classList.remove("popup_opened");
}

function closeAddCardPopUp() {
    addCardPopup.classList.remove("popup_opened");
}

function closeImageContainer() {
    imagePopUpElement.classList.remove("popup_opened");
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closeEditProfilePopUp();
}



function addCardSaveHandler (evt) {
    evt.preventDefault();
    let newElement = userTemplateContent.cloneNode(true);

    newElement.querySelector(".card__image").src = popupInputCardLink.value;
    newElement.querySelector(".card__name").textContent = popupInputCardName.value;

    newElement.querySelector('.card__button-delete')
        .addEventListener('click', function (deleteButton) {
            deleteButton.target.closest('.card').remove();
    });
    newElement.querySelector('.card__image')
        .addEventListener('click', function (image) {
            openImagePopup(popupInputCardLink.value, popupInputCardName.value);
    });
    newElement.querySelector('.card__button-like')
        .addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button-like_active');
    });

    placesList.prepend(newElement);

    closeAddCardPopUp();
}



//event handlers
formElement.addEventListener('submit', formSubmitHandler);
popUpCloseButton.addEventListener('click', closeEditProfilePopUp);
editButton.addEventListener('click', openEditProfilePopUp);

addCardButton.addEventListener('click', openAddCardPopup);
addCardPopUpCloseButton.addEventListener('click', closeAddCardPopUp);
addCardFormElement.addEventListener('submit', addCardSaveHandler );

imageContainerCloseButton.addEventListener('click', closeImageContainer);