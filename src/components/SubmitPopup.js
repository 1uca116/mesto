import {Popup} from "./Popup.js";

export class SubmitPopup extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;
        this._cardId = null;
        this._card = null;
        this._form = this._element.querySelector('.popup__form');
    }

    open(cardId, cardElement){
        this._cardId = cardId;
        this._card = cardElement
        super.open();
    }

    setEventListeners() {
        this._handleSubmitForm()
        super.setEventListeners();
    }

    _handleSubmitForm() {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            console.log(this._card)
            const submitButton = this._element.querySelector('.popup__button-save');
            const initialText = submitButton.textContent
            submitButton.textContent = 'Удаление...';
            this._onSubmit(this._cardId, this._card).then(x => {
                this.close();
                submitButton.textContent = initialText;
            }).catch(e => {
                submitButton.textContent = initialText;
            });

        })
    }


}
