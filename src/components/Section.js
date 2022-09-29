export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.append(element);
  }

  setItemUp(element) {
    this._container.prepend(element);
  }
}