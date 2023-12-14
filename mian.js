function startGame() {
  console.log("Welcome to the RPG Adventure!");

  let player = {
    name: prompt("Enter your character's name:"),
    health: 100,
  };

  console.log(`Hello, ${player.name}! Your journey begins.`);

  let monsters = [
    { name: "Goblin", health: 30 },
    { name: "Orc", health: 50 },
    { name: "Dragon", health: 100 },
  ];

  function battleRound(attacker, defender) {
    console.log(`\n--- ${attacker.name}'s Turn ---`);

    if (Math.random() < 0.5) {
      if (Math.random() < 0.1) {
        console.log(`${defender.name} blocks ${attacker.name}'s attack! No damage.`);
      } else {
        let damage = Math.floor(Math.random() * 11) + 10;

        defender.health -= damage;

        console.log(`${attacker.name} hits ${defender.name} for ${damage} damage!`);

        if (defender.health <= 0) {
          console.log(`You defeated the ${defender.name}! Victory!`);
          return false; 
        }
      }
    } else {
      console.log(`${attacker.name}'s attack missed!`);
    }

    return true; 
  }

  while (player.health > 0) {
    let randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

    console.log(`\n--- Encounter: ${randomMonster.name} ---`);
    
    let continueBattle = battleRound(player, randomMonster);

    if (!continueBattle) {
      break; 
    }

    continueBattle = battleRound(randomMonster, player);

    if (!continueBattle) {
      break; 
    }
  }

  let playAgain = prompt("Do you want to play again? (yes/no)");

  if (playAgain.toLowerCase() === "yes") {
    startGame(); 
  } else {
    console.log("Thanks for playing! Goodbye.");
  }
}

startGame();
