export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
// opening popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
// closing popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
// closing popup by pressing esc key
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
// closing popup by clicking on 'close' button or by clicking on overlay
  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }
// set event listener for click event
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
  }
}