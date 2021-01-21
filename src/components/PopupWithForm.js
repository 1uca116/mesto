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
            const submitButton = this._element.querySelector('.popup__button-save');
            const initialText = submitButton.textContent
            submitButton.textContent = 'Сохранение...'
            this._onSubmit(values).then(x => {
                this.close();
                submitButton.textContent = initialText;
            }).catch(e => {
                submitButton.textContent = initialText;
            });
        })
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
}
