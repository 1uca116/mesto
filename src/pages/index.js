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

const userInfo = new UserInfo('.profile__name','.profile__job', '.profile__photo');
api.getUserInfo().then(info => {
    userInfo.setUserInfo({name: info.name, job: info.about, id: info._id});
    userInfo.setUserAvatar(info.avatar);
});

const imagePopUp = new PopupWithImage('.popup_open-picture');


function renderer(data) {
    return new Card(
        data,
        constants.cardTemplateContent,
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

const sectionData = {userId: userInfo.getUserInfo().id, renderer: renderer}
const cardSection = new Section(sectionData, document.querySelector('.places'));

api.getInitialCards().then(cards => {
    cardSection.render(cards);
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
        cardSection.addCard(card);
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
const submitPopup = new SubmitPopup('.popup_confirmation', onSubmitAction);

[imagePopUp, profileEditPopup, addCardPopup, updateAvatarPopup, submitPopup].forEach(popup => {
    popup.setEventListeners();
});

constants.editButton.addEventListener('click', () => {
    profileFormValidator.resetErrors();
    const data = userInfo.getUserInfo();
    constants.nameInput.value = data.name;
    constants.jobInput.value = data.job;
    profileEditPopup.open();
});

constants.addCardButton.addEventListener('click', () => {
    addCardFormValidator.resetErrors();
    addCardPopup.open();
});

constants.profileOverlayButton.addEventListener('click', () => {
    addCardFormValidator.resetErrors();
    updateAvatarPopup.open();
});

const profileFormValidator = new FormValidator(constants.popupProfileForm, constants.selectors);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(constants.addCardForm, constants.selectors);
addCardFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(constants.avatarEditForm, constants.selectors);
avatarEditFormValidator.enableValidation();
