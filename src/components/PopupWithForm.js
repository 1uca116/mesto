import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;
    }

    setEventListeners() {
        this._handleSubmitForm();
        super.setEventListeners();
    }

    close() {
        const form = this._element.querySelector('.popup__form');
        this._resetForm(form);
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
            super.close();
        })
    }

    _getInputValues() {
        if (this._element.classList.contains('popup_profile')) {
            return {
                name: this._element.querySelector('.popup__input_el_name').value,
                job: this._element.querySelector('.popup__input_el_job').value
            };
        } else if (this._element.classList.contains('popup_add-card')) {
            return {
                imageLink: this._element.querySelector('.popup__input_el_card-link').value,
                imageTitle: this._element.querySelector('.popup__input_el_card-name').value
            }
        } else {
            return {};
        }
    }
}