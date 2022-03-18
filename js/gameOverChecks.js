import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';

export const gameIsOver = (player1, player2) => {
    return player1.hp === 0 || player2.hp === 0;
}

export const getWinMessage = (player1, player2) => {
    let winMessage = '';
    const winner = getWinner(player1, player2);

    if (winner) {
        logMessageToChat(MESSAGE_TYPE.end, winner, winner.getOpponent());
        winMessage = `${winner.name} wins!`;
    }
    else {
        logMessageToChat(MESSAGE_TYPE.draw);
        winMessage = `Draw`;
    }
    
    return winMessage;
}

const getWinner = (player1, player2) => {
    if (player1.hp === player2.hp) return null;
    return player1.hp > player2.hp ? player1 : player2;
}

export default {gameIsOver, getWinMessage};