export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__field-error_line',
  spanErrorClass: 'form__field-error'
};


export const profileForm = document.querySelector('#profile');
export const placeForm = document.querySelector('#place');
export const inputName = document.querySelector('.popup__field_type_name');
export const inputJob = document.querySelector('.popup__field_type_job');
export const buttonOpenEditProfileForm = document.querySelector('.profile__btn_type_edit');
export const buttonOpenPopupCard = document.querySelector('.profile__btn_type_add');
export const elementsList = document.querySelector('.elements__list');
export const buttonOpenEditProfileAvatar = document.querySelector('.profile__overlay');
export const userAvatarForm = document.querySelector('#avatar');
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const profileAvatarSelector = '.profile__image';
export const popupProfileSelector = '.popup_open-profile';
export const popupCardSelector = '.popup_open-element'
export const popupCardImageSelector = '.popup_open-image';
export const popupAvatarSelector = '.popup_open-avatar';
export const popupConfirmSelector = '.popup_open-confirm';
export const cardTemplateSelector = '.place-template';
export const activeLikeButtonSelector = 'element__like-btn_active';