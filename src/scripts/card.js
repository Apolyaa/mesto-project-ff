export function getCard(card, deleteFuction, likeFuction, openImagePopupFunction){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click',function(){
        deleteFuction(cardElement);
    } ); 
    cardElement.querySelector('.card__like-button').addEventListener('click',function(evt) {
        likeFuction(evt);
    }); 
    cardElement.querySelector('.card__image').addEventListener('click',function(){
        openImagePopupFunction(card);
    } ); 
    return cardElement;
}

export function likeFuction(evt){
    evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteFuction(cardElement) {  
    cardElement.remove();
 };