import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';
import createPlayer from './createPlayerElement.js';

const PLAYER_ID = {
    firstPlayer: 1,
    secondPlayer: 2
}

const DEFAULT_PLAYER = {
    name: 'Sub-Zero default', 
    img: '../assets/subzero.gif',
    id: 12
};

let player1 = {};
let player2 = {};

const ALL_PLAYERS_URL = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
const RANDOM_PLAYER_URL = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';

class Player {
    playerID;
    name;
    image;
    hp = 100;
    $lifeBar;
    avatar;

    constructor({name, img: image, avatar}, playerID) {
        this.name = name;
        this.image = (image || DEFAULT_PLAYER.img);
        this.playerID = playerID;
        this.avatar = avatar;
        this.hp = 100;
    }

    tryAttack = ({value: damage, player: attackingPlayer, hit}, {defence, player: defensivePlayer}) => {
        if (hit != defence) {
            this.getOpponent().changeHP(damage);
            logMessageToChat(MESSAGE_TYPE.hit, attackingPlayer, defensivePlayer, damage);
        }
        else {
            logMessageToChat(MESSAGE_TYPE.defence, attackingPlayer, defensivePlayer);
        }
    }
    
    getOpponent = () => {
        return this.playerID === 1 ? player2 : player1;
    }

    changeHP = (damage) => {
        if (damage > this.hp) damage = this.hp;
        this.hp -= damage;
        this.renderHP();
    }
    
    renderHP = () => {
        this.$lifeBar.style.width = this.hp + '%';  
    }
    
    create = ($root) => {
        $root.append(createPlayer(this));
        this.$lifeBar = this.elHP();
    }

    elHP = () => {
        return document.querySelector('.player' + this.playerID + ' .life');
    }
}

const getAllCharactersListJson = async() => {
    return (await fetch(ALL_PLAYERS_URL)).then(result => result.json());
}

const getRandomCharacterJson = async() => {
    try {
        const response = await fetch(RANDOM_PLAYER_URL);
        if (response.status < 200 || response.status >= 300) throw Error(`${response.status}: Cannot load random character from server.`);
        return await response.json();
    }
    catch(error) {
        console.log(`Cannot load player. Details: ${error}`);
        return DEFAULT_PLAYER;
    }
}

const getPlayerCharacterJson = () => {
    try {
        const result = JSON.parse(localStorage.getItem('player1'));
        return result;
    }
    catch (error) {
        console.log(`Cannor get selected player: ${error}`);
        return DEFAULT_PLAYER;
    }
}

export const initPlayers = async(resolve, reject) => {
    const player2Obj = await getRandomCharacterJson();
    player2 = new Player(player2Obj, PLAYER_ID.secondPlayer);

    const player1Obj = getPlayerCharacterJson();
    player1 = new Player(player1Obj, PLAYER_ID.firstPlayer);

    resolve({player1, player2});
}

export default {initPlayers};