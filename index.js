const Gameboard = (() => {
  const gameboard = Array.from(Array(9));
  const container = document.querySelector('.container');
  let yourTurn = true;
  let totalTurns = 0;

  gameboard.forEach((square, index) => {
    // Insert each array element into the DOM
    square = '';
    const div = document.createElement('div');
    div.id = index;
    div.innerHTML = square;
    container.appendChild(div);
    // Event listener that allows players to mark the gameboard
    div.addEventListener('click', event => {
      if (gameboard[index] === 'X' || gameboard[index] === 'O') {
        return
      } else {
        const index = Number(event.target.id);
        if (yourTurn === true) {
          gameboard[index] = 'X';
          document.querySelector('[id=' + CSS.escape(event.target.id) + ']').innerHTML = 'X';
          yourTurn = false;
          totalTurns++;
          displayWinner();
        } else if (yourTurn === false) {
          gameboard[index] = 'O';
          document.querySelector('[id=' + CSS.escape(event.target.id) + ']').innerHTML = 'O';
          yourTurn = true;
          totalTurns++;
          displayWinner();
        }
      }
    })
  })
  // Function to check for if a player got 3 square in a row
  const checkWinner = (a, b, c) => {
    const firstSquare = gameboard[a];
    const secondSquare = gameboard[b];
    const thirdSquare = gameboard[c];
    if (firstSquare === 'X') {
      if (firstSquare === secondSquare && secondSquare === thirdSquare) {
        return true;
      }
    } else if (firstSquare === 'O') {
      if (firstSquare === secondSquare && secondSquare === thirdSquare) {
        return true;
      }
    }
  }
  // Displays the winner of the game
  const displayWinner = () => {
    const message = document.getElementById('gameOverMessage');
    if (
      checkWinner(0, 1, 2)
      || checkWinner(3, 4, 5)
      || checkWinner(6, 7, 8)
      || checkWinner(0, 3, 6)
      || checkWinner(1, 4, 7)
      || checkWinner(2, 5, 8)
      || checkWinner(0, 4, 8)
      || checkWinner(2, 4, 6)
    ) {
      if(yourTurn === true) {
        message.innerHTML = `Game over! ${player2} wins. Restart game to play again`;
        message.style.display = 'block';
      } else if (yourTurn === false) {
        message.innerHTML = `Game over! ${player1} wins. Restart game to play again`;
        message.style.display = 'block';
      }
    } else if (totalTurns === 9) {
      message.innerHTML = 'Game over! The match is a draw. Restart game to play again';
      message.style.display = 'block';
    }
  }
  const resetGame = () => location.reload();
  return {
    gameboard,
    yourTurn,
    resetGame
  };
})()

let player1 = 'Player 1';
let player2 = 'Player 2';
const getNames = (event) => {
  event.preventDefault();
  player1 = document.getElementById('firstPlayer').value;
  player2 = document.getElementById('secondPlayer').value;
  const form = document.getElementById('names');
  form.reset();
  form.style.display = 'none';
}

