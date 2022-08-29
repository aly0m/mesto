import { openImagePopup } from './script.js';

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }
// get template from DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  // generate card
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = 'Изображение места - ' + this._name;
    this._elementTitle.textContent = this._name;
    return this._element;
  }
// delete card from DOM
  _deleteCardHandler = () => {
    this._element.remove();
  }
// control state of like button
  _likeCardHandler = () => {
    this._likeButton.classList.toggle('element__like-btn_active'); 
  }
//
  _handleCardClick() {
    imageCard.src = this._link;
    imageCard.alt = 'Изображение места - ' + this._name;
    imageCaption.textContent = this._name;

  }
// set necessary event listeners
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likeCardHandler);
    this._deleteButton.addEventListener('click', this._deleteCardHandler);
    this._elementImage.addEventListener('click', () => {
      openImagePopup(this._name, this._link);
    });
  }
}