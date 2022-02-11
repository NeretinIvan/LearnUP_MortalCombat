const scorpionImage = './assets/scorpion.gif';
const sonyaImage = './assets/sonya.gif';

class Player {
    constructor(name, baseHp, img, weapons){
        this.name = name;
        this.baseHp = baseHp;
        this.img = img;
        this.weapons = weapons;
    }

    Attack () {
        console.log(this.name + " is attacking!");
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

const player1 = new Player('Scorpion', 100, scorpionImage, ['knife', 'chain']);
const player2 = new Player('Sonya', 120, sonyaImage, ['axe', 'sword']);

player1.Attack();
player2.Attack();

const $arena = document.getElementsByClassName('arenas')[0];
$arena.append(player1.CreatePlayer('player1'));
$arena.append(player2.CreatePlayer('player2'));
