import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ container, submitForm }) {
    super(container);
    this._submitForm = submitForm;
    this._formSelector = this._container.querySelector('.popup__form');
  }
// collecting data from inputs into object
  _getInputValues() {
    this._formValues = {};
    this._inputList = this._formSelector.querySelectorAll('.popup__field');
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  // submit form
  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
    this.close(this._container);
  }
// extend 'setEventListeners' functionality: add event listener for submit event
  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', this._handleSubmitForm);
  }
// extend 'close' functionality: reset form on 'close'
  close() {
    super.close();
    this._formSelector.reset();
  }
}