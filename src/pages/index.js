import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  config,
  profileForm,
  placeForm,
  buttonEdit,
  buttonOpenPopupCard,
  inputName,
  inputJob,
  elementsList
} from '../utils/constants.js';

const userId = {};

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '0e40e2e7-5447-4a46-9984-9767d820a435',
    'Content-Type': 'application/json'
  }
});

api.getInititalCards()
  .then((res) => {
    cardsList.renderItems(res)
  })
  .catch(err => console.log(`Error: ${err}`));

api.getUserInfo()
  .then((res) => {
    userId.id = res._id
    userInfo.setUserInfo(res)
  })
  .catch(err => console.log(`Error: ${err}`));

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.setItem(cardElement);
  },
},
  elementsList
);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__image'
});

const formProfile = new PopupWithForm({
  submitForm: (data) => {
    formProfile.handleLoading(true)
    api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formProfile.handleLoading(false))
  }
}, 
  '.popup_open-profile'
);

const formCard = new PopupWithForm({
  submitForm: (data) => {
    formCard.handleLoading(true)
    api.addCard(data)
      .then((res) => {
        const cardElement = createCard(res);
        cardsList.setItemUp(cardElement);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formCard.handleLoading(false))
  }
}, 
  '.popup_open-element'
);

const formAvatar = new PopupWithForm({
  submitForm: (data) => {
    formProfile.handleLoading(true)
    api.editUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formProfile.handleLoading(false))
  }
}, 
  '.popup_open-avatar'
);

const popupImage = new PopupWithImage('.popup_open-image');

const popupConfirm = new PopupWithConfirmation({
  handleConfirmClick: (card) => {
    removeCard(card)
  }
}, '.popup_open-confirm');

function removeCard(card) {
  api.deleteCard(card.getId())
    .then(() =>{
      card.deleteCardHandler()
    })
    .catch(err => console.log(`${err}`))
    .finally(popupConfirm.close())
};

function addLike(card) {
  api.addLike(card.getId())
    .then((res) => {
      card.likeCardHandler(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`))
};

function removeLike(card) {
  api.removeLike(card.getId())
    .then((res) => {
      card.likeCardHandler(res.likes.length)
    })
    .catch(err => console.log(`Error: ${err}`))
};

// create object of class Card
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleRemoveClick: () => {
      popupConfirm.open(card);
    },
    handleLikeClick: (evt) => {
      if (!evt.target.classList.contains('element__like-btn_active')) {
        addLike(card);
      } else {
        removeLike(card);
      }
    },
    userId: userId.id
  }, '.place-template');
  return card.generateCard();
}

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
formAvatar.setEventListeners();
popupConfirm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  formProfile.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
  validatorProfile.resetValidation();
});
buttonOpenPopupCard.addEventListener('click', () => {
  formCard.open();
  validatorPlace.resetValidation();
  validatorPlace.toggleButtonState();
});
document.querySelector('.profile__overlay').addEventListener('click', () => {
  formAvatar.open();
});
