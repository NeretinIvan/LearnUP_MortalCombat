
//////////////////Init players////////////////////////

const player1 = {
    playerID: 1,
    name: 'Scorpion',
    hp: 100,
    image: './assets/scorpion.gif',
    weapon: ['knife', 'chain'],
    attack
}

const player2 = {
    playerID: 2,
    name: 'Sonya',
    hp: 100,
    image: './assets/sonya.gif',
    weapon: ['axe', 'sword'],
    attack
}

//////////////////Gameplay logic////////////////////////

function attack() {
    console.log(this.name + ' attacks!');
    target = getOpponent.call(this);
    changeHP.call(target, generateInteger(0, 20));
    renderHP.call(target);
}

function onRandomButtonClick () {
    player1.attack();
    player2.attack();
    if (player1.hp === 0 || player2.hp === 0) {
        const result = getFightResult();
        console.log(result);
        $arena.append(createMessage(result));
        $arena.append(createReloadButton());
        $randomButton.disabled = true;
    }
}

function generateInteger (min, max) {
    return Math.ceil(min + Math.random() * (max - min));
}

function changeHP(damage) {
    if (damage > this.hp) damage = this.hp;
    this.hp -= damage;
    console.log(this.name + " got " + damage + " damage. " + this.hp + " hp left");
}

function renderHP() {
    elHP.call(this).style.width = this.hp + '%';  
}

function elHP() {
    return document.querySelector('.player' + this.playerID + ' .life');
}

function getOpponent() {
    return this.playerID === 1 ? player2 : player1;
}

function getFightResult() {
    if (player1.hp === player2.hp) {
        return 'Draw';
    }
    const winner = player1.hp > player2.hp ? player1.name : player2.name;
    return winner + ' wins!';
}

function restart() {
    window.location.reload();
}

//////////////////Code management functions////////////////////////

function createMessage(message) {
    const $messageLabel = createElement('div', 'loseTitle');
    $messageLabel.innerText = message;
    return $messageLabel;
}

function createElement(tag, elementClass) {
    const $element = document.createElement(tag);
    if (elementClass) $element.classList.add(elementClass);
    return $element;
}

//////////////////Construction functions////////////////////////

function createReloadButton() {
    $reloadWrap = createElement('div', 'reloadWrap');
    $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    $reloadButton.addEventListener('click', restart);

    $reloadWrap.append($reloadButton);
    return $reloadWrap;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.playerID);
    $player.append(createProgressBar(playerObj));
    $player.append(createCharacter(playerObj));
    return $player;
}

function createProgressBar(playerObj) {
    const $progressBar = createElement('div', 'progressbar');
    $progressBar.append(createLife());
    $progressBar.append(createName(playerObj));       
    return $progressBar;
}

function createLife() {
    const $life = createElement('div', 'life');
    $life.style.width = '100%';
    return $life;
}

function createName(playerObj) {
    const $name = createElement('div', 'name');
    $name.innerText = playerObj.name;
    return $name;
}

function createCharacter(playerObj) {
    const $character = createElement('div', 'character');
    $character.append(createImage(playerObj.image));
    return $character;
}

function createImage(image) {
    const $image = createElement('img');
    $image.src = image;
    return $image;
}

//////////////////Init area////////////////////////

const $arena = document.querySelector('.arenas');
$arena.append(createPlayer(player1));
$arena.append(createPlayer(player2));

const $randomButton = document.querySelector('.control .button');
$randomButton.addEventListener('click', onRandomButtonClick);