export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }
// enabling validation
  enableValidation = () => {
    this._setEventListeners();
}
// add event listeners to submit event
  _setEventListeners = () => {
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
    this.toggleButtonState();
  }
// control button state: if button is active remove 'disabled' attribute and the other way around +
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  }
// + disable button
  _disableButton = () => {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
// enable button
  _enableButton = () => {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }
// show error in case form does not pass validation
  _showError = (input) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.spanErrorClass);
    input.classList.add(this._config.inputErrorClass);
  }
// hide error if form passed validation
  _hideError = (input) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._config.spanErrorClass);
    input.classList.remove(this._config.inputErrorClass);
  }
// check input
  _hasInvalidInput = () => {
    return this._inputsList.some((input) => {
      return !input.validity.valid;
    });
  }
// check validity of input
  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    };
  }
// reset validation
  resetValidation() {
    this._inputsList.forEach((input) => {
      this._hideError(input);
    });
  }
}