export class FormValidator {

    constructor(form, selectors) {
        this._form = form;
        this._selectors = selectors;
    }
    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };
    _hideInputError (inputElement){
        const errorElement =  this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._selectors.inactiveButtonClass);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove(this._selectors.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };
    _setEventListeners () {
        const inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        const buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };
    resetErrors() {
        const inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        const buttonElement = this._form.querySelector(this._selectors.submitButtonSelector);
        inputList.forEach(input => this._hideInputError(input));
        this._toggleButtonState(inputList, buttonElement);
    }
}


