import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(container) {
    super(container);
    this._popupImage = this._container.querySelector('.popup__image');
    this._popupCaption = this._container.querySelector('.popup__caption');
  }
// extend 'open' functionality: assign link as src for the image that being opened & add capture (name)
  open(name, link) {
    this._popupCaption.textContent = name;
    this._popupImage.alt = 'Изображение места - ' + name;
    this._popupImage.src = link;
    super.open();
  }
}