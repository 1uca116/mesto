






function saveInfo() {
    let name = document.getElementsByClassName('popup__type-name')[0].value;
    let about = document.getElementsByClassName('popup__type-job')[0].value;
    console.log(document.getElementsByClassName('profile__name')[0].innerHTML);
    document.getElementsByClassName('profile__name')[0].innerHTML = name;
    document.getElementsByClassName('profile__job')[0].textContent = about;
    changePopUpVisibility();
}

function changePopUpVisibility() {
    let popUp = document.getElementsByClassName('popup')[0];
    if(popUp.classList.contains('popup_opened')) {
        popUp.classList.remove('popup_opened');
    } else {
        popUp.classList.add('popup_opened');
    }
}


