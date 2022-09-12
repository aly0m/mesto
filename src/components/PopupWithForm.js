import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__field');
  }
// collecting data from inputs into object
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  // submit form
  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    this.close();
  }
// extend 'setEventListeners' functionality: add event listener for submit event
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm);
  }
// extend 'close' functionality: reset form on 'close'
  close() {
    super.close();
    this._formElement.reset();
  }
}