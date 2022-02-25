import { player1, player2 } from './players.js';
import { readAttackFromForm, generateRandomAttack } from './attackGeneration.js';
import { logMessageToChat, MESSAGE_TYPE } from './chatLogging.js';
import { createWinMessageElement, createReloadButton } from './elementCreation.js';

export class Game {
    $arena;
    $controlForm;
 
    constructor() {
        this.$arena = document.querySelector('.arenas');
        this.$controlForm = document.querySelector('.control');
    }

    start = () => {
        player1.create(this.$arena);
        player2.create(this.$arena);
        this.$controlForm.addEventListener('submit', this.onControlFormSubmit);
        logMessageToChat(MESSAGE_TYPE.start, player1, player2);
    }

    onControlFormSubmit = (e) => {
        e.preventDefault();
    
        const ourAttackResult = readAttackFromForm(player1, this.$controlForm);
        const enemyAttackResult = generateRandomAttack(player2);
        player1.tryAttack(ourAttackResult, enemyAttackResult);
        player2.tryAttack(enemyAttackResult, ourAttackResult);
    
        for (let item of this.$controlForm) {
            item.checked = false;
        }
    
        if (this.gameIsOver()) {
            this.onGameOver();
        }
    }

    onGameOver = () => {
        const winMessage = this.getWinMessage(player1, player2);
        this.$arena.append(createWinMessageElement(winMessage));
        this.$arena.append(createReloadButton());
        for (let item of this.$controlForm) {
            item.disabled = true;
        }
    }

    gameIsOver = () => {
        return player1.hp === 0 || player2.hp === 0;
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
        if (player1.hp === player2.hp) return null;
        return player1.hp > player2.hp ? player1 : player2;
    }
}
