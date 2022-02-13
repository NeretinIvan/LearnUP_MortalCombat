const scorpionImage = './assets/scorpion.gif';
const sonyaImage = './assets/sonya.gif';


class Player {
    static playerIDs = {playerOne: 1, playerTwo: 2};

    constructor(name, img, weapons, id){
        this.name = name;
        this.currentHp = 100;
        this.img = img;
        this.weapons = weapons;
        this.id = id;
    }

    Attack (enemyPlayer) {
        console.log(this.name + " is attacking! ");
        enemyPlayer.ReceiveDamage(this.#GetDamage(), this);
    }
    
    #GetDamage () {
        return Math.ceil(Math.random() * 10);
    }

    ReceiveDamage (damage, source) {
        if (damage > this.currentHp) damage = this.currentHp;
        this.currentHp -= damage;
        this.$lifeBar.style.width = this.currentHp + '%';
        console.log(this.name + " got " + damage + " damage from " + source.name + ". " + this.currentHp + " hp left");
        if (this.currentHp <= 0) this.#BecomeDead(source);
    }

    #BecomeDead (source) {
        GameIsOver(source);
    }

    CreatePlayer (playerId) {
        const $player = document.createElement('div');
        $player.classList.add(playerId);
        $player.append(this.#CreateProgressBar());
        $player.append(this.#CreateCharacter());
        return $player;
    }

    #CreateProgressBar() {
        const $progressBar = document.createElement('div');
        $progressBar.classList.add('progressbar');
        $progressBar.append(this.#CreateLife());
        $progressBar.append(this.#CreateName());       
        return $progressBar;
    }

    #CreateLife() {
        const $life = document.createElement('div');
        $life.classList.add('life');
        $life.style.width = '100%';
        this.$lifeBar = $life;
        return $life;
    }

    #CreateName() {
        const $name = document.createElement('div');
        $name.classList.add('name');
        $name.innerText = this.name;
        return $name;
    }

    #CreateCharacter() {
        const $character = document.createElement('div');
        $character.classList.add('character');
        $character.append(this.#CreateImage());
        return $character;
    }

    #CreateImage() {
        const $image = document.createElement('img');
        $image.src = this.img;
        return $image;
    }
}

/* ******** */

const player1 = new Player('Scorpion', scorpionImage, ['knife', 'chain'], Player.playerIDs.playerOne);
const player2 = new Player('Sonya', sonyaImage, ['axe', 'sword'], Player.playerIDs.playerTwo);

const $arena = document.getElementsByClassName('arenas')[0];
$arena.append(player1.CreatePlayer('player1'));
$arena.append(player2.CreatePlayer('player2'));

const $randomButton = document.getElementsByClassName('button')[0];
$randomButton.addEventListener('click', onRandomButtonClick);

function onRandomButtonClick () {
    if (Math.random() > 0.5) {
        player1.Attack(player2);
    }
    else {
        player2.Attack(player1);
    }
}

function GameIsOver (winner) {
    const winMessage = winner.name + " wins!";
    console.log(winMessage);
    const $randomButton = document.getElementsByClassName('button')[0];
    $randomButton.disabled = true;
    $arena.append(CreateMessage(winMessage));
}

function CreateMessage (message) {
    const $messageLabel = document.createElement('div');
    $messageLabel.innerText = message;
    $messageLabel.classList.add('loseTitle');
    return $messageLabel;
}