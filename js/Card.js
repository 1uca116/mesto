export class Card {
    constructor(name, link, template, onImageClick) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._onImageClick = onImageClick;
    }
    generateCard() {
        this._element = this._cloneTemplate();
        this._setEventListeners();
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;

    }
    _cloneTemplate() {
        return this._template.cloneNode(true);
    }

    _setEventListeners() {
        this._element.querySelector('.card__button-like')
            .addEventListener('click',  evt => {
                evt.target.classList.toggle('card__button-like_active');
            });
        this._element.querySelector('.card__button-delete')
            .addEventListener('click',  evt => {
                evt.target.closest('.card').remove();
            });

        this._element.querySelector('.card__image')
            .addEventListener('click', evt => {
                this._onImageClick(this._link, this._name);
            });
    }
}










