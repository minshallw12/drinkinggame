const prompt=require("prompt-sync")({sigint:true}); 

// Player instructions 
function HowToPlay() {
  console.log('--Five Tens Drinking Game-- \n\n- The goal is to guess the total of all players.\n- Round starts with player1. \n- The goal is to guess the total of all players. \n- Each player throws a 0 (closed fist) or 5 (open fist). \n- If player1 guesses correctly, he or she is eliminated. \n- If the guess is incorrect, the turn passes to the next player.\n- The last player standing takes a shot! \n')
  
  let answer = prompt('Do you understand? <y/n>');
  if (answer === 'n') {
    console.log(' \nCall Will for practice. \n');
    return HowToPlay();
  } else {
    return FiveTensDrinking();
  }
  };

// Add player name and win/loss record
function playerSetUp() {

  function nameScript() {
  let name = prompt("What is your name? ")
  let answer = prompt("Your name is " + name + "? <y/n> ");
  if (answer === "Y" || answer === "y") {
    return name;
  } else {
    return nameScript();
  }
};

let playerName = nameScript();
let player = {
  "Name":playerName,
  "Wins":0,
  "Losses":0
}
return player;
  };

//Players move during play
function playersMove() {
    let move = prompt('Throw 0 or 5? ');
    if (move == 0 || move == 5) {
      return move
    } else {
      console.log("Not a valid move!")
      return playersMove();
    }
  };

//Players move during turn
function playerTurn() {
    let guess = prompt('What\'s your guess? ');
    if (guess % 5 == 0) {
      return guess;
    } else {
      console.log('Not a multiple of 5');
      return playerTurn();
    }
  };

//Computers  AI move during play
function computerMove() {
    let random = Math.round(Math.random());
    if (random === 1) {
      return 5;
    } else {
      return 0;
    }
  };

//Computers AI move during guess
function computerTurn(numOfPlayers) {
    if (numOfPlayers === 3) {
      let random = Math.floor(Math.random()*4)+1;
      if (random === 1) {
        return 0;
        }
      if (random === 2) {
        return 5;
        }
      if (random === 3) {
        return 10;
        }
      if (random === 4) {
        return 15;
        }
      }
    if (numOfPlayers === 2) {
      let random = Math.floor(Math.random()*3)+1;
      if (random === 1) {
        return 0;
        }
      if (random === 2) {
        return 5;
        }
      if (random === 3) {
        return 10;
        }
      }
  };

//first round with 3 players
function round1(whosfirst, playerName) {
    let players = [playerName, 'player2', 'player3'];
    let winner = '';
    
    if (whosfirst === playerName) {
        let guess = playerTurn();
      console.log('You guess ' + guess + '.');
        let player1 = playersMove();
      console.log(`${playerName} throws ${player1}.`);
        let player2 = computerMove();
      console.log('Player2 throws ' + player2 + '.');
        let player3 = computerMove();
      console.log('Player3 throws ' + player3 + '.');
        let sum = parseInt(player1)+parseInt(player2)+parseInt(player3);
      console.log('The total is ' + sum + '.');
        if (sum == guess) {
          console.log(whosfirst+' wins the round!\n');
          winner = whosfirst;
          players.splice(players.indexOf(winner),1)
            //console.log(players)
          let human = 'n';
          return [players[0], human];
        } else {
          console.log('No winner... \n');
          return round1('player2', playerName);
        }
    }
    if (whosfirst === 'player2') {
      console.log('Player2 is guessing... ')
        let player1 = playersMove();
          console.log(`${playerName} throws ${player1}.`);
        let guess = computerTurn(3);
          console.log('Player2 guesses ' + guess + '.');
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.');
        let player3 = computerMove();
          console.log('Player3 throws ' + player3 + '.');
        let sum = parseInt(player1)+parseInt(player2)+parseInt(player3);
          console.log('The total is ' + sum + '.');
        if (sum == guess) {
          console.log(whosfirst+' wins the round!\n');
          winner = whosfirst;
          players.splice(players.indexOf(winner), 1);
            //console.log(players);
          let human = 'y';
          return [players[0], human];
        } else {
          console.log('No winner... \n');
          return round1('player3', playerName);
          }
    };
    if (whosfirst === 'player3') {
      console.log('Player3 is guessing... ')
        let player1 = playersMove();
          console.log(`${playerName} throws ${player1}.`)
        let guess = computerTurn(3);
          console.log('Player3 guesses ' + guess + '.')
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.')
        let player3 = computerMove();
          console.log('Player3 throws ' + player3 + '.')
        let sum = parseInt(player1)+parseInt(player2)+parseInt(player3);
         console.log('The total is ' + sum + '. \n')
        if (sum == guess) {
          console.log(whosfirst+' wins the round!');
          winner = whosfirst;
          players.splice(players.indexOf(winner),1);
            // console.log(players);
          let human = 'y';
          return [players[0], human];
        } else {
          console.log('No winner... \n')
          return round1(playerName, playerName);
          }
        };
  };

