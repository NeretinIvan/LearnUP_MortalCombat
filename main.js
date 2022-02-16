//////////////////Global variables////////////////////////

let turn = 1;

//////////////////Constants////////////////////////

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

function onControlFormSubmit (e) {
    e.preventDefault();

    console.log('----------TURN ' + turn + '----------');
    turn++;

    const ourAttackResult = ourAttack();
    const enemyAttackResult = enemyAttack();
    tryAttack.call(player1, ourAttackResult, enemyAttackResult);
    tryAttack.call(player2, enemyAttackResult, ourAttackResult);

    for (let item of $controlForm) {
        item.checked = false;
    }

    checkGameOver();
}

function ourAttack() {
    const ourAttackResult = {};

    for (let item of $controlForm) {
        if (item.checked && item.name === 'hit') {
            ourAttackResult.hit = item.value;
            ourAttackResult.value = generateInteger(1, HIT[item.value]);
        }
        if (item.checked && item.name === 'defence') {
            ourAttackResult.defence = item.value;
        }
    }

    return ourAttackResult;
}

function enemyAttack() {
    const hit = ATTACK[generateInteger(0, 2)];
    const defence = ATTACK[generateInteger(0, 2)];
    return {
        value: generateInteger(1, HIT[hit]),
        hit,
        defence
    }
}

function tryAttack(myAttack, opponentAttack) {
    console.log(this.name + ' attacks!');

    if (myAttack.hit != opponentAttack.defence) {
        this.attack(myAttack);
    }
    else {
        console.log(getOpponent.call(this).name + ' blocked attack on ' + myAttack.hit + '!');
    }
}

function attack(attackStats) {
    target = getOpponent.call(this);
    changeHP.call(target, attackStats.value);
    renderHP.call(target);
}

function getOpponent() {
    return this.playerID === 1 ? player2 : player1;
}

function generateInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function checkGameOver() {
    if (player1.hp === 0 || player2.hp === 0) {
        const result = getFightResult();
        console.log(result);
        $arena.append(createMessage(result));
        $arena.append(createReloadButton());
        for (let item of $controlForm) {
            item.disabled = true;
        }
    }
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

/* Вопрос
Стоит ли мне оставить создание игрока в виде множества разбитых функций для удобства чтения кода и
гибкости архитектуры, или все-же собрать в одну функцию для компактности кода?
*/

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

const $controlForm = document.querySelector('.control');
$controlForm.addEventListener('submit', onControlFormSubmit);
