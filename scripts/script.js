let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submit-btn')
let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input-name');
let inputJob = document.querySelector('.popup__input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openEdit() {
  popup.classList.add("popup__opened")
}
function closeEdit() {
  popup.classList.remove("popup__opened")
}
function formHandler(evt) {
  evt.preventDefault();
  let nameValue = inputName.value;
  let jobValue = inputJob.value;
  profileName.firstChild.textContent = nameValue;
  profileJob.textContent = jobValue;
}
editButton.addEventListener("click", openEdit)
closeButton.addEventListener("click", closeEdit);
popupForm.addEventListener('submit', formHandler);
submitButton.addEventListener('click', formHandler);