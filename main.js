"use strict";

const gameStatus = document.querySelector(".game_status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winnerMessage = () => `${currentPlayer} has Won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

gameStatus.innerHTML = currentPlayerTurn();

const winningRules = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handlerBlockUsed(clickedBlock, clickedBlockIndex) {
  gameState[clickedBlockIndex] = currentPlayer;
  clickedBlock.innerHTML = currentPlayer;
}

function handlerPlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerHTML = currentPlayerTurn();
}

function handlerResultValidate() {
  let won = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningRules[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      won = true;
      break;
    }
  }

  if (won) {
    gameStatus.innerHTML = winnerMessage();
    gameActive = false;
    return;
  }

  let draw = !gameState.includes("");
  if (draw) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlerPlayerChange();
}

function handlerBlockClick(clickedBlockEvent) {
  const clickedBlock = clickedBlockEvent.target;
  const clickedBlockIndex = parseInt(
    clickedBlock.getAttribute("data-block-index")
  );

  if (gameState[clickedBlockIndex] !== "" || !gameActive) {
    return;
  }

  handlerBlockUsed(clickedBlock, clickedBlockIndex);
  handlerResultValidate();
}

function handlerRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = currentPlayerTurn();
  document
    .querySelectorAll(".block")
    .forEach((block) => (block.innerHTML = ""));
}

document
  .querySelectorAll(".block")
  .forEach((block) => block.addEventListener("click", handlerBlockClick));

document
  .querySelector(".game_restart")
  .addEventListener("click", handlerRestartGame);
