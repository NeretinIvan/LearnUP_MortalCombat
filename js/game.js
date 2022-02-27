import { initPlayers } from './players.js';
import { readAttackFromForm, getAttacksJson } from './attackGeneration.js';
import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';
import { createWinMessageElement, createReloadButton } from './elementCreation.js';

export class Game {
    $arena;
    $controlForm;
    player1;
    player2;

    constructor() {
        this.$arena = document.querySelector('.arenas');
        this.$controlForm = document.querySelector('.control');
    }

    start = () => {        
        initPlayers(({player1, player2}) => {
            this.player1 = player1;
            this.player2 = player2;
            this.player1.create(this.$arena);
            this.player2.create(this.$arena);
            this.$controlForm.addEventListener('submit', this.onControlFormSubmit);
            logMessageToChat(MESSAGE_TYPE.start, this.player1, this.player2);
        })
        .catch((error) => {
            console.log(`Error when trying initialize players: ${error}`);
        });
    }

    onControlFormSubmit = (e) => {
        e.preventDefault();
        let player1attack = {}, player2attack = {};

        const inputAttack = readAttackFromForm(this.$controlForm);
        
        getAttacksJson(inputAttack).then((result) => {
            player1attack = {...result.player1, player: this.player1};
            player2attack = {...result.player2, player: this.player2};
        }).then(() => {
            this.player1.tryAttack(player1attack, player2attack);
            this.player2.tryAttack(player2attack, player1attack);
        }).then(() => {
            if (this.gameIsOver()) {
                this.onGameOver();
            }
        })
        .catch((error) => {
            console.log(`Cannot attack: ${error}`);
        });
        
        for (let item of this.$controlForm) {
            item.checked = false;
        }
    }

    onGameOver = () => {
        const winMessage = this.getWinMessage(this.player1, this.player2);
        this.$arena.append(createWinMessageElement(winMessage));
        this.$arena.append(createReloadButton());
        for (let item of this.$controlForm) {
            item.disabled = true;
        }
    }

    gameIsOver = () => {
        return this.player1.hp === 0 || this.player2.hp === 0;
    }
    
    getWinMessage = () => {
        let winMessage = '';
        const winner = this.getWinner();
    
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
    
    getWinner = () => {
        if (this.player1.hp === this.player2.hp) return null;
        return this.player1.hp > this.player2.hp ? this.player1 : this.player2;
    }
}
