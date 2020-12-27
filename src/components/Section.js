export class Section {
    constructor({items, renderer}, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    render() {
        this._items.forEach(item => {
            const element = this._renderer(item.link, item.name);
            this._container.append(element);
        });
    }

    addCard(element) {
        this._container.prepend(element);
    }
}