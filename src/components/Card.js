
export class Card {
    constructor(data, template, onImageClick, onDeleteClick, onLikeClick) {
        this._id = data.id;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this.userId = data.userId;
        this._canDelete = data.canDelete;
        this._template = template;
        this._onImageClick = onImageClick;
        this._onDeleteClick = onDeleteClick;
        this._onLikeClick = onLikeClick;
        this._likedByUser = data.likes.filter(x => x._id === data.userId).length > 0
    }
    generateCard() {
        this._element = this._cloneTemplate();
        this._setEventListeners();
        const cardImage = this._element.querySelector('.card__image');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        const likes = this._element.querySelector('.card__like_counter');
        likes.textContent = this._likes.length;

        if(this._likedByUser) {
            this._element.querySelector('.card__button-like')
                .classList.toggle("card__button-like_active")
        }

        const deleteButton = this._element.querySelector('.card__button-delete')
        if(!this._canDelete){
            deleteButton.remove();
        }

        return this._element;

    }
    _cloneTemplate() {
        return this._template.cloneNode(true);
    }

    _setEventListeners() {
        const counter = this._element.querySelector('.card__like_counter')
        this._element.querySelector('.card__button-like')
            .addEventListener('click',  evt => {
                this._onLikeClick(this._id, this._likedByUser).then(x => {
                    this._likes = x.likes.length;
                    this._likedByUser = !this._likedByUser;
                    counter.textContent = this._likes;
                    evt.target.classList.toggle('card__button-like_active');
                });

            });
        this._element.querySelector('.card__button-delete')
            .addEventListener('click',  evt => {
                this._onDeleteClick(this._id, evt.target.closest('.card'))
            });

        this._element.querySelector('.card__image')
            .addEventListener('click', evt => {
                this._onImageClick(this._link, this._name);
            });
    }
}
