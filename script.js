const board = document.getElementById('game-board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.textContent = cell;
    if (cell === 'X') div.classList.add('x');
    if (cell === 'O') div.classList.add('o');
    div.addEventListener('click', handleMove);
    board.appendChild(div);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  updateBoard();

  const winner = checkWinner();
  if (winner) {
    status.textContent = `Player ${currentPlayer} wins!`;
    highlightWinner(winner);
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function updateBoard() {
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach((cell, index) => {
    cell.textContent = cells[index];
    cell.classList.remove('x', 'o');
    if (cells[index] === 'X') cell.classList.add('x');
    if (cells[index] === 'O') cell.classList.add('o');
  });
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWinner(pattern) {
  pattern.forEach(i => {
    document.querySelectorAll('.cell')[i].classList.add('winning');
  });
}

restartBtn.addEventListener('click', () => {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = "Player X's turn";
  createBoard();
});

createBoard();
