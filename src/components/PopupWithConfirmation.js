import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ handleConfirmClick }, popupSelector) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
    this._confirmButton = this._popup.querySelector('#confirm-btn');
    this._cardInfo = {};
  }

  open(card) {
    super.open();
    return this._cardInfo = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirmClick(this._cardInfo);
    });
  }
}