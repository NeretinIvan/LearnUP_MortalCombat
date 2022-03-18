import generateInteger from './generateInteger.js';

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

export const readAttackFromForm = (player, form) => {
    const ourAttackResult = {};

    for (let item of form) {
        if (item.checked && item.name === 'hit') {
            ourAttackResult.hit = item.value;
            ourAttackResult.value = generateInteger(1, HIT[item.value]);
        }
        if (item.checked && item.name === 'defence') {
            ourAttackResult.defence = item.value;
        }
    }
    ourAttackResult.player = player;

    return ourAttackResult;
}

export const generateRandomAttack = (player) => {
    const hit = ATTACK[generateInteger(0, ATTACK.length - 1)];
    const defence = ATTACK[generateInteger(0, ATTACK.length - 1)];
    return {
        value: generateInteger(1, HIT[hit]),
        hit,
        defence,
        player
    }
}

export default {readAttackFromForm, generateRandomAttack};