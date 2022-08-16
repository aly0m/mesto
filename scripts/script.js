import {initialCards} from "./data.js"
const popupsList = Array.from(document.querySelectorAll('.popup'));
const escKey = 'Escape';
// buttons
const buttonEdit = document.querySelector('.profile__btn_type_edit');
const buttonOpenPopupCard = document.querySelector('.profile__btn_type_add');
const buttonClose = document.querySelectorAll('.popup__close-btn');
const buttonSubmit = document.querySelector('.popup__submit-btn-place');
// profile
const popupProfile = document.querySelector('.popup_open-profile');
const formEditProfile = document.querySelector('.popup__form_profile');
const inputName = document.querySelector('.popup__field_type_name');
const inputJob = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// elements
const popupElement = document.querySelector('.popup_open-element');
const formNewElement = document.querySelector('.popup__form_element');
const elementsList = document.querySelector('.elements__list');
const templateElement = document.querySelector('#template-element').content;
const inputElementName = document.querySelector('.popup__field_type_place');
const inputElementLink = document.querySelector('.popup__field_type_link');
// image
const captionPopup = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup__image');
const placePopup = document.querySelector('.popup_open-image');

// assign input values of a profile popup 
function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupProfile);
}
// save input values
function saveInputValues(evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  const nameValue = inputName.value;
  const jobValue = inputJob.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(evtTarget);
}
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
// add elements from array
function addElements() {
  initialCards.forEach(function (item) {
    const elementName = item.name;
    const elementLink = item.link;
    elementsList.prepend(createElement (elementName, elementLink));
  });
}
addElements();
// create new element 
function createElement(elementName, elementLink) {
  const newElement = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');
  const deleteButton = newElement.querySelector('.element__delete-btn');
  const likeButton = newElement.querySelector('.element__like-btn');
  elementImage.src = elementLink;
  elementImage.alt = elementName;
  elementTitle.textContent = elementName;
  // like button function
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });
  // delete button function
  deleteButton.addEventListener('click', function (evt) {
    newElement.remove();
  });
  // open image from element (image popup)
  elementImage.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    imagePopup.setAttribute('src', evtTarget.src);
    imagePopup.setAttribute('alt', evtTarget.alt);
    captionPopup.textContent = newElement.querySelector('.element__title').textContent;
    openPopup(placePopup);
  });
  return newElement;
}
// submit created element
function submitNewElement(evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  elementsList.prepend(createElement (inputElementName.value, inputElementLink.value));
  closePopup(evtTarget);
  evt.target.reset();
  buttonSubmit.classList.add('popup__submit-btn_inactive');
  buttonSubmit.disabled = 'disabled';
}
// events
buttonEdit.addEventListener('click', openProfilePopup);
formEditProfile.addEventListener('submit', saveInputValues);
formNewElement.addEventListener('submit', submitNewElement);
buttonOpenPopupCard.addEventListener('click', function () {
  openPopup(popupElement)
});
popupsList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

