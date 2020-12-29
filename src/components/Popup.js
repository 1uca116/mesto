export class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }
    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._element.addEventListener('click', evt => {
            if (evt.target === this._element){
                this.close()
            }
            })
        this._element.querySelector('.popup__button-close')
            .addEventListener('click', this.close.bind(this))
    }
}

