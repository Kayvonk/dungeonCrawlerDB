let mainEl = document.getElementsByTagName("main")[0];
let startingPosition = "r6-c6";
let playerPosition = startingPosition;
let enemyPositions = [];
let attackingEnemyIndex;
let gameOver = false;
let exitTilePosition;
let exitDirection;
let round = 0;
let possibleEnemyPositions = [];
let seconds = 0;

function calculateScore() {
  let baseScore = round * 200;

  let timeScore = Math.round((1 / seconds) * 1000);

  let scoreDiv = document.getElementById("results");
  scoreDiv.style.display = "flex";
  scoreDiv.textContent = "Score:" + (baseScore + timeScore);
}

let secondsTimer = setInterval(() => {
  if (gameOver) {
    clearInterval(secondsTimer);
    return calculateScore();
  }
  seconds++;
}, 1000);

function loseGame(enemyIndex) {
  attackingEnemyIndex = enemyIndex;
  gameOver = true;
}

function winGame() {
  gameOver = true;
}

function displayRound() {
  if (document.getElementById("roundCounter")) {
    document.getElementById("roundCounter").textContent =
      "Round : " + (round + 1);
  } else {
    let headerEl = document.getElementsByTagName("footer")[0];
    let roundDiv = document.createElement("p");
    roundDiv.setAttribute("id", "roundCounter");
    roundDiv.textContent = "Round : " + (round + 1);
    headerEl.append(roundDiv);
  }
}
displayRound();

function endRound() {
  if (round + 1 === 10) {
    return winGame();
  }
  mainEl.innerHTML = "";
  enemyPositions = [];
  round++;
  createTiles();
  placePlayer1();
  displayRound();
  for (let i = 0; i < round + 1; i++) {
    let newEnemyPosition =
      possibleEnemyPositions[
        Math.floor(Math.random() * possibleEnemyPositions.length)
      ];
    enemyPositions.push(newEnemyPosition);
    possibleEnemyPositions = possibleEnemyPositions.filter(
      (position) => position !== newEnemyPosition
    );
    placeEnemy(i);
  }
}

function createTiles() {
  let exitGroup = ["r1", "r6", "c1", "c12"];
  let selectedExit;
  let exitClass;
  let exitGroupSelection = exitGroup[Math.floor(Math.random() * 4)];
  if (exitGroupSelection === "r1") {
    let possiblePositions = [
      "r1-c1",
      "r1-c2",
      "r1-c3",
      "r1-c4",
      "r1-c5",
      "r1-c6",
      "r1-c7",
      "r1-c8",
      "r1-c9",
      "r1-c10",
      "r1-c11",
      "r1-c12",
    ];
    selectedExit =
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    exitClass = "exitTop";
  }
  if (exitGroupSelection === "r6") {
    let possiblePositions = [
      "r6-c1",
      "r6-c2",
      "r6-c3",
      "r6-c4",
      "r6-c5",
      "r6-c6",
      "r6-c7",
      "r6-c8",
      "r6-c9",
      "r6-c10",
      "r6-c11",
      "r6-c12",
    ];
    selectedExit =
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    exitClass = "exitBottom";
  }
  if (exitGroupSelection === "c1") {
    let possiblePositions = [
      "r6-c1",
      "r5-c1",
      "r4-c1",
      "r3-c1",
      "r2-c1",
      "r1-c1",
    ];
    selectedExit =
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    exitClass = "exitLeft";
  }
  if (exitGroupSelection === "c12") {
    let possiblePositions = [
      "r6-c12",
      "r5-c12",
      "r4-c12",
      "r3-c12",
      "r2-c12",
      "r1-c12",
    ];
    selectedExit =
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    exitClass = "exitRight";
  }
  for (let index = 1; index <= 72; index++) {
    let tile = document.createElement("div");

    if (index <= 12) {
      tile.className = "tile r1-c" + index;
    } else if (index <= 24) {
      tile.className = "tile r2-c" + (index - 12);
    } else if (index <= 36) {
      tile.className = "tile r3-c" + (index - 24);
    } else if (index <= 48) {
      tile.className = "tile r4-c" + (index - 36);
    } else if (index <= 60) {
      tile.className = "tile r5-c" + (index - 48);
    } else if (index <= 72) {
      tile.className = "tile r6-c" + (index - 60);
    }
    let tilePosition = tile.classList[1];
    let row = tilePosition.split("-")[0].substring(1);
    let column = tilePosition.split("-")[1].substring(1);
    if (row < 5) {
      possibleEnemyPositions.push(tilePosition);
    }

    if (row === "1") {
      let wall = document.createElement("div");
      wall.className = "wall wallTop";
      tile.append(wall);
    }
    if (row === "6") {
      let wall = document.createElement("div");
      wall.className = "wall wallBottom";
      tile.append(wall);
    }
    if (column === "1") {
      let wall = document.createElement("div");
      wall.className = "wall wallLeft";
      tile.append(wall);
    }
    if (column === "12") {
      let wall = document.createElement("div");
      wall.className = "wall wallRight";
      tile.append(wall);
    }
    if (tilePosition === selectedExit) {
      exitTilePosition = tilePosition;
      exitDirection = exitClass;
      let exitTile = document.createElement("div");
      exitTile.className = "exitDoor " + exitClass;
      tile.append(exitTile);
      tile.setAttribute("id", "exit");
    }

    mainEl.append(tile);
  }
}

