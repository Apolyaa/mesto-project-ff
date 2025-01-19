import {deleteCard, addLike, deleteLike} from './api.js'

export function getCard(card, deleteFuction, likeFuction, openImagePopupFunction, userId){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.likes-count').textContent = card.likes.length;

    if(userId != card.owner._id)
        cardElement.querySelector('.card__delete-button').style.display = 'none';

    cardElement.querySelector('.card__delete-button').addEventListener('click',function(){
        deleteFuction(cardElement, card._id);
    } ); 
    cardElement.querySelector('.card__like-button').addEventListener('click',function(evt) {
        likeFuction(evt, cardElement, card._id);
    }); 
    cardElement.querySelector('.card__image').addEventListener('click',function(){
        openImagePopupFunction(card);
    } ); 
    return cardElement;
}

export function likeFuction(evt, cardElement, cardId){
    evt.target.classList.toggle('card__like-button_is-active');
    if(evt.target.classList.contains('card__like-button_is-active')){
        addLike(cardId)
        .then((result) => {
            cardElement.querySelector('.likes-count').textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
    }
    else{
        deleteLike(cardId)
        .then((result) => {
            cardElement.querySelector('.likes-count').textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
    }
};

export function deleteFuction(cardElement, cardId) {  
    deleteCard(cardId)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    cardElement.remove();
 };