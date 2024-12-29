import '../pages/index.css'; 
import {initialCards} from './cards.js'
import avatarImage from '../images/avatar.jpg'
import {getCard, likeFuction, deleteFuction} from './card.js'
import {openPopup, showImageFunction} from './modal.js'

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = "url('" + avatarImage + "')";

const placesList = document.querySelector('.places__list');

initialCards.forEach(item =>
    placesList.append(getCard(item, deleteFuction, likeFuction, showImageFunction))
);

const profileInfo = document.querySelector('.profile__info');

const editPopup = document.querySelector('.popup_type_edit');
const editProfileButton = profileInfo.querySelector('.profile__edit-button');
editPopup.classList.add('popup_is-animated');
editProfileButton.addEventListener('click',(evt) => openPopup(evt, editPopup));


const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
newCardPopup.classList.add('popup_is-animated');
newCardButton.addEventListener('click',(evt) => openPopup(evt, newCardPopup));

const imagePopup = document.querySelector('.popup_type_image');
imagePopup.classList.add('popup_is-animated');
