import './index.css'
import {Card} from '../components/Card.js'
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import * as constants from "../utils/constants.js";

const cardTemplateContent = document.querySelector('#card-template').content;
const userInfo = new UserInfo('.profile__name','.profile__job');
const imagePopUp = new PopupWithImage('.popup_open-picture');


function renderer(imageLink, imageTitle) {
    return new Card(
        imageTitle,
        imageLink,
        cardTemplateContent,
        imagePopUp.open.bind(imagePopUp)).generateCard();
}

const sectionData = {items: constants.initialCards, renderer: renderer}

const section = new Section(sectionData, document.querySelector('.places'));
section.render();

function onProfileEditSubmit(values) {
    const data = {
        name: values['profile-name'],
        job: values['profile-job']
    }
    userInfo.setUserInfo(data);
}

function onAddCardSubmit(values) {
    const card = renderer(values['card-link'], values['card-name'])
    section.addCard(card);
}

const profileEditPopup = new PopupWithForm('.popup_profile', onProfileEditSubmit );
const addCardPopup = new PopupWithForm('.popup_add-card', onAddCardSubmit );

[imagePopUp, profileEditPopup, addCardPopup].forEach(popup => {
    popup.setEventListeners();
});

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', () => {
    profileFormValidator.resetErrors();
    profileEditPopup.open();
});

const addCardButton = document.querySelector('.profile__add-card');
addCardButton.addEventListener('click', () => {
    addCardFormValidator.resetErrors();
    addCardPopup.open();
});

const popupProfileForm = document.querySelector('.popup__form_profile');
const profileFormValidator = new FormValidator(popupProfileForm, constants.selectors);
profileFormValidator.enableValidation();

const addCardForm = document.querySelector('.popup__form_add-card');
const addCardFormValidator = new FormValidator(addCardForm, constants.selectors);
addCardFormValidator.enableValidation();