cy.hidePopupDelay = minutes => {
    window.localStorage.setItem("popup_hidden_until",
    new Date(new Date().getTime() + minutes * 60 * 1000)
    .toISOString());
}