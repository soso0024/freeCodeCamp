let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }

];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "goblin",
        level: 5,
        health: 30,
    },
    {
        name: "dragon",
        level: 10,
        health: 100,
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "Welcome to the town square!"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTownSquare],
        text: "Welcome to the store!"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight goblin", "Go to town square"],
        "button functions": [fightSlime, fightGoblin, goTownSquare],
        text: "Welcome to the cave!"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTownSquare],
        text: "You are fighting a monster!"
    },
    {
        name: "win",
        "button text": ["Go to town square", "Go to town square", "Easter egg"],
        "button functions": [goTownSquare, goTownSquare, easterEgg],
        text: "You won!"
    },
    {
        name: "winGame",
        "button text": ["restart", "none", "none"],
        "button functions": [restart, "none", "none"],
        text: "You completed the game 🎉"
    },
    {
        name: "lose",
        "button text": ["restart", "none", "none"],
        "button functions": [restart, "none", "none"],
        text: "You lost!"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTownSquare],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations) {
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    text.innerText = locations.text;
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        health += 10;
        gold -= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought 10 health!";
    } else {
        text.innerText = "You don't have enough gold!";
        button1.disabled = true;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You bought a " + newWeapon + "!";
            text.innerText = `You bought a ${newWeapon}!`;
            inventory.push(newWeapon);
            console.log(inventory);
        } else {
            text.innerText = "You don't have enough gold!";
        }
    } else {
        text.innerText = "You already have the best weapon!";
        // button2.disabled = true;
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.pop(); // shift: 配列の最初の要素を取り出す pop: 最後の要素を取り出す
        text.innerText = `You sold your ${currentWeapon} for 15 gold!`;
        text.innerText = "In your inventory: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!"
    }
}

function goTownSquare() {
    update(locations[0]);
    button1.disabled = false;
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightGoblin() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + "!";

    if (isMonsterAttackHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += "The monster missed you!";
    }

    healthText.innerText = health;
    let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting == 2 ? winGame() : win();

        /*
        if (fighting === 2) {
            winGame();
        } else {
            win();
        }
        */
    }

    if (Math.random() <= 0.1 && inventory.length != 1) {
        text.innerText += "\nYour " + inventory.pop() + " broke!";
        currentWeapon--;
    }

}

function isMonsterAttackHit() {
    return Math.random() > 0.2 || health > 20; // 80%の確率でヒット
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - Math.floor(Math.random() * xp);
    console.log(hit);
    return hit;
}

// dodge: 回避する
function dodge() {
    text.innerText = "You dodged the " + monsters[fighting].name + "'s attack!";
}

function win() {
    gold += Math.floor(monsters[fighting].level * 6);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function winGame() {
    update(locations[5]);
}

function lose() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    xpText.innerText = xp;
    health = 100;
    healthText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    currentWeapon = 0;
    fighting = 0;
    monsterHealth = 0;
    inventory = ["stick"];
    update(locations[0]);
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11)); // 0から10の乱数を生成, Math.random()は0以上1未満の乱数を生成
    }

    text.innerText = "You picked " + guess + ". The numbers are:\n";

    for (let i = 0; i < numbers.length; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) != -1) {
        text.innerText += "\nYou got 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "\nYou lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}