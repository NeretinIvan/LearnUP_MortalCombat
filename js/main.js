import { player1, player2 } from './players.js';
import { readAttackFromForm, generateRandomAttack } from './attackGeneration.js';
import { createPlayer } from './createPlayerElement.js';
import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';
import { gameIsOver, getWinMessage } from './gameOverChecks.js';
import { createWinMessageElement, createReloadButton } from './elementCreation.js';

const $ARENA = document.querySelector('.arenas');
const $CONTROL_FORM = document.querySelector('.control');

function onControlFormSubmit (e) {
    e.preventDefault();

    const ourAttackResult = readAttackFromForm(player1, $CONTROL_FORM);
    const enemyAttackResult = generateRandomAttack(player2);
    player1.tryAttack(ourAttackResult, enemyAttackResult);
    player2.tryAttack(enemyAttackResult, ourAttackResult);

    for (let item of $CONTROL_FORM) {
        item.checked = false;
    }

    if (gameIsOver(player1, player2)) {
        onGameOver(player1, player2);
    }
}

function onGameOver(player1, player2) {
    const winMessage = getWinMessage(player1, player2);
    $ARENA.append(createWinMessageElement(winMessage));
    $ARENA.append(createReloadButton());
    for (let item of $CONTROL_FORM) {
        item.disabled = true;
    }
}

$ARENA.append(createPlayer(player1));
$ARENA.append(createPlayer(player2));
$CONTROL_FORM.addEventListener('submit', onControlFormSubmit);
logMessageToChat(MESSAGE_TYPE.start, player1, player2);

