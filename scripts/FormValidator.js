export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
// enabling validation
  enableValidation = () => {
    this._inputsList = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._setEventListeners(this._form, this._config, this._submitButton);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton(this._submitButton, this._config);
    });
    this._setButtonState(this._submitButton, this._form.checkValidity(), this._config);
  }
// add event listeners to submit event
  _setEventListeners = (form, config, button) => {
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, config);
        this._setButtonState(button, form.checkValidity(), config);
      });
    });
  }
// control button state: if button is active remove 'disabled' attribute and the other way around +
  _setButtonState = (button, buttonIsActive, config) => {
    if (buttonIsActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      this._disableButton(button, config);
    };
  }
// + disable button
  _disableButton = (button, config) => {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
// show error in case form does not pass validation
  _showError = (form, input, config) => {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(config.spanErrorClass);
    input.classList.add(config.inputErrorClass);
    
  }
// hide error if form passed validation
  _hideError = (form, input, config) => {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    error.classList.remove(config.spanErrorClass);
    input.classList.remove(config.inputErrorClass);
  }
// check validity of input
  _checkInputValidity = (form, input, config) => {
    if (!input.validity.valid) {
      this._showError(form, input, config);
    } else {
      this._hideError(form, input, config);
    };
  }
}