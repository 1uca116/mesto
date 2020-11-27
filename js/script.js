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

function getCardImageElement(parent) {
    return parent.querySelector('.card__image');
}
function getCardDeleteButtonElement(parent) {
    return parent.querySelector('.card__button-delete');
}
function getCardLikeButtonElement(parent) {
    return parent.querySelector('.card__button-like');
}

function createCard(template, imageLink, imageName) {
    const newElement = template.cloneNode(true);
    const cardImage = getCardImageElement(newElement);
    cardImage.src = imageLink;
    cardImage.alt = imageName;
    newElement.querySelector('.card__name').textContent = imageName;

    getCardLikeButtonElement(newElement)
        .addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button-like_active');
        });

    getCardDeleteButtonElement(newElement)
        .addEventListener('click', function (deleteButton) {
            deleteButton.target.closest('.card').remove();
        });

    cardImage.addEventListener('click', function () {
        openImagePopup(imageLink, imageName);
    });

    return newElement;
}

initialCards.forEach(item => {
    const card = createCard(cardTemplateContent, item.link, item.name);
    placesList.append(card);
})

const formElement = document.querySelector('.popup__form');

const profilePopup = document.querySelector('.popup_profile');
const profileForm = profilePopup.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit')
const popUpCloseButton = profilePopup.querySelector('.popup__button-close')

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupInputName = formElement.querySelector('.popup__input_el_name');
const popupInputJob = formElement.querySelector('.popup__input_el_job');



const addCardButton = document.querySelector('.profile__add-card')
const addCardPopup = document.querySelector('.popup_add-card')
const addCardFormElement = addCardPopup.querySelector('.popup__form');
const addCardPopUpCloseButton = addCardPopup.querySelector('.popup__button-close')

const popupInputCardName = addCardPopup.querySelector('.popup__input_el_card-name');
const popupInputCardLink = addCardPopup.querySelector('.popup__input_el_card-link');

function openPopUp(element) {
    element.classList.add('popup_opened');
}

function closePopUp(element) {
    element.classList.remove('popup_opened');
}

function openEditProfilePopUp() {
    openPopUp(popUpElement);
    popupInputName.value = profileName.textContent;
    popupInputJob.value = profileJob.textContent;
}

function openAddCardPopup() {
    openPopUp(addCardPopup);
    popupInputCardName.value = '';
    popupInputCardLink.value = '';
}

function openImagePopup(imageLink, imageCaption) {
    openPopUp(imagePopUpElement);
    imageElement.src = imageLink;
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

function closeEditProfilePopUp() {
    resetForm(formElement);
    closePopUp(popUpElement);
}

function closeAddCardPopUp() {
    resetForm(addCardFormElement);
    closePopUp(addCardPopup);
}

function closeImageContainer() {
    closePopUp(imagePopUpElement);
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closeEditProfilePopUp();
}



function addCardSaveHandler (evt) {
    evt.preventDefault();

    const data = {
        link: popupInputCardLink.value,
        name: popupInputCardName.value
    }

    const card = createCard(cardTemplateContent, data.link, data.name);
    placesList.prepend(card);
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

document.addEventListener('keydown', function (evt) {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
        const form = popup.querySelector('.popup__form');
        if (evt.key === 'Escape') {
            resetForm(form)
            closePopUp(popup);
        }
    }
});

[profilePopup, addCardPopup, imagePopUpElement].forEach(element => {
    element.addEventListener('click', function (evt) {
        if (element.classList.contains('popup_opened') && evt.target === element) {
            closePopUp(element);
        }
    });
})
