import LOGS from './logs.js';
import generateInteger from './generateInteger.js';

export const MESSAGE_TYPE = {
    start: 'start',
    end: 'end',
    hit: 'hit',
    defence: 'defence',
    draw: 'draw'
}

const $CHAT = document.querySelector('.chat');

/**
 * Outputs message depending on type of message
 * @param {string} type Message type
 * @param {object} attackingPlayer Start: player1; End: Winner; Hit: Attacking player
 * @param {object} defensivePlayer Start: player2; End: Loser; Hit: Defensive player
 * @param {object} [damage] Damage dealt by successful hit
 */
 export const logMessageToChat = (type, attackingPlayer, defensivePlayer, damage) => {
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

const getCurrentTime = () => {
    const currentTime = new Date();
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return currentTime.toLocaleTimeString('ru', options);
}

const printMessageToChat = (message) => {
    message = `<p>${message}</p>`;
    $CHAT.insertAdjacentHTML('afterbegin', message);
}

export default {logMessageToChat, MESSAGE_TYPE};