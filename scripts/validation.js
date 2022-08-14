const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__field-error_line',
  spanErrorClass: 'form__field-error'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.spanErrorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.spanErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState(inputList, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, config);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, config) {
  const buttonList = Array.from(document.querySelectorAll(config.submitButtonSelector));
  buttonList.forEach((buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = "disabled";
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(config); 