import { createElement } from './elementCreation.js';

export const createPlayer = (playerObj) => {
    const $player = createElement('div', 'player' + playerObj.playerID);
    $player.append(createProgressBar(playerObj));
    $player.append(createCharacter(playerObj));
    return $player;
}

const createProgressBar = (playerObj) => {
    const $progressBar = createElement('div', 'progressbar');
    $progressBar.append(createLife());
    $progressBar.append(createName(playerObj));       
    return $progressBar;
}

const createLife = () => {
    const $life = createElement('div', 'life');
    $life.style.width = '100%';
    return $life;
}

const createName = (playerObj) => {
    const $name = createElement('div', 'name');
    $name.innerText = playerObj.name;
    return $name;
}

const createCharacter = (playerObj) => {
    const $character = createElement('div', 'character');
    $character.append(createImage(playerObj.image));
    return $character;
}

const createImage = (image) => {
    const $image = createElement('img');
    $image.src = image;
    return $image;
}

export default createPlayer;