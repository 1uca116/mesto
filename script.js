function saveInfo() {
    let name = document.getElementsByClassName('popup__type-name')[0].value;
    let about = document.getElementsByClassName('popup__type-job')[0].value;
    document.getElementsByClassName('profile__name')[0].innerHTML = name;
    document.getElementsByClassName('profile__job')[0].textContent = about;
    closePopUp();
}

function showPopUp() {
    let popUp = document.getElementsByClassName('popup')[0];
    if(!popUp.classList.contains('popup_opened')) {
        popUp.classList.add('popup_opened');
    }
}

function closePopUp() {
    let popUp = document.getElementsByClassName('popup')[0];
    if(popUp.classList.contains('popup_opened')) {
        popUp.classList.remove('popup_opened');
    }
    clearInputs();
}

function clearInputs() {
    document.getElementsByClassName('popup__type-name')[0].value = '';
    document.getElementsByClassName('popup__type-job')[0].value = '';
}