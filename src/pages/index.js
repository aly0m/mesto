import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  config,
  popupProfile,
  popupElement,
  popupPlace,
  elementsList,
  profileName,
  profileJob,
  profileForm,
  placeForm,
  buttonEdit,
  buttonOpenPopupCard,
  inputName,
  inputJob
} from '../utils/constants.js';

//create object of class Section (generate and add initial cards)
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item).generateCard();
    cardsList.addItem(cardElement);
  },
},
  elementsList
);

// create object of class PopupWithImage
const popupImage = new PopupWithImage(popupPlace);

// create object of class Card
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  }, '.place-template');
  return card;
}

// create object of class PopupWithForm
const formCard = new PopupWithForm({
  container: popupElement,
  submitForm: (data) => {
    data['name'] = data['field-place'];
    data['link'] = data['field-link'];
    const cardElement = createCard(data).generateCard();
    cardsList.addItem(cardElement);
  }
});

const userInfo = new UserInfo({
  nameContainer: profileName,
  jobContainer: profileJob
});

const formProfile = new PopupWithForm({
  container: popupProfile,
  submitForm: (data) => {
    userInfo.setUserInfo(data);
  }
});
// rendering cards
cardsList.renderItems();

// validation for profile form
const validatorProfile = new FormValidator(config, profileForm);
validatorProfile.enableValidation();
// validation for card creation form
const validatorPlace = new FormValidator(config, placeForm);
validatorPlace.enableValidation();

// event listeners for forms, popup image, edit button, add button
popupImage.setEventListeners();
formProfile.setEventListeners();
formCard.setEventListeners();
buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  formProfile.open();
});
buttonOpenPopupCard.addEventListener('click', () => {
  formCard.open();
});