//second round with 2 players
function round2(array, userName) {
    let whosfirst = array[0];
    let human = array[1];
    if (human === 'y') {
      let players = [userName, 'player2'];
    
      if (whosfirst === userName) {
        let guess = playerTurn();
          console.log('You guessed ' + guess + '.')
        let player1 = playersMove();
          console.log(`${userName} throws ${player1}.`)
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.')
        let sum = parseInt(player1)+parseInt(player2);
          console.log('The total is ' + sum + '. \n')
        if (sum == guess) {
          console.log(`${userName} wins the round!`);
          console.log('Player2 drinks! \n')
          let loser = 'player2';
          return loser;
        } else {
          console.log('No winner... \n');
          return round2(['player2', 'y'],userName);
        }
      };
        
      if (whosfirst === 'player2') {
        let player1 = playersMove();
          console.log(`${userName} throws ${player1}.`)
        let guess = computerTurn(2);
          console.log('Player2 guesses ' + guess + '.')
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.')
        let sum = parseInt(player1)+parseInt(player2);
          console.log('The total is ' + sum + '. \n')
        if (sum == guess) {
          console.log('Player2 wins the round!');
          console.log(`${userName} drinks! \n`);
          let loser = userName;
          return loser;
        } else {
          console.log('No winner... \n');
          return round2([userName, 'y'], userName);
      }
  };
    }
    if (human === 'n') {
      let players = ['player2', 'player3'];
      
      if (whosfirst === 'player2') {
        console.log('Player2 is guessing...');
        let guess = computerTurn(2);
          console.log('Player2 guessed ' + guess + '.');
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.');
        let player3 = computerMove();
          console.log('Player3 throws ' + player3 + '.');
        let sum = parseInt(player2)+parseInt(player3);
          console.log('The total is ' + sum + '. \n');
        if (sum == guess) {
          console.log('Player2 wins the round!');
          console.log('Player3 drinks! \n');
          let loser = 'player3';
          return loser;
        } else {
          console.log('No winner... \n');
          return round2(['player3', 'n'], userName);
        }
      };
      
      if (whosfirst === 'player3') {
        console.log('Player3 is guessing... ');
        let guess = computerTurn(2);
          console.log('Player3 guesses ' + guess + '.');
        let player2 = computerMove();
          console.log('Player2 throws ' + player2 + '.');
        let player3 = computerMove();
          console.log('Player3 throws ' + player3 + '.');
        let sum = parseInt(player2)+parseInt(player3);
          console.log('The total is ' + sum + '. \n');
        if (sum == guess) {
          console.log('Player3 wins the round!');
          console.log('Player2 drinks! \n');
          let loser = 'player2';
          return loser;
        } else {
          console.log('No winner... \n');
          return round2(['player2', 'n'], userName);
          }
        }
      }
  };

//Game control flow
function FiveTensDrinking() {
  let x = prompt('Do you know how to play? <y/n> ');

  //play instruction
  if (x === 'n') {
    HowToPlay();
  } else {
    let player = playerSetUp();

  //start game
  function game(playerName, playerWins, playerLosses) {
    // Round 1
    console.log('\nRound 1')
    console.log('You go first. \n');
    let players = round1(playerName, playerName);

    // Round 2
    console.log('\nRound 2');
    let loser = round2(players, playerName);

    // Play again?
    if (loser === playerName) {
      playerLosses++;
    } else {
      playerWins++;
    }

    console.log(`${playerName}`)
    console.log(`Wins: ${playerWins}`);
    console.log(`Losses: ${playerLosses}\n`)

    let again = prompt('Play again? <y/n> ');
    if (again === 'y') {
      return game(playerName, playerWins, playerLosses);
    } else {
      console.log('Thanks for playing!')
      return '';
    }  
  };
  game(player.Name, player.Wins, player.Losses);
  }
  };

console.log(FiveTensDrinking());