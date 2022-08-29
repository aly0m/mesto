import Card from './Card.js';
import FormValidator from './FormValidator.js';
// array of initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// config for validation
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__field-error_line',
  spanErrorClass: 'form__field-error'
};
//
const popupsList = Array.from(document.querySelectorAll('.popup'));
const escKey = 'Escape';
const buttonEdit = document.querySelector('.profile__btn_type_edit');
const buttonOpenPopupCard = document.querySelector('.profile__btn_type_add');
const popupProfile = document.querySelector('.popup_open-profile');
const formEditProfile = document.querySelector('.popup__form_profile');
const inputName = document.querySelector('.popup__field_type_name');
const inputJob = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupElement = document.querySelector('.popup_open-element');
const formNewElement = document.querySelector('.popup__form_element');
const elementsList = document.querySelector('.elements__list');
const inputElementName = document.querySelector('.popup__field_type_place');
const inputElementLink = document.querySelector('.popup__field_type_link');
const captionPopup = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup__image');
const placePopup = document.querySelector('.popup_open-image');
// open popup 
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscKey);
}
// close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscKey);
}
// close popup esc 
function closePopupByEscKey(evt) {
  if (evt.key === escKey) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
// finding opened popup and closing it by clicking on overlay
popupsList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});
// create new card
function createElement(data) {
  const card = new Card(data, '.place-template');
  const cardElement = card.generateCard();
  return cardElement;
}
// add created card to the page
function addCreatedElement(container, cardElement) {
  container.prepend(cardElement);
}
// create + add cards from array
initialCards.forEach((item) => {
  addCreatedElement(elementsList, createElement(item));
});
// open card image fullscreen mode
export function openImagePopup(name, link) {
  imagePopup.src = link;
  imagePopup.alt = 'Изображение места - ' + name;
  captionPopup.textContent = name;
  openPopup(placePopup);
}

// submit data of editing profile form
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
});
// submit creation of a new card
formNewElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputElementName.value;
  newCard.link = inputElementLink.value;
  //
  addCreatedElement(elementsList, createElement(newCard));
  closePopup(popupElement);
  evt.target.reset();
});
//edit button listener
buttonEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
});
//add button listener
buttonOpenPopupCard.addEventListener('click', () => {
  openPopup(popupElement);
});

// validation of profile edit form
const profileFormValidation = new FormValidator(config, formEditProfile);
profileFormValidation.enableValidation();
// validation of creating new card 
const addCardFormValidation = new FormValidator(config, formNewElement);
addCardFormValidation.enableValidation();

/*
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');
    //
    formValidators[formName] = validator;
  validator.enableValidation();
  });
};
//
enableValidation(config);
//
formValidators['profile-form'].resetValidation();
formValidators['card-form'].resetValidation();
*/





