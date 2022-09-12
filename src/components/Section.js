export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = container;
  }
// apply callback function to each element
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
// add elements to the page
  addItem(element) {
    this._container.prepend(element);
  }
}