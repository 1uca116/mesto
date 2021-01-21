export class Section {
    constructor({items, userId, renderer}, container) {
        this._items = items;
        this._userId = userId;
        this._renderer = renderer;
        this._container = container;
    }

    render() {
        this._items.forEach(item => {
            const element = this._renderer({
                id: item._id,
                link: item.link,
                name: item.name,
                likes: item.likes,
                userId: this._userId,
                canDelete: item.owner._id === this._userId,
            });
            this._container.append(element);
        });
    }

    addCard(element) {
        this._container.prepend(element);
    }
}
