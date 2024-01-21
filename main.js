function loadJQuery() {
    const jqueryUrl = 'https://code.jquery.com/jquery-3.6.4.min.js';
    
    return fetch(jqueryUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load jQuery: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(jqueryCode => {
            const script = document.createElement('script');
            script.textContent = jqueryCode;
            document.head.appendChild(script);
        })
        .catch(error => {
            console.error(error);
        });
}

loadJQuery();

document.getElementById("submitName").addEventListener("click", submitName);
document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("fight").addEventListener("click", () => playerAction("fight"));
document.getElementById("flee").addEventListener("click", () => playerAction("flee"));
document.getElementById("hit").addEventListener("click", () => fightAction("hit"));
document.getElementById("block").addEventListener("click", () => fightAction("block"));

let player = { name: "", health: 100 };
let monsters = [
    { name: "Goblin", health: 30 },
    { name: "Orc", health: 50 },
    { name: "Dragon", health: 100 },
];
let currentMonster;

function submitName() {
    player.name = document.getElementById("playerName").value;
    if (player.name.trim() === "") {
        alert("Please enter a name.");
    } else {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("startGame").style.display = "block";
    }
}

function startGame() {
    console.log(`Hello, ${player.name}! Your journey begins.`);
    player.health = 100;
    nextEncounter();
}

function nextEncounter() {
    currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
    console.log(`\n--- Encounter: ${currentMonster.name} ---`);

    document.getElementById("enemyImage").src = getMonsterImagePath(currentMonster.name);

    document.getElementById("actionButtons").style.display = "block";
    document.getElementById("fight").style.display = "inline";
    document.getElementById("flee").style.display = "inline";
    document.getElementById("hit").style.display = "none";
    document.getElementById("block").style.display = "none";
    document.getElementById("enemyImage").style.display = "inline";
}

function getMonsterImagePath(monsterName) {
    switch(monsterName) {
        case "Goblin":
            return "/images/goblin.png";
        case "Orc":
            return "/images/orc.png";
        case "Dragon":
            return "/images/dragon.png";
        default:
            return ""; 
    }
}

function playerAction(action) {
    if (action === "fight") {
        document.getElementById("fight").style.display = "none";
        document.getElementById("flee").style.display = "none";
        document.getElementById("hit").style.display = "inline";
        document.getElementById("block").style.display = "inline";
    } else if (action === "flee") {
        if (Math.random() < 0.5) {
            console.log("You successfully fled the battle!");
            nextEncounter();
        } else {
            console.log("You failed to flee. The battle continues.");
            battleRound(currentMonster, player, "hit");
        }
    }
}

function fightAction(action) {
  battleRound(player, currentMonster, action);
  if (currentMonster.health > 0 && action !== "block") {
      battleRound(currentMonster, player, "hit");
  }
  if (player.health <= 0) {
      endGame();
  } else if (currentMonster.health <= 0) {
    
    if (currentMonster.name === "Goblin") {
      currentMonster.health = 30;
    } else if (currentMonster.name === "Orc") {
      currentMonster.health = 50;
    } else if (currentMonster.name === "Dragon") {
      currentMonster.health = 100;
    }
      nextEncounter();
  }
  console.log(currentMonster.health);
}

function battleRound(attacker, defender, action) {
    console.log(`\n--- ${attacker.name}'s Turn ---`);
    if (action === "hit") {
        let damage = Math.floor(Math.random() * 11) + 10;
        defender.health -= damage;
        console.log(`${attacker.name} hits ${defender.name} for ${damage} damage!`);
    } else if (action === "block") {
        console.log(`${defender.name} blocks the attack! No damage taken.`);
        return; 
    }

    if (defender.health <= 0) {
        console.log(`${defender.name} is defeated!`);
    }
}

function endGame() {
    console.log("Game Over. You were defeated!");
    document.getElementById("actionButtons").style.display = "none";
    document.getElementById("startGame").style.display = "block";
    document.getElementById("enemyImage").src = "/images/youdied.png";
}
