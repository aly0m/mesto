export default class Popup {
  constructor(container) {
    this._container = container;
  }
// opening popup
  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
// closing popup
  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
// closing popup by pressing esc key
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close(this._container);
    }
  }
// closing popup by clicking on 'close' button or by clicking on overlay
  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      this.close(this._container);
    }
  }
// set event listener for click event
  setEventListeners() {
    this._container.addEventListener('click', this._handleClickClose);
  }
}