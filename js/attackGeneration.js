const GET_ATTACK_VALUE_URL = 'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';

export const readAttackFromForm = (form) => {
    const ourAttackResult = {};

    for (let item of form) {
        if (item.checked && item.name === 'hit') {
            ourAttackResult.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            ourAttackResult.defence = item.value;
        }
    }

    return ourAttackResult;
}

export const getAttacksJson = async({hit, defence}) => {
    return (await fetch(GET_ATTACK_VALUE_URL, {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence
        })
    })).json();
}

export default {readAttackFromForm, getAttacksJson};