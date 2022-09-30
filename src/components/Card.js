export default class Card {
  constructor({ data, handleCardClick, handleRemoveClick, handleLikeClick, userId }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  
  getId() {
    return this._id;
  }

  // generate card
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._likeCount = this._element.querySelector('.element__like-count');
    
    this._data.likes.forEach(like => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('element__like-btn_active');
      }
    });

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = 'Изображение места - ' + this._name;
    this._elementTitle.textContent = this._name;
    this._likeCount.textContent = this._likes;

    return this._element;
  }
// delete card from DOM
  deleteCardHandler() {
    this._element.remove();
    this._element = null;
  }
// control state of like button
  likeCardHandler(amount) {
    this._likeButton.classList.toggle('element__like-btn_active'); 
    this._likeCount.textContent = amount;
  }
// set necessary event listeners
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleRemoveClick);
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}