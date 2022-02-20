//////////////////Constants////////////////////////

const MESSAGE_TYPE = {
    start: 'start',
    end: 'end',
    hit: 'hit',
    defence: 'defence',
    draw: 'draw'
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];
const $ARENA = document.querySelector('.arenas');
const $CONTROL_FORM = document.querySelector('.control');
const $CHAT = document.querySelector('.chat');

const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

//////////////////Init players////////////////////////

const player1 = {
    playerID: 1,
    name: 'Scorpion',
    hp: 100,
    image: './assets/scorpion.gif',
    weapon: ['knife', 'chain'],
    tryAttack
}

const player2 = {
    playerID: 2,
    name: 'Sonya',
    hp: 100,
    image: './assets/sonya.gif',
    weapon: ['axe', 'sword'],
    tryAttack
}

//////////////////Gameplay logic////////////////////////

function onControlFormSubmit (e) {
    e.preventDefault();

    const ourAttackResult = ourAttack();
    const enemyAttackResult = enemyAttack();
    player1.tryAttack(ourAttackResult, enemyAttackResult);
    player2.tryAttack(enemyAttackResult, ourAttackResult);

    for (let item of $CONTROL_FORM) {
        item.checked = false;
    }

    checkGameOver();
}

function ourAttack() {
    const ourAttackResult = {};

    for (let item of $CONTROL_FORM) {
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

function generateInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tryAttack(myAttack, opponentAttack) {
    const opponent = getOpponent.call(this);

    if (myAttack.hit != opponentAttack.defence) {
        attack.call(this, myAttack);
        logMessageToChat(MESSAGE_TYPE.hit, this, opponent, myAttack.value);
    }
    else {
        logMessageToChat(MESSAGE_TYPE.defence, this, opponent);
    }
}

function getOpponent() {
    return this.playerID === 1 ? player2 : player1;
}

function attack(attackStats) {
    target = getOpponent.call(this);
    changeHP.call(target, attackStats.value);
    renderHP.call(target);
}

function changeHP(damage) {
    if (damage > this.hp) damage = this.hp;
    this.hp -= damage;
}

function renderHP() {
    elHP.call(this).style.width = this.hp + '%';  
}

function elHP() {
    return document.querySelector('.player' + this.playerID + ' .life');
}

function checkGameOver() {
    if (player1.hp !== 0 && player2.hp !== 0) return;

    let winMessage = '';
    const winner = getWinner();

    if (winner) {
        logMessageToChat(MESSAGE_TYPE.end, winner, getOpponent.call(winner));
        winMessage = `${winner.name} wins!`;
    }
    else {
        logMessageToChat(MESSAGE_TYPE.draw);
        winMessage = `Draw`;
    }
    
    $ARENA.append(renderWinMessage(winMessage));
    gameOver();
}

function getWinner() {
    if (player1.hp === player2.hp) return null;
    return player1.hp > player2.hp ? player1 : player2;
}

/**
 * Outputs message depending on type of message
 * @param {string} type Message type
 * @param {object} attackingPlayer Start: player1; End: Winner; Hit: Attacking player
 * @param {object} defensivePlayer Start: player2; End: Loser; Hit: Defensive player
 * @param {object} [damage] Damage dealt by successful hit
 */
 function logMessageToChat(type, attackingPlayer, defensivePlayer, damage) {
    let message = '';
    switch(type) {
        case MESSAGE_TYPE.start:
            message = LOGS.start;
            break;
        case MESSAGE_TYPE.hit:
            message = `[[time]]: ${LOGS.hit[generateInteger(0, LOGS.hit.length - 1)]} [-${damage}] [${defensivePlayer.hp}/100]`;
            break;
        case MESSAGE_TYPE.defence:
            message = `[[time]]: ${LOGS.defence[generateInteger(0, LOGS.defence.length - 1)]}`;
            break;
        case MESSAGE_TYPE.end:
            message = LOGS.end[generateInteger(0, LOGS.end.length - 1)];
            break;
        case MESSAGE_TYPE.draw:
            message = LOGS.draw;
            break;
        default:
            message = 'Пока-что ничего не происходит...';
            break;
    }

    if (attackingPlayer && defensivePlayer) {
        message = message
            .replace('[player1]', attackingPlayer.name)
            .replace('[player2]', defensivePlayer.name)
            .replace('[playerWins]', attackingPlayer.name)
            .replace('[playerLose]', defensivePlayer.name)
            .replace('[playerKick]', attackingPlayer.name)
            .replace('[playerDefence]', defensivePlayer.name);
    }

    message = message.replace('[time]', getCurrentTime());

    printMessageToChat(message);
}

function getCurrentTime() {
    const currentTime = new Date();
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return currentTime.toLocaleTimeString('ru', options);
}

function printMessageToChat(message) {
    message = `<p>${message}</p>`;
    $CHAT.insertAdjacentHTML('afterbegin', message);
}

function renderWinMessage(message) {
    const $messageLabel = createElement('div', 'loseTitle');
    $messageLabel.innerText = message;
    return $messageLabel;
}

function gameOver() {
    $ARENA.append(createReloadButton());
    for (let item of $CONTROL_FORM) {
        item.disabled = true;
    }
}

function restart() {
    window.location.reload();
}

//////////////////Construction functions////////////////////////

function createElement(tag, elementClass) {
    const $element = document.createElement(tag);
    if (elementClass) $element.classList.add(elementClass);
    return $element;
}

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
$ARENA.append(createPlayer(player1));
$ARENA.append(createPlayer(player2));
$CONTROL_FORM.addEventListener('submit', onControlFormSubmit);
logMessageToChat(MESSAGE_TYPE.start, player1, player2);