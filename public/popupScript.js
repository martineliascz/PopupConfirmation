function initPopup() {
    const popupWrapper = document.createElement('div')
    popupWrapper.setAttribute('class', 'modal')
    popupWrapper.setAttribute('id', 'popup')
    popupWrapper.addEventListener('click', hidePopup)

    const content = document.createElement('div')
    content.setAttribute('class','modal-content')
    
    const confirmationButton = document.createElement('button')
    confirmationButton.addEventListener('click', handleConfirmation)
    confirmationButton.innerHTML = "confirm"

    const message = document.createElement('div')
    message.innerHTML = "<h2>Please confirm that you read this.</h2>"

    const closeButton = document.createElement('span')
    closeButton.setAttribute('class', 'close')
    closeButton.innerHTML = "&times;"
    closeButton.addEventListener('click', hidePopup)

    content.appendChild(closeButton)
    content.appendChild(message)
    content.appendChild(confirmationButton)
    popupWrapper.appendChild(content)

    document.body.appendChild(popupWrapper)
}

function showPopup() {
    document.querySelector('#popup').style.display = "block"
}

function hidePopup() {
    document.querySelector('#popup').style.display = "none"
}

function handleConfirmation() {
    hidePopup();
    confirmPopup();
}

function isPopupConfirmed() {
    let popupHiddenUntil = window.localStorage.getItem("popup_hidden_until");
    return (popupHiddenUntil && new Date(popupHiddenUntil) > new Date()) ? true : false;
}

function confirmPopup() {
    let tenMinutesLater = new Date(new Date().getTime() + 10 * 60 * 1000);
    window.localStorage.setItem("popup_hidden_until", tenMinutesLater.toISOString());
}

document.addEventListener('DOMContentLoaded', function(){ 
    initPopup()
    if (!isPopupConfirmed()) showPopup();
}, false);