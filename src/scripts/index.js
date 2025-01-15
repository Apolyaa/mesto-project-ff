import '../pages/index.css'; 
import {initialCards} from './cards.js'
import avatarImage from '../images/avatar.jpg'
import {getCard, likeFuction, deleteFuction} from './card.js'
import {openPopup, closePopup} from './modal.js'
import {enableValidation, toggleButtonState, hideInputError} from './validation.js'

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = "url('" + avatarImage + "')";

const placesList = document.querySelector('.places__list');

initialCards.forEach(item =>
    placesList.append(getCard(item, deleteFuction, likeFuction, openImagePopupFunction))
);

function handleEditFormSubmit(evt, popup) {
    evt.preventDefault(); 
    const inputName = popup.querySelector('.popup__input_type_name'); 
    const inputDescription = popup.querySelector('.popup__input_type_description');
    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__title').textContent = inputName.value;
    profileInfo.querySelector('.profile__description').textContent = inputDescription.value;
    closePopup();
}

function handleAddCardFormSubmit(evt, popup) {
    evt.preventDefault(); 
    const inputName = popup.querySelector('.popup__input_type_card-name'); 
    const inputUrl = popup.querySelector('.popup__input_type_url');
    const newCard = {
        name: inputName.value,
        link: inputUrl.value,
      };
    const placesList = document.querySelector('.places__list');
    placesList.prepend(getCard(newCard, deleteFuction, likeFuction, openImagePopupFunction));
    inputName.value = "";
    inputUrl.value = "";
    closePopup();
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
    clearValidation(form, {clearInputs: false, disableButton: false});
};

function openNewCardPopupFunction(popup){
    openPopup(popup);
    const form = popup.querySelector(elementsClasses.formSelector);
    clearValidation(form, {clearInputs: true, disableButton: true});
};

const clearValidation = (form, validationConfig) => {
    const inputs = Array.from(form.querySelectorAll(elementsClasses.inputSelector));
    const button = form.querySelector(elementsClasses.submitButtonSelector);
    inputs.forEach((item) => {
        hideInputError(form, item, elementsClasses);
        if(validationConfig.clearInputs)
            item.value = "";
    });
    if(validationConfig.disableButton){
        toggleButtonState(inputs, button, elementsClasses);
    };
        
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