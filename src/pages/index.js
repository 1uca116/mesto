import './index.css'
import {Card} from '../components/Card.js'
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {SubmitPopup} from "../components/SubmitPopup.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js"
import * as constants from "../utils/constants.js";


const api = new Api(constants.baseUrl, constants.token, constants.groupId);
let section;

const cardTemplateContent = document.querySelector('#card-template').content;
const userInfo = new UserInfo('.profile__name','.profile__job', '.profile__photo');
api.getUserInfo().then(info => {
    userInfo.setUserInfo({name: info.name, job: info.about, id: info._id});
    userInfo.setUserAvatar(info.avatar);
});

const imagePopUp = new PopupWithImage('.popup_open-picture');


function renderer(data) {
    return new Card(
        data,
        cardTemplateContent,
        imagePopUp.open.bind(imagePopUp),
        (cardId, cardElement) => {
            submitPopup.open(cardId, cardElement);
        },
        (cardId, isLiked) => {
            if(isLiked) {
                return api.dislikeCard(cardId)
            } else {
                return api.likeCard(cardId)
            }

        }
    ).generateCard();
}


api.getInitialCards().then(cards => {
    const sectionData = {items: cards, userId: userInfo.getUserInfo().id, renderer: renderer}
    section = new Section(sectionData, document.querySelector('.places'));
    section.render();
})



function onProfileEditSubmit(values) {
    const name = values['profile-name'];
    const about = values['profile-job']

    return api.editUserInfo(name, about).then( info => {
        userInfo.setUserInfo({name: info.name, job: info.about});
    })

}

function onAddCardSubmit(values) {
    const name = values['card-name'];
    const link = values['card-link'];
    return api.addCard(name, link).then(c => {
        const card = renderer({
            id: c._id,
            link: c.link,
            name: c.name,
            likes: c.likes,
            userId: userInfo.getUserInfo().id,
            canDelete: c.owner._id === userInfo.getUserInfo().id,
        })
        section.addCard(card);
    })

}

function onAvatarUpdate(data) {
    const avatarLink = data['avatar-link']
    return api.updateAvatar(avatarLink).then(info =>{
        userInfo.setUserAvatar(info.avatar)
    });

}

function onSubmitAction(cardId, cardElement) {
    return api.deleteCard(cardId).then(_ => {
        console.log(cardElement)
        cardElement.remove();
    })
}

const profileEditPopup = new PopupWithForm('.popup_profile', onProfileEditSubmit );
const addCardPopup = new PopupWithForm('.popup_add-card', onAddCardSubmit );
const updateAvatarPopup = new PopupWithForm('.popup_update-avatar', onAvatarUpdate);
const submitPopup = new SubmitPopup('.popup_confirmation-type', onSubmitAction);

[imagePopUp, profileEditPopup, addCardPopup, updateAvatarPopup, submitPopup].forEach(popup => {
    popup.setEventListeners();
});

const editButton = document.querySelector('.profile__edit');
editButton.addEventListener('click', () => {
    profileFormValidator.resetErrors();
    const data = userInfo.getUserInfo();
    constants.nameInput.value = data.name;
    constants.jobInput.value = data.job;
    profileEditPopup.open();
});

const addCardButton = document.querySelector('.profile__add-card');
addCardButton.addEventListener('click', () => {
    addCardFormValidator.resetErrors();
    addCardPopup.open();
});

const profileOverlayButton = document.querySelector('.profile__overlay');
profileOverlayButton.addEventListener('click', () => {
    addCardFormValidator.resetErrors();
    updateAvatarPopup.open();
});

const popupProfileForm = document.querySelector('.popup__form_profile');
const profileFormValidator = new FormValidator(popupProfileForm, constants.selectors);
profileFormValidator.enableValidation();

const addCardForm = document.querySelector('.popup__form_add-card');
const addCardFormValidator = new FormValidator(addCardForm, constants.selectors);
addCardFormValidator.enableValidation();

const avatarEditForm = document.querySelector('.popup_update-avatar');
const avatarEditFormValidator = new FormValidator(avatarEditForm, constants.selectors);
avatarEditFormValidator.enableValidation();
