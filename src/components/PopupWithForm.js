import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;
        this._form = this._element.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button-save');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    setEventListeners() {
        this._handleSubmitForm();
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _handleSubmitForm() {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            const values = this._getInputValues();
            const initialText = this._submitButton.textContent
            this._submitButton.textContent = 'Сохранение...'
            this._onSubmit(values).then(x => {
                this.close();
                this._submitButton.textContent = initialText;
            }).catch(e => {
                this._submitButton.textContent = initialText;
            });
        })
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
}