createTiles();

function placePlayer1() {
  let startingTile = document.querySelector("." + startingPosition);
  let catImg = document.createElement("img");
  catImg.className = "catImg " + startingPosition;
  catImg.src = "./image/cat.png";
  startingTile.append(catImg);
}

placePlayer1();

function placeEnemy(index) {
  let startingTile = document.querySelector("." + enemyPositions[index]);
  let dogImg = document.createElement("img");
  dogImg.className = "dogImg" + index + " " + enemyPositions[index];
  dogImg.src = "./image/doge.png";
  startingTile.append(dogImg);
  startEnemyMovement(".dogImg" + index, "./image/doge.png", index);
}

let newEnemyPosition =
  possibleEnemyPositions[
    Math.floor(Math.random() * possibleEnemyPositions.length)
  ];
enemyPositions.push(newEnemyPosition);
possibleEnemyPositions = possibleEnemyPositions.filter(
  (position) => position !== newEnemyPosition
);
placeEnemy(0);

function startEnemyMovement(enemyClass, enemyImgPath, enemyIndex) {
  const currentRound = round;
  let enemyTimer = setTimeout(() => {
    if (currentRound !== round) {
      clearTimeout(enemyTimer);
      return;
    }
    let directions = ["up", "down", "left", "right"];
    let directionSelected = directions[Math.floor(Math.random() * 4)];
    if (gameOver) {
      return;
    }
    if (directionSelected === "up") {
      enemyMoveUp(enemyClass, enemyImgPath, enemyIndex);
    } else if (directionSelected === "down") {
      enemyMoveDown(enemyClass, enemyImgPath, enemyIndex);
    } else if (directionSelected === "left") {
      enemyMoveLeft(enemyClass, enemyImgPath, enemyIndex);
    } else if (directionSelected === "right") {
      enemyMoveRight(enemyClass, enemyImgPath, enemyIndex);
    }
    if (gameOver) {
      return;
    }
    startEnemyMovement(enemyClass, enemyImgPath, enemyIndex);
  }, 500 / ((round + 1) / 2));
}

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
  if (gameOver) {
    return;
  }
  if (evt.keyCode === 38) {
    if (exitDirection === "exitTop" && playerPosition === exitTilePosition) {
      endRound();
    }
    moveUp();
  } else if (evt.keyCode === 40) {
    if (exitDirection === "exitBottom" && playerPosition === exitTilePosition) {
      endRound();
    }
    moveDown();
  } else if (evt.keyCode === 37) {
    if (exitDirection === "exitLeft" && playerPosition === exitTilePosition) {
      endRound();
    }
    moveLeft();
  } else if (evt.keyCode === 39) {
    if (exitDirection === "exitRight" && playerPosition === exitTilePosition) {
      endRound();
    }
    moveRight();
  }
}

function enemyMoveUp(enemyClass, enemyImgPath, enemyIndex) {
  let enemyImg = document.querySelector(enemyClass);
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;
    enemyPositions[enemyIndex] = newPosition;
    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newEnemyImg);
  }
}

function enemyMoveDown(enemyClass, enemyImgPath, enemyIndex) {
  let enemyImg = document.querySelector(enemyClass);
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row < 6) {
    let newPosition = "r" + (parseInt(row) + 1) + "-c" + column;
    enemyPositions[enemyIndex] = newPosition;
    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newEnemyImg);
  }
}

function enemyMoveLeft(enemyClass, enemyImgPath, enemyIndex) {
  let enemyImg = document.querySelector(enemyClass);
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column > 1) {
    let newPosition = "r" + row + "-c" + (parseInt(column) - 1);
    enemyPositions[enemyIndex] = newPosition;
    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newEnemyImg);
  }
}

function enemyMoveRight(enemyClass, enemyImgPath, enemyIndex) {
  let enemyImg = document.querySelector(enemyClass);
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column < 12) {
    let newPosition = "r" + row + "-c" + (parseInt(column) + 1);
    enemyPositions[enemyIndex] = newPosition;
    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newEnemyImg);
  }
}

function moveUp() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;
    if (enemyPositions.includes(newPosition)) {
      return;
    }
    playerPosition = newPosition;
    catImg.remove();
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    newCatImg.src = "./image/cat.png";
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newCatImg);
  }
}

function moveDown() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row < 6) {
    let newPosition = "r" + (parseInt(row) + 1) + "-c" + column;
    if (enemyPositions.includes(newPosition)) {
      return;
    }
    playerPosition = newPosition;
    catImg.remove();
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    newCatImg.src = "./image/cat.png";
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newCatImg);
  }
}
function moveLeft() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (column > 1) {
    let newPosition = "r" + row + "-c" + (parseInt(column) - 1);
    if (enemyPositions.includes(newPosition)) {
      return;
    }
    playerPosition = newPosition;
    catImg.remove();
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    newCatImg.src = "./image/cat.png";
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newCatImg);
  }
}

function moveRight() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (column < 12) {
    let newPosition = "r" + row + "-c" + (parseInt(column) + 1);
    if (enemyPositions.includes(newPosition)) {
      return;
    }
    playerPosition = newPosition;
    catImg.remove();
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    newCatImg.src = "./image/cat.png";
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newCatImg);
  }
}
