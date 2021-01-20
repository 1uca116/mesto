import {Popup} from './Popup.js';

export class PopupConfirmation extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;

        // this._confirmButton = document.querySelector('.popup_confirmation-type')
    }
    setEventListeners(confirmAction) {
        this._onSubmit();
        super.setEventListeners();
    }

}