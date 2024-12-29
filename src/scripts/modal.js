import {getCard, likeFuction, deleteFuction} from './card.js'

export function openPopup(cardElement, popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
    popup.addEventListener('click', closePopupByOverlay);

    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closePopup);

    if (popup.classList.contains('popup_type_edit') || popup.classList.contains('popup_type_new-card')){
        const popupForm = popup.querySelector('.popup__form'); 
        popupForm.addEventListener('submit', handleFormSubmit);
    }

    if (popup.classList.contains('popup_type_edit')){
        const inputName = popup.querySelector('.popup__input_type_name'); 
        const inputDescription = popup.querySelector('.popup__input_type_description');
        const profileInfo = document.querySelector('.profile__info');
        inputName.value = profileInfo.querySelector('.profile__title').textContent;
        inputDescription.value = profileInfo.querySelector('.profile__description').textContent;
    }
    else if (popup.classList.contains('popup_type_image')){
        const image = popup.querySelector('.popup__image');
        const caption = popup.querySelector('.popup__caption');
        image.src = cardElement.querySelector('.card__image').src;
        caption.textContent = cardElement.querySelector('.card__title').textContent;
    }
}

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
    placesList.append(getCard(newCard, deleteFuction, likeFuction, showImageFunction));
    inputName.value = "";
    inputUrl.value = "";
    closePopup();
}

function closePopup(){
    const popup = document.querySelector('.popup_is-opened');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
    popup.removeEventListener('click', closePopupByOverlay);

    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.removeEventListener('click', closePopup);
    
    if (popup.classList.contains('popup_type_edit') || popup.classList.contains('popup_type_new-card')){
        const popupForm = popup.querySelector('.popup__form'); 
        popupForm.removeEventListener('submit', handleFormSubmit);
    }
}

function closePopupByOverlay(evt){
    if (evt.currentTarget === evt.target) {
        closePopup();
    }
}

function closePopupByEsc(evt){
    if(evt.key === "Escape"){        
        closePopup();
    }
} 

export function showImageFunction(cardElement){
    const imagePopup = document.querySelector('.popup_type_image');
    openPopup(cardElement, imagePopup);
};

function handleFormSubmit(evt){
    const popup = document.querySelector('.popup_is-opened');
    if (popup.classList.contains('popup_type_edit'))
        handleEditFormSubmit(evt, popup);
    else if (popup.classList.contains('popup_type_new-card'))
        handleAddCardFormSubmit(evt, popup);
};