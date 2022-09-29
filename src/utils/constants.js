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
export const buttonEdit = document.querySelector('.profile__btn_type_edit');
export const buttonOpenPopupCard = document.querySelector('.profile__btn_type_add');
export const elementsList = document.querySelector('.elements__list');
export const userAvatarForm = document.querySelector('#avatar');