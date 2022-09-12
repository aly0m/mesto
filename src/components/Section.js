export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
// apply callback function to each element
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
// add elements to the page
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}