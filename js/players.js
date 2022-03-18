import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';
import createPlayer from './createPlayerElement.js';

class Player {
    playerID;
    name;
    image;
    hp = 100;
    weapons;
    $lifeBar;

    constructor({name, image, weapons, playerID}) {
        this.name = name;
        this.image = image;
        this.weapons = weapons;
        this.playerID = playerID;
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

const PLAYER_IMAGES = {
    Scorpion: './assets/scorpion.gif',
    Sonya: './assets/sonya.gif'
}

const PLAYER_WEAPONS = {
    Scorpion: ['knife', 'chain'],
    Sonya: ['axe', 'sword']
}

const PLAYER_ID = {
    player1: 1,
    player2: 2
}

export const player1 = new Player({
    name: 'Scorpion', 
    image: PLAYER_IMAGES.Scorpion, 
    weapons: PLAYER_WEAPONS.Scorpion, 
    playerID: PLAYER_ID.player1
});

export const player2 = new Player({
    name: 'Sonya', 
    image: PLAYER_IMAGES.Sonya, 
    weapons: PLAYER_WEAPONS.Sonya, 
    playerID: PLAYER_ID.player2
});

export default {player1, player2};