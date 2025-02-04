import '../pages/index.css'; 
import {getCard, likeFuction, deleteFuction} from './card.js'
import {openPopup, closePopup} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {getProfile, getInitialCards, updateProfile, addCard, updateAvatar} from './api.js'

const setProfileTitle = (name) => {
    const profileTitle = document.querySelector('.profile__title');
    profileTitle.textContent = name;
};
const setProfileDescription = (about) => {
    const profileDescription = document.querySelector('.profile__description');
    profileDescription.textContent = about;
};
const setProfileImage = (avatar) => {
    const profileImage = document.querySelector('.profile__image');
    profileImage.style.backgroundImage = "url('" + avatar + "')";
};
const setProfileInformation = (profileInformation) => {
    setProfileTitle(profileInformation.name);
    setProfileDescription(profileInformation.about);
    setProfileImage(profileInformation.avatar);
};

Promise.all([getProfile(), getInitialCards()])
  .then(([profileInformation, initialCards]) => {
    setProfileInformation(profileInformation);
    const placesList = document.querySelector('.places__list'); ``
    initialCards.forEach(item =>
        placesList.append(getCard(item, deleteFuction, likeFuction, openImagePopupFunction, 
            profileInformation._id))
    );
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

function saveChanges(popup){
    const saveButton = popup.querySelector('.popup__button');
    saveButton.innerText = 'Сохранение...';
}

function setDefaultCondition(popup){
    const saveButton = popup.querySelector('.popup__button');
    saveButton.innerText = 'Сохранить';
}

function handleEditFormSubmit(evt, popup) {
    evt.preventDefault(); 
    saveChanges(popup);
    const inputName = popup.querySelector('.popup__input_type_name'); 
    const inputDescription = popup.querySelector('.popup__input_type_description');
    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__title').textContent = inputName.value;
    profileInfo.querySelector('.profile__description').textContent = inputDescription.value;
    updateProfile(inputName.value, inputDescription.value)
    .then((result) => {
        console.log(result);
        closePopup();
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
    .finally(() => {
        setDefaultCondition(popup);
    });
}

function handleAddCardFormSubmit(evt, popup) {
    evt.preventDefault(); 
    saveChanges(popup);
    const inputName = popup.querySelector('.popup__input_type_card-name'); 
    const inputUrl = popup.querySelector('.popup__input_type_url');
      addCard(inputName.value, inputUrl.value)
      .then((result) => {
        const placesList = document.querySelector('.places__list');
        placesList.prepend(getCard(result, deleteFuction, likeFuction, openImagePopupFunction, result.owner._id));
        inputName.value = "";
        inputUrl.value = "";
        closePopup();
      })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
}

function handleUpdateAvatarFormSubmit(evt, popup) {
    evt.preventDefault(); 
    saveChanges(popup);
    const inputUrl = popup.querySelector('.popup__input_type_url');
    updateAvatar(inputUrl.value)
      .then((result) => {
        setProfileImage(result.avatar);
        inputUrl.value = "";
        closePopup();
      })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
}

function openImagePopupFunction(card){
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');
    image.src = card.link;
    caption.textContent = card.name;
    openPopup(imagePopup);
};

function openEditPopupFunction(popup){
    const inputName = popup.querySelector('.popup__input_type_name'); 
    const inputDescription = popup.querySelector('.popup__input_type_description');
    const profileInfo = document.querySelector('.profile__info');
    inputName.value = profileInfo.querySelector('.profile__title').textContent;
    inputDescription.value = profileInfo.querySelector('.profile__description').textContent;
    openPopup(popup);
    const form = popup.querySelector(elementsClasses.formSelector);
    clearValidation(form, {clearInputs: false, disableButton: false}, elementsClasses);
};

function openNewCardPopupFunction(popup){
    openPopup(popup);
    const form = popup.querySelector(elementsClasses.formSelector);
    clearValidation(form, {clearInputs: true, disableButton: true}, elementsClasses);
};

function openUpdateAvatarPopupFunction(popup){
    openPopup(popup);
    const form = popup.querySelector(elementsClasses.formSelector);
    clearValidation(form, {clearInputs: true, disableButton: true}, elementsClasses);
};

const profileInfo = document.querySelector('.profile__info');

const editPopup = document.querySelector('.popup_type_edit');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form'); 
editPopup.classList.add('popup_is-animated');
editProfileButton.addEventListener('click',() => openEditPopupFunction(editPopup));
editForm.addEventListener('submit', function(evt){
    handleEditFormSubmit(evt, editPopup);
});

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardForm = newCardPopup.querySelector('.popup__form'); 
newCardPopup.classList.add('popup_is-animated');
newCardButton.addEventListener('click',() => openNewCardPopupFunction(newCardPopup));
newCardForm.addEventListener('submit', function(evt){
    handleAddCardFormSubmit(evt, newCardPopup);
});

const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const updateAvatarButton = document.querySelector('.profile__image');
const updateAvatarForm = updateAvatarPopup.querySelector('.popup__form'); 
updateAvatarPopup.classList.add('popup_is-animated');
updateAvatarButton.addEventListener('click',() => openUpdateAvatarPopupFunction(updateAvatarPopup));
updateAvatarForm.addEventListener('submit', function(evt){
    handleUpdateAvatarFormSubmit(evt, updateAvatarPopup);
});

const imagePopup = document.querySelector('.popup_type_image');
imagePopup.classList.add('popup_is-animated');

const elementsClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
 // включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(elementsClasses);