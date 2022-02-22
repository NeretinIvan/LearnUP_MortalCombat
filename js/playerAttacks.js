import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';

export const tryAttack = (myAttack, opponentAttack) => {
    if (myAttack.hit != opponentAttack.defence) {
        attack(myAttack);
        logMessageToChat(MESSAGE_TYPE.hit, myAttack.player, opponentAttack.player, myAttack.value);
    }
    else {
        logMessageToChat(MESSAGE_TYPE.defence, myAttack.player, opponentAttack.player);
    }
}

const attack = ({player, value}) => {
    const target = player.getOpponent();
    changeHP(target, value);
}

const changeHP = (player, damage) => {
    if (damage > player.hp) damage = player.hp;
    player.hp -= damage;
    renderHP(player);
}

const renderHP = (player) => {
    elHP(player).style.width = player.hp + '%';  
}

const elHP = ({playerID}) => {
    return document.querySelector('.player' + playerID + ' .life');
}

export default tryAttack;