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


    _resetForm(form) {
        this._removeErrors(form);
        form.reset();
    }

    _removeErrors(form) {
        form.querySelectorAll('.popup__error')
            .forEach(x => {
                x.classList.remove('popup__error_visible');
            });
        form.querySelectorAll('.popup__input')
            .forEach(x => {
                x.classList.remove('popup__input_error');
            });
        const button = form.querySelector('.popup__button-save');
        if (button.attributes.getNamedItem('disabled') === null) {
            button.classList.add('.popup__button-save_disabled');
            button.setAttribute('disabled', 'disabled');
        }
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
        this._inputList = this._popupElement.querySelectorAll('.popup__input');

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
