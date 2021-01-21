export class Section {
    constructor(renderer, container) {
        this._renderer = renderer;
        this._container = container;
    }

    render(items, userId) {
        items.forEach(item => {
            const element = this._renderer({
                id: item._id,
                link: item.link,
                name: item.name,
                likes: item.likes,
                userId: userId,
                canDelete: item.owner._id === userId,
            });
            this._container.append(element);
        });
    }


    addCard(element) {
        this._container.prepend(element);
    }
}