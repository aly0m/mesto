export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation = () => {
    this._setEventListeners();
 }

  _setEventListeners = () => {
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
    this.toggleButtonState();
  }

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  }

  _disableButton = () => {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton = () => {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _showError = (input) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.spanErrorClass);
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError = (input) => {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._config.spanErrorClass);
    input.classList.remove(this._config.inputErrorClass);
  }

  _hasInvalidInput = () => {
    return this._inputsList.some((input) => {
      return !input.validity.valid;
    });
  }

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    };
  }

  resetValidation() {
    this._inputsList.forEach((input) => {
      this._hideError(input);
    });
  }
}