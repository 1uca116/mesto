import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {

    open(imageLink, imageCaption) {
        const pic = this._element.querySelector('.popup__picture');
        pic.src = imageLink;
        pic.alt = imageCaption;
        this._element.querySelector('.popup__description').textContent = imageCaption;
        super.open();
    }
}