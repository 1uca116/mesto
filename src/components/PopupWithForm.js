import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;
        this._form = this._element.querySelector('.popup__form');
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
        const form = this._element.querySelector('.popup__form');
        form.addEventListener('submit', evt => {
            evt.preventDefault();
            const values = this._getInputValues();
            this._onSubmit(values);
            this.close();
        })
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        Array.from(this._form.elements).forEach(element => {
            if (element.classList.contains('form__input')) {
                this._formValues[element.name] = element.value;
            }
        })

        return this._formValues;
    }
}
