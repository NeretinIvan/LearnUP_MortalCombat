import { tryAttack } from './playerAttacks.js';

export const player1 = {
    playerID: 1,
    name: 'Scorpion',
    hp: 100,
    image: './assets/scorpion.gif',
    weapon: ['knife', 'chain'],
    tryAttack,
    getOpponent
}

export const player2 = {
    playerID: 2,
    name: 'Sonya',
    hp: 100,
    image: './assets/sonya.gif',
    weapon: ['axe', 'sword'],
    tryAttack,
    getOpponent
}

function getOpponent() {
    return this.playerID === 1 ? player2 : player1;
}

export default {player1, player2};