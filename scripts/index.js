const placesList = document.querySelector('.places__list');
const deleteFuction = function(){
    const listItem = this.closest('.card');
    listItem.remove();
};

function getCard(card, deleteFuction){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFuction); 
    return cardElement;
}


initialCards.forEach(item =>
    placesList.append(getCard(item, deleteFuction))
);