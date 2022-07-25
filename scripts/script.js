import {initialCards} from "./data.js"
// buttons
const buttonEdit = document.querySelector('.profile__btn_type_edit');
const buttonOpenPopupCard = document.querySelector('.profile__btn_type_add');
const buttonClose = document.querySelectorAll('.popup__close-btn');
// profile
const popupProfile = document.querySelector('.popup_open-profile');
const formPopup = document.querySelector('.popup__input');
const inputName = document.querySelector('.popup__field_type_name');
const inputJob = document.querySelector('.popup__field_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// elements
const popupElement = document.querySelector('.popup_open-element');
const formElement = document.querySelector('.popup__input_element');
const listOfElements = document.querySelector('.elements__list');
const templateElement = document.querySelector('#template-element').content;
const inputElementName = document.querySelector('.popup__field_type_place');
const inputElementLink = document.querySelector('.popup__field_type_link');
// image
const captionPopup = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup__image');
const placePopup = document.querySelector('.popup_open-image');

// assign input values of a profile popup 
function assignInputProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openEdit(popupProfile);
}
// save input values
function saveInputValues(evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  const nameValue = inputName.value;
  const jobValue = inputJob.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeEdit(evtTarget);
}
// open popup 
function openEdit(popupType) {
  popupType.classList.add("popup_opened");
}
// close popup
function closeEdit(popup) {
  popup.classList.remove("popup_opened");
}
// handle all existing "close" buttons
function closeButtonHandler() {
  buttonClose.forEach(function (item) {
    item.addEventListener('click', function(evt) {
      const evtTarget = evt.target.closest('.popup');
      closeEdit(evtTarget);
    });
  });
}
closeButtonHandler();
// add elements from array
function addElements() {
  initialCards.forEach(function (item) {
    const elementName = item.name;
    const elementLink = item.link;
    listOfElements.prepend(addElement (elementName, elementLink));
  });
}
addElements();
// add new element 
function addElement(elementName, elementLink) {
  const addNewElement = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = addNewElement.querySelector('.element__image');
  const elementTitle = addNewElement.querySelector('.element__title');
  const deleteButton = addNewElement.querySelector('.element__delete-btn');
  const likeButton = addNewElement.querySelector('.element__like-btn');
  elementImage.src = elementLink;
  elementImage.alt = elementName;
  elementTitle.textContent = elementName;
  // like button function
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });
  // delete button function
  deleteButton.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    const elementItem = evtTarget.closest('.element');
    elementItem.remove();
  });
  // open image from element (image popup)
  elementImage.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    imagePopup.setAttribute('src', evtTarget.src);
    imagePopup.setAttribute('alt', evtTarget.alt);
    captionPopup.textContent = addNewElement.querySelector('.element__title').textContent;
    openEdit(placePopup);
  });
  return addNewElement;
}
// submit created element
function submitNewElement(evt) {
  evt.preventDefault();
  const evtTarget = evt.target.closest('.popup');
  if (inputElementName.value && inputElementLink.value) {
    listOfElements.prepend(addElement (inputElementName.value, inputElementLink.value));
  closeEdit(evtTarget);
  evt.target.reset();
  };
}
// events
buttonEdit.addEventListener('click', assignInputProfile);
formPopup.addEventListener('submit', saveInputValues);
formElement.addEventListener('submit', submitNewElement);
buttonOpenPopupCard.addEventListener('click', function () {
  openEdit(popupElement)
});


