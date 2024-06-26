let mainEl = document.getElementsByTagName("main")[0];
let startingPosition = "r6-c6";
let playerPosition = startingPosition;
let enemyPositions = ["r1-c6", "r2-c3"];
let attackingEnemyIndex;
let gameOver = false;

function endGame (enemyIndex) {
  attackingEnemyIndex= enemyIndex
  gameOver = true 
}


function createTiles() {
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

function placeEnemy1() {
  let startingTile = document.querySelector("." + enemyPositions[0]);
  let dogImg = document.createElement("img");
  dogImg.className = "dogImg " + enemyPositions[0];
  dogImg.src = "./image/doge.png";
  startingTile.append(dogImg);
  startEnemyMovement(".dogImg", "./image/doge.png", 0);
}

placeEnemy1();

function placeEnemy2() {
  let startingTile = document.querySelector("." + enemyPositions[1]);
  let dogImg = document.createElement("img");
  dogImg.className = "dogImg2 " + enemyPositions[1];
  dogImg.src = "./image/doge.png";
  startingTile.append(dogImg);
  startEnemyMovement(".dogImg2", "./image/doge.png", 1);
}

placeEnemy2();

function startEnemyMovement(enemyClass, enemyImgPath, enemyIndex) {
 setTimeout(() => {
    let directions = ["up", "down", "left", "right"];
    let directionSelected = directions[Math.floor(Math.random() * 4)];
    console.log(directionSelected);
    if (gameOver) {
      return
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
      return
    }
    startEnemyMovement(enemyClass, enemyImgPath, enemyIndex);
  }, 2000);
}

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
  if (gameOver) {
    return;
  }
  if (evt.keyCode === 38) {
    moveUp();
  } else if (evt.keyCode === 40) {
    moveDown();
  } else if (evt.keyCode === 37) {
    moveLeft();
  } else if (evt.keyCode === 39) {
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
      console.log("LOOOOOOOSE");
      endGame(enemyIndex)
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src = attackingEnemyIndex === enemyIndex ? "./image/dogeAttack.png" : enemyImgPath;
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
      console.log("LOOOOOOOSE");
      endGame(enemyIndex)
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src = attackingEnemyIndex === enemyIndex ? "./image/dogeAttack.png" : enemyImgPath;
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
      console.log("LOOOOOOOSE");
      endGame(enemyIndex)
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src = attackingEnemyIndex === enemyIndex ? "./image/dogeAttack.png" : enemyImgPath;
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
      console.log("LOOOOOOOSE");
      endGame(enemyIndex)
    }
    enemyImg.remove();
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className = enemyClass.substring(1) + " " + newPosition;
    newEnemyImg.src = attackingEnemyIndex === enemyIndex ? "./image/dogeAttack.png" : enemyImgPath;
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
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOO");
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
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOO");
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
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOO");
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
      console.log("NOOOOOOOOOOOOOOOOOOOOOOOOO");
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
