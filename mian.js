function startGame() {
    console.log("Welcome to the RPG Adventure!");
  
    let playerName = prompt("Enter your character's name:");
    console.log(`Hello, ${playerName}! Your journey begins.`);
  
    while (true) {
      console.log("\n--- Encounter ---");
      console.log("A wild monster appears!");
  
      let choice = prompt("What will you do? (attack/run)");
  
      if (choice.toLowerCase() === "attack") {
        if (Math.random() < 0.5) {
          console.log("You defeated the monster! Victory!");
        } else {
          console.log("Oh no! The monster defeated you. Game over.");
          break;
        }
      } else if (choice.toLowerCase() === "run") {
        if (Math.random() < 0.5) {
          console.log("You successfully escaped!");
        } else {
          console.log("Oops, you couldn't escape! The monster caught you. Game over.");
          break;
        }
      } else {
        console.log("Invalid choice. Please enter 'attack' or 'run'.");
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
  