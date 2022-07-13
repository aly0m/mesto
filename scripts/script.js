let editButton = document.querySelector('.profile__btn_type_edit');
let closeButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submit-btn')
let popupForm = document.querySelector('.popup__input');
let inputName = document.querySelector('.popup__field_type_name');
let inputJob = document.querySelector('.popup__field_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openEdit() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add("popup_opened");
}
function closeEdit() {
  popup.classList.remove("popup_opened");
}
function formHandler(evt) {
  evt.preventDefault();
  let nameValue = inputName.value;
  let jobValue = inputJob.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeEdit();
}
editButton.addEventListener("click", openEdit)
closeButton.addEventListener("click", closeEdit);
popupForm.addEventListener('submit', formHandler);
