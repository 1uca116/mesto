import {Card} from './Card.js'
import {FormValidator} from "./FormValidator.js";

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

const cardTemplateContent = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places');


const imagePopUpElement = document.querySelector('.popup_open-picture');
const imageElement = imagePopUpElement.querySelector('.popup__picture');
const imageCaptionElement = imagePopUpElement.querySelector('.popup__description');
const imageContainerCloseButton = imagePopUpElement.querySelector('.popup__button-close');


initialCards.forEach(item => {
    const card = new Card(
        item.name,
        item.link,
        cardTemplateContent,
        openImagePopup).generateCard();
    placesList.append(card);
})



const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit')
const popUpCloseButton = profilePopup.querySelector('.popup__button-close')

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = profilePopup.querySelector('.popup__input_el_name');
const popupInputJob = profilePopup.querySelector('.popup__input_el_job');



const addCardButton = document.querySelector('.profile__add-card')
const addCardPopup = document.querySelector('.popup_add-card')
const addCardFormElement = addCardPopup.querySelector('.popup__form');
const addCardPopUpCloseButton = addCardPopup.querySelector('.popup__button-close')

const popupInputCardName = addCardPopup.querySelector('.popup__input_el_card-name');
const popupInputCardLink = addCardPopup.querySelector('.popup__input_el_card-link');

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopUp(popup);
    }
}

function openPopUp(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', closeByEscape)
}

function closePopUp(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEscape);
}

function openEditProfilePopUp() {
    openPopUp(profilePopup);
    resetForm(profileForm);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
}


function openAddCardPopup() {
    openPopUp(addCardPopup);
    resetForm(addCardFormElement);
    popupInputCardName.value = '';
    popupInputCardLink.value = '';
}

function openImagePopup(imageLink, imageCaption) {
    openPopUp(imagePopUpElement);
    imageElement.src = imageLink;
    imageElement.alt = imageCaption;
    imageCaptionElement.textContent = imageCaption;
}



function removeErrors(form) {
    form.querySelectorAll('.popup__error')
        .forEach(x => {
            x.classList.remove('popup__error_visible');
        });
    form.querySelectorAll('.popup__input')
        .forEach(x => {
            x.classList.remove('popup__input_error');
        });
    const button = form.querySelector('.popup__button-save');
    if (button.attributes.getNamedItem('disabled') === null) {
        button.classList.add('popup__button-save_disabled');
        button.setAttribute('disabled', 'disabled');
    }
}

function resetForm(form) {
    removeErrors(form);
    form.reset();
}


function closeAddCardPopUp() {
    closePopUp(addCardPopup);
}

function closeImageContainer() {
    closePopUp(imagePopUpElement);
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopUp(profilePopup);
}



function addCardSaveHandler (evt) {
    evt.preventDefault();

    const data = {
        link: popupInputCardLink.value,
        name: popupInputCardName.value
    }
    const card = new Card(
        data.name,
        data.link,
        cardTemplateContent,
        openImagePopup).generateCard();
    placesList.prepend(card);
    closeAddCardPopUp();
}

//event handlers
profilePopup.addEventListener('submit', formSubmitHandler);
popUpCloseButton.addEventListener('click', closePopUp(profilePopup));
editButton.addEventListener('click', openEditProfilePopUp);

addCardButton.addEventListener('click', openAddCardPopup);
addCardPopUpCloseButton.addEventListener('click', closeAddCardPopUp);
addCardFormElement.addEventListener('submit', addCardSaveHandler );

imageContainerCloseButton.addEventListener('click', closeImageContainer);


[profilePopup, addCardPopup, imagePopUpElement].forEach(element => {
    element.addEventListener('click', function (evt) {
        if (element.classList.contains('popup_opened') && evt.target === element) {
            closePopUp(element);
        }
    });
})


Array.from(document.querySelectorAll(".popup__form")).forEach(element => {
    const selectors = {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-save',
        inactiveButtonClass: 'popup__button-save_disabled',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__error_visible'
    }
    const formValidator = new FormValidator(element, selectors);
    formValidator.enableValidation();
})