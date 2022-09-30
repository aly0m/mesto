import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputsList = this._formElement.querySelectorAll('.popup__field');
    this._formButton = this._popup.querySelector('.popup__submit-btn');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  
  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  handleLoading(isLoading) {
    if (isLoading) {
      this._formButton.textContent = 'Сохранение...';
    } else {
      this._formButton.textContent = 'Сохранить';
    }
  }
}