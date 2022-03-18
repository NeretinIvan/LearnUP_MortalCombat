export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    $reloadButton.addEventListener('click', () => {window.location.pathname = './index.html';});

    $reloadWrap.append($reloadButton);
    return $reloadWrap;
}

export const createElement = (tag, elementClass) => {
    const $element = document.createElement(tag);
    if (elementClass) $element.classList.add(elementClass);
    return $element;
}

export const createWinMessageElement = (message) => {
    const $messageLabel = createElement('div', 'loseTitle');
    $messageLabel.innerText = message;
    return $messageLabel;
}

export default {createElement, createReloadButton, createWinMessageElement};