export function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
    popup.addEventListener('click', closePopupByOverlay);

    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closePopup);
}

export function closePopup(){
    const popup = document.querySelector('.popup_is-opened');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
    popup.removeEventListener('click', closePopupByOverlay);

    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.removeEventListener('click', closePopup);
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

