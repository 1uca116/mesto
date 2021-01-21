import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._pic = this._element.querySelector('.popup__picture');
        this._description = this._element.querySelector('.popup__description')
    }

    open(imageLink, imageCaption) {
        this._pic.src = imageLink;
        this._pic.alt = imageCaption;
        this._description.textContent = imageCaption;
        super.open();
    }
}