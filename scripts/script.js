// buttons
let editButton = document.querySelector('.profile__btn_type_edit');
let addElementButton = document.querySelector('.profile__btn_type_add');
let closeButtons = document.querySelectorAll('.popup__close-btn');
// profile
let popupProfile = document.querySelector('.popup_open-profile');
let popupForm = document.querySelector('.popup__input');
let inputName = document.querySelector('.popup__field_type_name');
let inputJob = document.querySelector('.popup__field_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
// elements
let popupElement = document.querySelector('.popup_open-element');
let elementForm = document.querySelector('.popup__input_element');
let elementsList = document.querySelector('.elements__list');
let elementTemplate = document.querySelector('#template-element').content;
let inputElementName = document.querySelector('.popup__field_type_place');
let inputElementLink = document.querySelector('.popup__field_type_link');
// image
let popupCaption = document.querySelector('.popup__caption');
let popupImage = document.querySelector('.popup__image');
let popupPlace = document.querySelector('.popup_open-image');

// assign input values of a profile popup 
function assignInputProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openEdit(popupProfile);
}
// save input values
function formHandler(evt) {
  evt.preventDefault();
  let evtTarget = evt.target.closest('.popup');
  let nameValue = inputName.value;
  let jobValue = inputJob.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeEdit(evtTarget);
}
// open popup 
function openEdit(popupType) {
  popupType.classList.add("popup_opened");
}
// close popup window after a click on the button
function closeEdit(popup) {
  popup.classList.remove("popup_opened");
}
// handle all existing "close" buttons
function closeButtonHandler() {
  closeButtons.forEach(function (item) {
    item.addEventListener('click', function(evt) {
      let evtTarget = evt.target.closest('.popup');
      closeEdit(evtTarget);
    });
  });
}
closeButtonHandler();
// add elements from array
function addElements() {
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
  initialCards.forEach(function (item) {
    let elementName = item.name;
    let elementLink = item.link;
    elementsList.prepend(addElement (elementName, elementLink));
  });
}
addElements();
// add new element 
function addElement(elementName, elementLink) {
  let addNewElement = elementTemplate.querySelector('.element').cloneNode(true);
  let elementImage = addNewElement.querySelector('.element__image');
  let elementTitle = addNewElement.querySelector('.element__title');
  let deleteButton = addNewElement.querySelector('.element__delete-btn');
  let likeButton = addNewElement.querySelector('.element__like-btn');
  elementImage.setAttribute('src', elementLink);
  elementImage.setAttribute('alt', elementName);
  elementTitle.textContent = elementName;
  // like button function
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });
  // delete button function
  deleteButton.addEventListener('click', function (evt) {
    let evtTarget = evt.target;
    let elementItem = evtTarget.closest('.element');
    elementItem.remove();
  });
  // open image from element (image popup)
  elementImage.addEventListener('click', function (evt) {
    let evtTarget = evt.target;
    popupImage.setAttribute('src', evtTarget.src);
    popupImage.setAttribute('alt', evtTarget.alt);
    popupCaption.textContent = addNewElement.querySelector('.element__title').textContent;
    openEdit(popupPlace);
  });
  return addNewElement;
}
// submit created element
function submitNewElement(evt) {
  evt.preventDefault();
  let evtTarget = evt.target.closest('.popup');
  if (inputElementName.value && inputElementLink.value) {
    elementsList.prepend(addElement (inputElementName.value, inputElementLink.value));
  closeEdit(evtTarget);
  evt.target.reset();
  };
}
// events
editButton.addEventListener('click', assignInputProfile);
popupForm.addEventListener('submit', formHandler);
elementForm.addEventListener('submit', submitNewElement);
addElementButton.addEventListener('click', function () {
  openEdit(popupElement)
});


