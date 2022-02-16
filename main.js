
//////////////////Init players////////////////////////

const player1 = {
    playerID: 1,
    name: 'Scorpion',
    hp: 100,
    image: './assets/scorpion.gif',
    weapon: ['knife', 'chain'],
    Attack: function(target) {
        console.log(this.name + ' attacks!');
        ChangeHP(target, GenerateInteger(0, 20));
    }
}

const player2 = {
    playerID: 2,
    name: 'Sonya',
    hp: 100,
    image: './assets/sonya.gif',
    weapon: ['axe', 'sword'],
    Attack: function(target) {
        console.log(this.name + ' attacks!');
        ChangeHP(target, GenerateInteger(0, 20));
    }
}

//////////////////Init area////////////////////////

const $arena = document.querySelector('.arenas');
$arena.append(CreatePlayer(player1));
$arena.append(CreatePlayer(player2));

const $randomButton = document.querySelector('.button');
$randomButton.addEventListener('click', OnRandomButtonClick);

//////////////////Gameplay logic////////////////////////

function OnRandomButtonClick () {
    if (Math.random() > 0.5) {
        player1.Attack(player2);
    }
    else {
        player2.Attack(player1);
    }
}

function GenerateInteger (min, max) {
    return Math.ceil(min + Math.random() * (max - min));
}

function ChangeHP(player, damage) {
    if (damage > player.hp) damage = player.hp;
    player.hp -= damage;
    player.$lifeBar.style.width = player.hp + '%';

    console.log(player.name + " got " + damage + " damage. " + player.hp + " hp left");
    if (player.hp <= 0) PlayerDead(player);
}

function PlayerDead(player) {
    const winner = player.playerID === 1 ? player2.name : player1.name;
    winString = winner + ' wins!';
    console.log(winString);

    winMessage = CreateMessage(winString);
    $arena.append(winMessage);

    $randomButton.disabled = true;
}

//////////////////Code management functions////////////////////////

function CreateMessage(message) {
    const $messageLabel = CreateElement('div', 'loseTitle');
    $messageLabel.innerText = message;
    return $messageLabel;
}

function CreateElement(tag, elementClass) {
    const $element = document.createElement(tag);
    if (elementClass) $element.classList.add(elementClass);
    return $element;
}

//////////////////Creating player functions////////////////////////

function CreatePlayer(playerObj) {
    const $player = CreateElement('div', 'player' + playerObj.playerID);
    $player.append(CreateProgressBar(playerObj));
    $player.append(CreateCharacter(playerObj));
    return $player;
}

function CreateProgressBar(playerObj) {
    const $progressBar = CreateElement('div', 'progressbar');
    $progressBar.append(CreateLife(playerObj));
    $progressBar.append(CreateName(playerObj));       
    return $progressBar;
}

function CreateLife(playerObj) {
    const $life = CreateElement('div', 'life');
    $life.style.width = '100%';
    playerObj.$lifeBar = $life;
    return $life;
}

function CreateName(playerObj) {
    const $name = CreateElement('div', 'name');
    $name.innerText = playerObj.name;
    return $name;
}

function CreateCharacter(playerObj) {
    const $character = CreateElement('div', 'character');
    $character.append(CreateImage(playerObj.image));
    return $character;
}

function CreateImage(image) {
    const $image = CreateElement('img');
    $image.src = image;
    return $image;
}