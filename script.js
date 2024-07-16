let mainEl = document.getElementsByTagName("main")[0];
let startBtn = document.getElementById("start");

let startingPosition = "r6-c6";
let playerPosition = startingPosition;
let playerDirection;
let playerEnterDirection;
let enemyPositions = [];
let boulderPositions = [];
let treePositions = [];
let attackingEnemyIndex;
let gameOver = false;
let exitTilePosition;
let exitDirection;
let caveEntrancePosition = "r1-c6";
let towerEntrancePosition = "r1-c7";
let scene1ExitTilePosition = "r3-c1";
let scene2ExitTilePosition = "r3-c12";
let caveExitPosition = "r6-c6";
let round = 0;
let possibleEnemyPositions = [];
let seconds = 0;
let gameStarted = false;
let canMove = false;
let isCave = false;
let isOutdoor1 = true;
let isOutdoor2 = false;
let swordPosition = "r3-c6";
let swordAcquired = false;
let boulderDestroyed = false;
let lives = 9;
let slayedEnemies = [];
let isBossRound = false;
startBtn.addEventListener("click", startPrologue);

// ------------------start prologue --------------------------

function startPrologue() {
  gameStarted = true;
  let header = document.getElementsByTagName("header")[0];
  let swordTop = document.getElementById("swordTopLogo");
  let swordCircle = document.getElementById("swordCircle");
  let gameMenu = document.getElementById("gameMenu");
  header.classList.add("fadeOut");
  startBtn.classList.add("fadeOut");
  setTimeout(() => {
    swordTop.classList.add("fadeOut");
    swordCircle.classList.add("fadeOut");
  }, 1500);
  setTimeout(() => {
    gameMenu.classList.add("fadeOut");
  }, 3000);
  setTimeout(() => {
    gameMenu.classList.add("remove");
  }, 4000);
  setTimeout(() => {
    canMove = true;
  }, 4000);
}

function createOutdoorScene1Tiles() {
  let dirtTiles = [
    "r6-c6",
    "r5-c6",
    "r4-c6",
    "r3-c6",
    "r2-c6",
    "r1-c6",
    "r3-c1",
    "r3-c2",
    "r3-c3",
    "r3-c4",
    "r3-c5",
    "r3-c6",
  ];
  let treeTiles = ["r2-c8", "r3-c11", "r5-c10", "r4-c8"];

  for (let index = 1; index <= 72; index++) {
    let outDoorTile = document.createElement("div");
    if (index <= 12) {
      if (dirtTiles.includes("r1-c" + index)) {
        outDoorTile.className = "dirtTile r1-c" + index;
      } else {
        if (treeTiles.includes("r1-c" + index)) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r1-c" + index);
          outDoorTile.className = "grassTile r1-c" + index;
        } else {
          outDoorTile.className = "grassTile r1-c" + index;
        }
      }
    } else if (index <= 24) {
      if (dirtTiles.includes("r2-c" + (index - 12))) {
        outDoorTile.className = "dirtTile r2-c" + (index - 12);
      } else {
        if (treeTiles.includes("r2-c" + (index - 12))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r2-c" + (index - 12));
          outDoorTile.className = "grassTile r2-c" + (index - 12);
        } else {
          outDoorTile.className = "grassTile r2-c" + (index - 12);
        }
      }
    } else if (index <= 36) {
      if (dirtTiles.includes("r3-c" + (index - 24))) {
        if ("r3-c" + (index - 24) === "r3-c1" && !boulderDestroyed) {
          boulderPositions.push("r3-c1");
          outDoorTile.className = "dirtTile r3-c" + (index - 24);
          let boulderShadow = document.createElement("div");
          boulderShadow.className = "boulderShadow boulderShadow-r3-c1";
          let terrianBoulder = document.createElement("img");
          terrianBoulder.className = "terrianBoulder boulder-r3-c1";
          terrianBoulder.src = "./image/boulder.png";
          outDoorTile.append(boulderShadow);
          outDoorTile.append(terrianBoulder);
        } else {
          outDoorTile.className = "dirtTile r3-c" + (index - 24);
        }
      } else {
        if (treeTiles.includes("r3-c" + (index - 24))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r3-c" + (index - 24));
          outDoorTile.className = "grassTile r3-c" + (index - 24);
        } else {
          outDoorTile.className = "grassTile r3-c" + (index - 24);
        }
      }
    } else if (index <= 48) {
      if (dirtTiles.includes("r4-c" + (index - 36))) {
        outDoorTile.className = "dirtTile r4-c" + (index - 36);
      } else {
        if (treeTiles.includes("r4-c" + (index - 36))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r4-c" + (index - 36));
          outDoorTile.className = "grassTile r4-c" + (index - 36);
        } else {
          outDoorTile.className = "grassTile r4-c" + (index - 36);
        }
      }
    } else if (index <= 60) {
      if (dirtTiles.includes("r5-c" + (index - 48))) {
        outDoorTile.className = "dirtTile r5-c" + (index - 48);
      } else {
        if (treeTiles.includes("r5-c" + (index - 48))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r5-c" + (index - 48));
          outDoorTile.className = "grassTile r5-c" + (index - 48);
        } else {
          outDoorTile.className = "grassTile r5-c" + (index - 48);
        }
      }
    } else if (index <= 72) {
      if (dirtTiles.includes("r6-c" + (index - 60))) {
        outDoorTile.className = "dirtTile r6-c" + (index - 60);
      } else {
        if (treeTiles.includes("r6-c" + (index - 60))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r6-c" + (index - 60));
          outDoorTile.className = "grassTile r6-c" + (index - 60);
        } else {
          outDoorTile.className = "grassTile r6-c" + (index - 60);
        }
      }
    }
    let outDoorTilePosition = outDoorTile.classList[1];
    let row = outDoorTilePosition.split("-")[0].substring(1);
    let column = outDoorTilePosition.split("-")[1].substring(1);

    if (row === "1") {
      let wall = document.createElement("div");
      if (column === "6") {
        // cave entrace
        wall.className = "caveEntrance wallTop";
      } else {
        wall.className = "caveWall wallTop";
      }
      outDoorTile.append(wall);
    }
    if (row === "6") {
      let wall = document.createElement("div");
      let treeImg = document.createElement("img");
      treeImg.className = "tree";
      treeImg.src = "./image/tree.png";
      wall.append(treeImg);
      wall.className = "outdoorWall wallBottom";
      outDoorTile.append(wall);
    }
    if (column === "1") {
      let wall = document.createElement("div");
      if (row === "3") {
        //exit after cave
        wall.className = "outdoorDirtPath wallLeft";
      } else {
        let treeImg = document.createElement("img");
        treeImg.className = "tree";
        treeImg.src = "./image/tree.png";
        wall.append(treeImg);
        wall.className = "outdoorWall wallLeft";
      }
      outDoorTile.append(wall);
    }
    if (column === "12") {
      let wall = document.createElement("div");
      let treeImg = document.createElement("img");
      treeImg.className = "tree";
      treeImg.src = "./image/tree.png";
      wall.append(treeImg);
      wall.className = "outdoorWall wallRight";
      outDoorTile.append(wall);
    }
    mainEl.append(outDoorTile);
  }
  placePlayer1();
}

// delayed to avoid interference with start screen animation
setTimeout(() => {
  createOutdoorScene1Tiles();
}, 2000);

function enterCave() {
  startingPosition = "r6-c6";
  mainEl.innerHTML = "";
  isCave = true;
  isOutdoor1 = false;
  boulderPositions = [];
  treePositions = [];
  createCaveTiles();
}

function createCaveTiles() {
  for (let index = 1; index <= 72; index++) {
    let caveTile = document.createElement("div");

    if (index <= 12) {
      caveTile.className = "stoneTile r1-c" + index;
    } else if (index <= 24) {
      if (index - 12 === 3 || index - 12 === 9) {
        let fireImg = document.createElement("img");
        fireImg.className = "fire";
        fireImg.src = "./image/fire.png";
        caveTile.append(fireImg);
        caveTile.className = "stoneTile r2-c" + (index - 12);
      } else if (index - 12 === 6) {
        let oldCatImg = document.createElement("img");
        oldCatImg.className = "oldCat";
        oldCatImg.src = "./image/oldCat.png";
        caveTile.append(oldCatImg);

        introduceOldCat(caveTile);

        caveTile.className = "stoneTile r2-c" + (index - 12);
      } else {
        caveTile.className = "stoneTile r2-c" + (index - 12);
      }
    } else if (index <= 36) {
      if (index - 24 === 6) {
        if (!swordAcquired) {
          let swordTopImg = document.createElement("img");
          swordTopImg.className = "swordTop";
          swordTopImg.src = "./image/swordtop.png";
          caveTile.append(swordTopImg);
        }
        caveTile.className = "stoneTile r3-c" + (index - 24);
      } else {
        caveTile.className = "stoneTile r3-c" + (index - 24);
      }
    } else if (index <= 48) {
      caveTile.className = "stoneTile r4-c" + (index - 36);
    } else if (index <= 60) {
      caveTile.className = "stoneTile r5-c" + (index - 48);
    } else if (index <= 72) {
      caveTile.className = "stoneTile r6-c" + (index - 60);
    }
    let caveTilePosition = caveTile.classList[1];
    let row = caveTilePosition.split("-")[0].substring(1);
    let column = caveTilePosition.split("-")[1].substring(1);
    // let isDirtTile = dirtTiles.includes(caveTilePosition)

    if (row === "1") {
      let wall = document.createElement("div");
      wall.className = "caveWall wallTop";
      caveTile.append(wall);
    }
    if (row === "6") {
      let wall = document.createElement("div");

      if (column === "6") {
        wall.className = "caveExit wallBottom";
      } else {
        wall.className = "caveWall wallBottom";
      }
      caveTile.append(wall);
    }
    if (column === "1") {
      let wall = document.createElement("div");
      wall.className = "caveWall wallLeft";
      caveTile.append(wall);
    }
    if (column === "12") {
      let wall = document.createElement("div");
      wall.className = "caveWall wallRight";
      caveTile.append(wall);
    }

    // if (tilePosition === selectedExit) {
    //   exitTilePosition = tilePosition;
    //   exitDirection = exitClass;
    //   let exitTile = document.createElement("div");
    //   exitTile.className = round === 0 ? exitClass : "exitDoor " + exitClass;
    //   exitTile.setAttribute("id", "exitTile");
    //   tile.append(exitTile);
    //   tile.setAttribute("id", "exit");
    // }

    mainEl.append(caveTile);
  }
  placePlayer1();
}

function exitCave() {
  isCave = false;
  isOutdoor1 = true;
  mainEl.innerHTML = "";
  startingPosition = "r1-c6";
  createOutdoorScene1Tiles();
}

function enterOutdoorScene2() {
  isOutdoor1 = false;
  isOutdoor2 = true;
  boulderPositions = [];
  treePositions = [];
  mainEl.innerHTML = "";
  startingPosition = "r3-c12";
  createOutdoorScene2Tiles();
}

function createOutdoorScene2Tiles() {
  let dirtTiles = [
    "r1-c7",
    "r2-c7",
    "r3-c7",
    "r3-c8",
    "r3-c9",
    "r3-c10",
    "r3-c11",
    "r3-c12",
  ];
  let treeTiles = [
    "r2-c2",
    "r3-c4",
    "r5-c3",
    "r5-c5",
    "r6-c7",
    "r5-c9",
    "r5-c11",
  ];
  for (let index = 1; index <= 72; index++) {
    let outDoorTile = document.createElement("div");

    if (index <= 12) {
      if (dirtTiles.includes("r1-c" + index)) {
        outDoorTile.className = "dirtTile r1-c" + index;
      } else {
        if (treeTiles.includes("r1-c" + index)) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r1-c" + index);
          outDoorTile.className = "grassTile r1-c" + index;
        } else {
          outDoorTile.className = "grassTile r1-c" + index;
        }
      }
    } else if (index <= 24) {
      if (dirtTiles.includes("r2-c" + (index - 12))) {
        outDoorTile.className = "dirtTile r2-c" + (index - 12);
      } else {
        if (treeTiles.includes("r2-c" + (index - 12))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r2-c" + (index - 12));
          outDoorTile.className = "grassTile r2-c" + (index - 12);
        } else {
          outDoorTile.className = "grassTile r2-c" + (index - 12);
        }
      }
    } else if (index <= 36) {
      if (dirtTiles.includes("r3-c" + (index - 24))) {
        if ("r3-c" + (index - 24) === "r3-c1" && !boulderDestroyed) {
          boulderPositions.push("r3-c1");
          outDoorTile.className = "dirtTile r3-c" + (index - 24);
          let terrianBoulder = document.createElement("img");
          terrianBoulder.className = "terrianBoulder boulder-r3-c1";
          terrianBoulder.src = "./image/boulder.png";
          outDoorTile.append(terrianBoulder);
        } else {
          outDoorTile.className = "dirtTile r3-c" + (index - 24);
        }
      } else {
        if (treeTiles.includes("r3-c" + (index - 24))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r3-c" + (index - 24));
          outDoorTile.className = "grassTile r3-c" + (index - 24);
        } else {
          outDoorTile.className = "grassTile r3-c" + (index - 24);
        }
      }
    } else if (index <= 48) {
      if (dirtTiles.includes("r4-c" + (index - 36))) {
        outDoorTile.className = "dirtTile r4-c" + (index - 36);
      } else {
        if (treeTiles.includes("r4-c" + (index - 36))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r4-c" + (index - 36));
          outDoorTile.className = "grassTile r4-c" + (index - 36);
        } else {
          outDoorTile.className = "grassTile r4-c" + (index - 36);
        }
      }
    } else if (index <= 60) {
      if (dirtTiles.includes("r5-c" + (index - 48))) {
        outDoorTile.className = "dirtTile r5-c" + (index - 48);
      } else {
        if (treeTiles.includes("r5-c" + (index - 48))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r5-c" + (index - 48));
          outDoorTile.className = "grassTile r5-c" + (index - 48);
        } else {
          outDoorTile.className = "grassTile r5-c" + (index - 48);
        }
      }
    } else if (index <= 72) {
      if (dirtTiles.includes("r6-c" + (index - 60))) {
        outDoorTile.className = "dirtTile r6-c" + (index - 60);
      } else {
        if (treeTiles.includes("r6-c" + (index - 60))) {
          let treeImg = document.createElement("img");
          treeImg.className = "tree";
          treeImg.src = "./image/tree.png";
          outDoorTile.append(treeImg);
          treePositions.push("r6-c" + (index - 60));
          outDoorTile.className = "grassTile r6-c" + (index - 60);
        } else {
          outDoorTile.className = "grassTile r6-c" + (index - 60);
        }
      }
    }
    let outDoorTilePosition = outDoorTile.classList[1];
    let row = outDoorTilePosition.split("-")[0].substring(1);
    let column = outDoorTilePosition.split("-")[1].substring(1);
    // let isDirtTile = dirtTiles.includes(outDoorTilePosition)

    if (row === "1") {
      let wall = document.createElement("div");
      if (column === "7") {
        // tower entrace
        wall.className = "towerEntrance wallTop";
      } else {
        wall.className = "wall wallTop";
      }
      outDoorTile.append(wall);
    }
    if (row === "6") {
      let wall = document.createElement("div");
      let treeImg = document.createElement("img");
      treeImg.className = "tree";
      treeImg.src = "./image/tree.png";
      wall.append(treeImg);
      wall.className = "outdoorWall wallBottom";
      outDoorTile.append(wall);
    }
    if (column === "1") {
      let wall = document.createElement("div");
      let treeImg = document.createElement("img");
      treeImg.className = "tree";
      treeImg.src = "./image/tree.png";
      wall.append(treeImg);
      wall.className = "outdoorWall wallLeft";
      outDoorTile.append(wall);
    }
    if (column === "12") {
      let wall = document.createElement("div");
      if (row === "3") {
        //return to scene1
        wall.className = "outdoorDirtPath wallRight";
      } else {
        let treeImg = document.createElement("img");
        treeImg.className = "tree";
        treeImg.src = "./image/tree.png";
        wall.append(treeImg);
        wall.className = "outdoorWall wallRight";
      }
      outDoorTile.append(wall);
    }
    mainEl.append(outDoorTile);
  }
  placePlayer1();
}

function exitOutDoorScene2() {
  isOutdoor1 = true;
  isOutdoor2 = false;
  mainEl.innerHTML = "";
  startingPosition = "r3-c1";
  createOutdoorScene1Tiles();
}

// ------------------ end prologue-----------------------

let highScore = parseFloat(localStorage.getItem("highscore")) || 0;

let boulderTimer;
let secondsTimer;

let buffDogeIndexes = [4, 8];

function limitMovement() {
  canMove = false;
  setTimeout(() => {
    canMove = true;
  }, 100);
}

function dropBoulder(enemyIndex) {
  let selectedPosition = playerPosition;
  boulderPositions.push(selectedPosition);
  let selectedTile = document.querySelector("." + selectedPosition);

  let boulderShadow = document.createElement("div");
  boulderShadow.className = "boulderShadow boulderShadow-" + playerPosition;

  let boulder = document.createElement("img");
  boulder.className = "boulder boulder-" + playerPosition;
  boulder.src = "./image/boulder.png";

  selectedTile.append(boulderShadow);
  selectedTile.append(boulder);
  setTimeout(() => {
    if (selectedPosition === playerPosition) {
      return loseGame(enemyIndex);
    }
  }, 1000);
}

function enterTower() {
  isOutdoor2 = false;
  mainEl.innerHTML = "";
  playerEnterDirection = "bottom";
  startingPosition = "r6-c7";
  boulderPositions = [];
  treePositions = [];
  createTiles();
  startTower();
  placePlayer1();
}

function startTower() {
  const currentRound = round;

  // gameStarted = true;
  // startBtn.style.display = "none";
  secondsTimer = setInterval(() => {
    if (gameOver) {
      clearInterval(secondsTimer);
      return calculateScore();
    }
    seconds++;
  }, 1000);
  // displayRound();
  let newEnemyPosition =
    possibleEnemyPositions[
      Math.floor(Math.random() * possibleEnemyPositions.length)
    ];
  let enemyObj = {
    position: newEnemyPosition,
    enemyClass: "dogImg-0",
    isAlive: true,
    isMoving: false,
  };
  enemyPositions.push(enemyObj);
  possibleEnemyPositions = possibleEnemyPositions.filter(
    (position) => position !== newEnemyPosition
  );
  placeEnemy(0);

  // let exitTile = document.getElementById("exitTile");
  // exitTile.classList.add("exitDoor");
}

function restartRound() {
  lives--;
  playerPosition = startingPosition;
  gameStarted = true;

  clearInterval(boulderTimer);
  clearInterval(secondsTimer);

  // seconds = 0;
  secondsTimer = setInterval(() => {
    if (gameOver) {
      clearInterval(secondsTimer);
      return calculateScore();
    }
    seconds++;
  }, 1000);

  let scoreDiv = document.getElementById("results");
  scoreDiv.style.display = "none";
  attackingEnemyIndex = null;
  round--;
  gameOver = false;
  endRound();
  // let exitTile = document.getElementById("exitTile");
  // exitTile.classList.add("exitDoor");
}

function calculateScore() {
  let baseScore = (round + 1) * 1000;

  let timeScore = Math.ceil((1 / seconds) * 10000) + 100;

  let finalScore = baseScore + timeScore;
  if (isFinite(finalScore) && finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("highscore", finalScore);
  }

  let scoreDiv = document.getElementById("results");
  scoreDiv.style.display = "flex";
  scoreDiv.style.fontFamily = "Arial";
  //   scoreDiv.innerHTML = `
  //   <h2>${typeof attackingEnemyIndex === "number" ? "You lose" : "You win"} </h2>
  //   <p>High Score: ${highScore}</p>
  //   <p>Score: ${finalScore}</p>
  //   <p>Time: ${seconds} seconds</p>
  // `
  scoreDiv.innerHTML = `
 <h2>${typeof attackingEnemyIndex === "number" ? "Game Over" : "You win"} </h2>
 <p>Lives remaining: ${lives}</p>
`;
  if (lives > 0) {
    let continueBtn = document.createElement("button");
    continueBtn.setAttribute("id", "continue");
    continueBtn.textContent = "Continue";
    scoreDiv.append(continueBtn);
    continueBtn.addEventListener("click", restartRound);
  } else {
    let restartBtn = document.createElement("button");
    restartBtn.setAttribute("id", "restart");
    restartBtn.textContent = "restart";
    scoreDiv.append(restartBtn);
    restartBtn.addEventListener("click", restartGame);
  }
}

function restartGame() {
  location.reload();
}

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
    roundDiv.style.display = "flex";
    headerEl.append(roundDiv);
  }
}

function endRound() {
  // if (round + 1 === 10) {
  if (round + 1 === 1) {
    return startBoss();
    // return winGame();
  }
  mainEl.innerHTML = "";
  enemyPositions = [];
  boulderPositions = [];
  treePositions = [];
  round++;
  createTiles();
  placePlayer1();
  // displayRound();
  for (let i = 0; i < round + 1; i++) {
    let newEnemyPosition =
      possibleEnemyPositions[
        Math.floor(Math.random() * possibleEnemyPositions.length)
      ];
    let enemyObj = {
      position: newEnemyPosition,
      enemyClass: "dogImg-" + i,
      isAlive: true,
      isMoving: false,
    };
    enemyPositions.push(enemyObj);
    possibleEnemyPositions = possibleEnemyPositions.filter(
      (position) => position !== newEnemyPosition
    );
    placeEnemy(i);
  }
}

function createTiles() {
  let playerRow = playerPosition.split("-")[0].substring(1);
  let playerColumn = playerPosition.split("-")[1].substring(1);
  if (playerRow === "1") {
    playerEnterDirection = "top";
  } else if (playerRow === "6") {
    playerEnterDirection = "bottom";
  } else if (playerColumn === "1") {
    playerEnterDirection = "left";
  } else if (playerColumn === "12") {
    playerEnterDirection = "right";
  }

  let exitGroup = [];
  if (playerEnterDirection === "bottom") {
    exitGroup = ["r1", "c1", "c12"];
  }
  if (playerEnterDirection === "top") {
    exitGroup = ["r6", "c1", "c12"];
  }
  if (playerEnterDirection === "left") {
    exitGroup = ["r1", "r6", "c12"];
  }
  if (playerEnterDirection === "right") {
    exitGroup = ["r1", "r6", "c1"];
  }

  let selectedExit;
  let exitClass;
  possibleEnemyPositions = [];
  let exitGroupSelection = exitGroup[Math.floor(Math.random() * 3)];
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
    let possiblePositions = ["r4-c1", "r3-c1", "r2-c1", "r1-c1"];
    selectedExit =
      possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    exitClass = "exitLeft";
  }
  if (exitGroupSelection === "c12") {
    let possiblePositions = ["r4-c12", "r3-c12", "r2-c12", "r1-c12"];
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
    // adjust here to change enemy spawn locations
    if (playerEnterDirection === "top") {
      if (row > 2) {
        possibleEnemyPositions.push(tilePosition);
      }
    } else if (playerEnterDirection === "bottom") {
      if (row < 5) {
        possibleEnemyPositions.push(tilePosition);
      }
    } else if (playerEnterDirection === "left") {
      if (column > 2) {
        possibleEnemyPositions.push(tilePosition);
      }
    } else if (playerEnterDirection === "right") {
      if (column < 11) {
        possibleEnemyPositions.push(tilePosition);
      }
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
    if (tilePosition === selectedExit && !isBossRound) {
      exitTilePosition = tilePosition;
      exitDirection = exitClass;

      let exitTile = document.createElement("img");
      exitTile.src = "./image/redSigil.png";
      exitTile.className = "exitDoor";
      exitTile.setAttribute("id", "exitTile");
      tile.append(exitTile);
      // exitTile.className = round === 0 ? exitClass : "exitDoor " + exitClass;
      // tile.setAttribute("id", "exit");
    }

    mainEl.append(tile);
  }
}

// createTiles();

//------------- player logic------------
function placePlayer1() {
  let startingTile = document.querySelector("." + startingPosition);
  let catImg = document.createElement("img");
  catImg.className = "catImg " + startingPosition;
  catImg.src = "./image/cat.png";
  startingTile.append(catImg);
}

function swingSword() {
  let row = playerPosition.split("-")[0].substring(1);
  let column = playerPosition.split("-")[1].substring(1);
  if (
    (row === "1" && playerDirection === "up") ||
    (row === "6" && playerDirection === "down") ||
    (column === "1" && playerDirection === "left") ||
    (column === "12" && playerDirection === "right")
  ) {
    return;
  }
  let affectedTile;
  if (playerDirection === "up") {
    affectedTile = "r" + (parseInt(row) - 1) + "-c" + column;
  } else if (playerDirection === "down") {
    affectedTile = "r" + (parseInt(row) + 1) + "-c" + column;
  } else if (playerDirection === "left") {
    affectedTile = "r" + row + "-c" + (parseInt(column) - 1);
  } else if (playerDirection === "right") {
    affectedTile = "r" + row + "-c" + (parseInt(column) + 1);
  }
  let swordSwingTile = document.querySelector("." + affectedTile);

  swordSwingTile.classList.add("swordSwing");

  let swordAnimation = document.createElement("div");
  swordAnimation.classList.add("sword-animation");

  let swordAnimationLine = document.createElement("div");
  swordAnimationLine.classList.add("sword-animation-line");

  swordAnimation.appendChild(swordAnimationLine);

  swordSwingTile.appendChild(swordAnimation);

  swordAnimationLine.addEventListener("animationend", () => {
    swordAnimation.remove();
    swordSwingTile.classList.remove("swordSwing"); // Remove the swordSwing class after animation
  });

  if (boulderPositions.includes(affectedTile)) {
    let boulderToRemove = document.querySelector(".boulder-" + affectedTile);
    let boulderShadowToRemove = document.querySelector(
      ".boulderShadow-" + affectedTile
    );

    boulderPositions = boulderPositions.filter(
      (position) => position !== affectedTile
    );

    boulderToRemove.remove();
    boulderShadowToRemove.remove();
    boulderDestroyed = true;
  }
  let mobsToRemove = document.querySelectorAll(
    "div." + affectedTile + " > img.dogeMob"
  );
  if (mobsToRemove) {
    mobsToRemove.forEach((element) => {
      let enemyClass = element.classList[0];
      let enemyIndex = enemyClass.split("-")[1];

      let foundEnemy = enemyPositions.find(
        (item) => item.enemyClass === enemyClass
      );
      if (foundEnemy && foundEnemy.isMoving === true) {
        return;
      }

      slayedEnemies.push(enemyClass);

      let allEnemyClass = document.querySelectorAll("." + enemyClass);

      allEnemyClass.forEach((img) => {
        img.remove();
      });

      // enemyPositions = enemyPositions.filter(
      //   (position) => position !== affectedTile
      // );
      enemyPositions = enemyPositions.map((item) => {
        if (item.enemyClass === enemyClass) {
          return {
            ...item,
            position: null,
            isAlive: false,
          };
        } else {
          return item;
        }
      });

      let dogImg = document.createElement("img");

      if (buffDogeIndexes.includes(parseInt(enemyIndex))) {
        dogImg.className = "buffDogeImg" + " animateDeath";
        dogImg.src = "./image/buffdoge.png";
      } else {
        dogImg.className = "dogImg" + " animateDeath";
        dogImg.src = "./image/doge.png";
      }
      swordSwingTile.append(dogImg);

      dogImg.addEventListener("animationend", () => {
        dogImg.remove();
      });
    });
  }
}

// ----------end player logic ----------------

// ------------------enemy logic--------------
function placeEnemy(index) {
  let startingTile = document.querySelector(
    "." + enemyPositions[index].position
  );
  let enemyType = "dogeMob";
  let dogImg = document.createElement("img");
  dogImg.className =
    "dogImg-" + index + " " + enemyPositions[index].position + " " + enemyType;

  if (buffDogeIndexes.includes(index)) {
    dogImg.src = "./image/buffdoge.png";
    startingTile.append(dogImg);
    startEnemyMovement(
      ".dogImg-" + index,
      "./image/buffdoge.png",
      index,
      enemyType
    );
  } else {
    dogImg.src = "./image/doge.png";
    startingTile.append(dogImg);
    startEnemyMovement(
      ".dogImg-" + index,
      "./image/doge.png",
      index,
      enemyType
    );
  }
}

function fireEnemyBeam(enemyImg, enemyIndex) {
  const currentRound = round;
  let enemyBeamTimer = setTimeout(() => {
    let possibleDirections = [];
    let enemyPosition = enemyImg.classList[1];

    let fireDown =
      parseInt(enemyPosition.charAt(1)) < parseInt(playerPosition.charAt(1));
    let fireUp =
      parseInt(enemyPosition.charAt(1)) > parseInt(playerPosition.charAt(1));
    let fireRight =
      parseInt(enemyPosition.substring(4)) <
      parseInt(playerPosition.substring(4));
    let fireLeft =
      parseInt(enemyPosition.substring(4)) >
      parseInt(playerPosition.substring(4));

    if (fireDown) {
      possibleDirections.push("fireDown");
    } else if (fireUp) {
      possibleDirections.push("fireUp");
    }
    if (fireRight) {
      possibleDirections.push("fireRight");
    } else if (fireLeft) {
      possibleDirections.push("fireLeft");
    }
    let directionSelected =
      possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

    let affectedTiles = [];

    if (directionSelected === "fireDown") {
      let startRow = parseInt(enemyPosition.charAt(1));
      let endRow = parseInt(playerPosition.charAt(1));
      let column = parseInt(enemyPosition.substring(4));

      for (let i = startRow; i <= endRow; i++) {
        affectedTiles.push("r" + i + "-c" + column);
      }
    } else if (directionSelected === "fireUp") {
      let startRow = parseInt(enemyPosition.charAt(1));
      let endRow = parseInt(playerPosition.charAt(1));
      let column = parseInt(enemyPosition.substring(4));
      for (let i = startRow; i >= endRow; i--) {
        affectedTiles.push("r" + i + "-c" + column);
      }
    } else if (directionSelected === "fireLeft") {
      let row = parseInt(enemyPosition.charAt(1));
      let startColumn = parseInt(enemyPosition.substring(4));
      let endColumn = parseInt(playerPosition.substring(4));
      for (let i = startColumn; i >= endColumn; i--) {
        affectedTiles.push("r" + row + "-c" + i);
      }
    } else if (directionSelected === "fireRight") {
      let row = parseInt(enemyPosition.charAt(1));
      let startColumn = parseInt(enemyPosition.substring(4));
      let endColumn = parseInt(playerPosition.substring(4));
      for (let i = startColumn; i <= endColumn; i++) {
        affectedTiles.push("r" + row + "-c" + i);
      }
    }
    for (let j = 1; j < affectedTiles.length; j++) {
      let delayTimer = setTimeout(() => {
        if (currentRound !== round) {
          clearTimeout(enemyBeamTimer);
          clearTimeout(delayTimer);
          return;
        }
        let damageTile = document.querySelector("." + affectedTiles[j]);
        let originalColor = "#008b8a";

        damageTile.style.backgroundColor = "lightsalmon";

        let damageTileTimer = setTimeout(() => {
          if (currentRound !== round) {
            clearTimeout(damageTileTimer);
            return;
          }
          if (directionSelected === "fireUp") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              affectedTiles.length === 2
                ? "laserBeam laserBeamVerticalRounded"
                : j === 1
                ? "laserBeam laserBeamVerticalStartFireUp"
                : j === affectedTiles.length - 1
                ? "laserBeam laserBeamVerticalEndFireUp"
                : "laserBeam laserBeamVertical";
            damageTile.append(laserBeam);
          } else if (directionSelected === "fireDown") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              affectedTiles.length === 2
                ? "laserBeam laserBeamVerticalRounded"
                : j === 1
                ? "laserBeam laserBeamVerticalStartFireDown"
                : j === affectedTiles.length - 1
                ? "laserBeam laserBeamVerticalEndFireDown"
                : "laserBeam laserBeamVertical";

            damageTile.append(laserBeam);
          } else if (directionSelected === "fireLeft") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              affectedTiles.length === 2
                ? "laserBeam laserBeamHorizontalRounded"
                : j === 1
                ? "laserBeam laserBeamHorizontalStartFireLeft"
                : j === affectedTiles.length - 1
                ? "laserBeam laserBeamHorizontalEndFireLeft"
                : "laserBeam laserBeamHorizontal";

            damageTile.append(laserBeam);
          } else if (directionSelected === "fireRight") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              affectedTiles.length === 2
                ? "laserBeam laserBeamHorizontalRounded"
                : j === 1
                ? "laserBeam laserBeamHorizontalStartFireRight"
                : j === affectedTiles.length - 1
                ? "laserBeam laserBeamHorizontalEndFireRight"
                : "laserBeam laserBeamHorizontal";

            damageTile.append(laserBeam);
          }
          damageTile.style.backgroundColor = originalColor; // Revert back to original color

          if (affectedTiles[j] === playerPosition) {
            loseGame(enemyIndex);
          }
        }, 500); // Revert back to original color after 500ms
      }, 500); // Delay each iteration by 500ms
    }
  }, 500); // Initial delay of 500ms before executing the code
}

// ------------start enemy movement------------------

function startEnemyMovement(enemyClass, enemyImgPath, enemyIndex, enemyType) {
  // let enemyEl = document.querySelector(enemyClass)
  const foundEnemy = enemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }

  let enemyDelay =
    1000 / ((round + 1) * 0.25) > 1000
      ? 1000
      : 1000 / ((round + 1) * 0.25) < 750
      ? 750
      : 1000 / ((round + 1) * 0.25);
  const currentRound = round;
  let isBuffDoge = buffDogeIndexes.includes(enemyIndex);
  let isAttacking = Math.random() < 0.2;
  let enemyTimer = setTimeout(() => {
    if (currentRound !== round) {
      clearTimeout(enemyTimer);
      return;
    }
    let enemyImg = document.querySelector(enemyClass);
    if (!enemyImg) {
      return;
    }
    if (isAttacking) {
      enemyImg.src = isBuffDoge
        ? "./image/buffdogeAura.png"
        : "./image/dogeRedEyes.png";
      isBuffDoge
        ? dropBoulder(enemyIndex)
        : fireEnemyBeam(enemyImg, enemyIndex);
    } else {
      if (foundEnemy) {
        enemyPositions = enemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              isMoving: true,
            };
          } else {
            return item;
          }
        });
      }
      let directions = ["up", "down", "left", "right"];
      let directionSelected = directions[Math.floor(Math.random() * 4)];
      if (gameOver) {
        return;
      }
      if (directionSelected === "up") {
        enemyMoveUp(enemyClass, enemyImgPath, enemyIndex, enemyType);
      } else if (directionSelected === "down") {
        enemyMoveDown(enemyClass, enemyImgPath, enemyIndex, enemyType);
      } else if (directionSelected === "left") {
        enemyMoveLeft(enemyClass, enemyImgPath, enemyIndex, enemyType);
      } else if (directionSelected === "right") {
        enemyMoveRight(enemyClass, enemyImgPath, enemyIndex, enemyType);
      }
    }
    if (gameOver) {
      return;
    }
    startEnemyMovement(enemyClass, enemyImgPath, enemyIndex, enemyType);
  }, enemyDelay);
}

function enemyMoveUp(enemyClass, enemyImgPath, enemyIndex, enemyType) {
  const foundEnemy = enemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let isBuffDoge = buffDogeIndexes.includes(enemyIndex);
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;

    enemyPositions = enemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveUp");
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex && isBuffDoge
        ? "./image/buffdogeAttack.png"
        : attackingEnemyIndex === enemyIndex && !isBuffDoge
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      enemyPositions = enemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
      enemyImg.remove();
      nextTile.append(newEnemyImg);
    }, 100);
  }
}

function enemyMoveDown(enemyClass, enemyImgPath, enemyIndex, enemyType) {
  const foundEnemy = enemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let isBuffDoge = buffDogeIndexes.includes(enemyIndex);
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row < 6) {
    let newPosition = "r" + (parseInt(row) + 1) + "-c" + column;

    enemyPositions = enemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveDown");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex && isBuffDoge
        ? "./image/buffdogeAttack.png"
        : attackingEnemyIndex === enemyIndex && !isBuffDoge
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      enemyPositions = enemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
      enemyImg.remove();
      nextTile.append(newEnemyImg);
    }, 100);
  }
}

function enemyMoveLeft(enemyClass, enemyImgPath, enemyIndex, enemyType) {
  const foundEnemy = enemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let isBuffDoge = buffDogeIndexes.includes(enemyIndex);
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column > 1) {
    let newPosition = "r" + row + "-c" + (parseInt(column) - 1);

    enemyPositions = enemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveLeft");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex && isBuffDoge
        ? "./image/buffdogeAttack.png"
        : attackingEnemyIndex === enemyIndex && !isBuffDoge
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      enemyPositions = enemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
      enemyImg.remove();
      nextTile.append(newEnemyImg);
    }, 100);
  }
}

function enemyMoveRight(enemyClass, enemyImgPath, enemyIndex, enemyType) {
  const foundEnemy = enemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let isBuffDoge = buffDogeIndexes.includes(enemyIndex);
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column < 12) {
    let newPosition = "r" + row + "-c" + (parseInt(column) + 1);

    enemyPositions = enemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveRight");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex && isBuffDoge
        ? "./image/buffdogeAttack.png"
        : attackingEnemyIndex === enemyIndex && !isBuffDoge
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      enemyPositions = enemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
      enemyImg.remove();
      nextTile.append(newEnemyImg);
    }, 100);
  }
}

// ------------end enemy movement------------------

// ----------------end enemy logic----------------

// ----------start key press logic-------------

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
  if (!gameStarted && evt.keyCode === 32) {
    startPrologue();
  } else if (gameStarted && swordAcquired && !gameOver && evt.keyCode === 32) {
    swingSword();
  } else if (gameStarted && gameOver && evt.keyCode === 32) {
    lives > 0 ? restartRound() : restartGame();
  }
  if (gameOver) {
    return;
  }

  if (canMove && evt.keyCode === 38) {
    if (
      (isOutdoor1 && playerPosition === caveEntrancePosition) ||
      (isOutdoor2 && playerPosition === towerEntrancePosition)
    ) {
      isOutdoor1 ? enterCave() : isOutdoor2 ? enterTower() : null;
    }
    moveUp();
    playerDirection = "up";
    limitMovement();
  } else if (canMove && evt.keyCode === 40) {
    if (isCave && playerPosition === caveExitPosition) {
      isCave ? exitCave() : null;
    }
    moveDown();
    playerDirection = "down";
    limitMovement();
  } else if (canMove && evt.keyCode === 37) {
    if (isOutdoor1 && playerPosition === scene1ExitTilePosition) {
      isOutdoor1 ? enterOutdoorScene2() : null;
    }
    moveLeft();
    playerDirection = "left";
    limitMovement();
  } else if (canMove && evt.keyCode === 39) {
    if (isOutdoor2 && playerPosition === scene2ExitTilePosition) {
      isOutdoor2 ? exitOutDoorScene2() : null;
    }
    moveRight();
    playerDirection = "right";
    limitMovement();
  }
}

// -------start player movement-------------------

function moveUp() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;
    //change
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition)
    ) {
      return;
    }
    catImg.classList.add("moveUp");
    playerPosition = newPosition;
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    if (isCave && playerPosition === swordPosition) {
      // picks up sword
      swordAcquired = true;
      let swordTop = document.querySelector(".swordTop");
      swordTop.style.display = "none";
      newCatImg.src = "./image/swordCat.png";
    } else if (swordAcquired) {
      newCatImg.src = "./image/swordCat.png";
    } else {
      newCatImg.src = "./image/cat.png";
    }
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      catImg.remove();
      nextTile.append(newCatImg);

      if (playerPosition === exitTilePosition) {
        startingPosition = playerPosition;
        endRound();
      }
    }, 100);
  }
}

function moveDown() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row < 6) {
    let newPosition = "r" + (parseInt(row) + 1) + "-c" + column;
    //change
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition)
    ) {
      return;
    }
    catImg.classList.add("moveDown");
    playerPosition = newPosition;
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    if (isCave && playerPosition === swordPosition) {
      // picks up sword
      swordAcquired = true;
      let swordTop = document.querySelector(".swordTop");
      swordTop.style.display = "none";
      newCatImg.src = "./image/swordCat.png";
    } else if (swordAcquired) {
      newCatImg.src = "./image/swordCat.png";
    } else {
      newCatImg.src = "./image/cat.png";
    }
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      catImg.remove();
      nextTile.append(newCatImg);
      if (playerPosition === exitTilePosition) {
        startingPosition = playerPosition;
        endRound();
      }
    }, 100);
  }
}
function moveLeft() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (column > 1) {
    let newPosition = "r" + row + "-c" + (parseInt(column) - 1);
    //change
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition)
    ) {
      return;
    }
    catImg.classList.add("moveLeft");
    playerPosition = newPosition;
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    if (isCave && playerPosition === swordPosition) {
      // picks up sword
      swordAcquired = true;
      let swordTop = document.querySelector(".swordTop");
      swordTop.style.display = "none";
      newCatImg.src = "./image/swordCat.png";
    } else if (swordAcquired) {
      newCatImg.src = "./image/swordCat.png";
    } else {
      newCatImg.src = "./image/cat.png";
    }
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      catImg.remove();
      nextTile.append(newCatImg);
      if (playerPosition === exitTilePosition) {
        startingPosition = playerPosition;
        endRound();
      }
    }, 100);
  }
}

function moveRight() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (column < 12) {
    let newPosition = "r" + row + "-c" + (parseInt(column) + 1);
    //change
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition)
    ) {
      return;
    }
    catImg.classList.add("moveRight");
    playerPosition = newPosition;
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    if (isCave && playerPosition === swordPosition) {
      // picks up sword
      swordAcquired = true;
      let swordTop = document.querySelector(".swordTop");
      swordTop.style.display = "none";
      newCatImg.src = "./image/swordCat.png";
    } else if (swordAcquired) {
      newCatImg.src = "./image/swordCat.png";
    } else {
      newCatImg.src = "./image/cat.png";
    }
    let nextTile = document.querySelector("." + newPosition);
    setTimeout(() => {
      catImg.remove();
      nextTile.append(newCatImg);
      if (playerPosition === exitTilePosition) {
        startingPosition = playerPosition;
        endRound();
      }
    }, 100);
  }
}

// -------end player movement-------------------

// -----------start boss -----------------

function startBoss() {
  isBossRound = true;
  mainEl.innerHTML = "";
  enemyPositions = [];
  boulderPositions = [];
  treePositions = [];
  round++;
  startingPosition = "r6-c6";
  createTiles();
  placePlayer1();
  placeBoss();
  canMove = false;
}

function placeBoss() {
  let bossPosition = "r3-c6";
  let selectedTile = document.querySelector("." + bossPosition);
  let bossImg = document.createElement("img");
  bossImg.src = "./image/samuraiDoge.png";
  bossImg.className = "bossImg";
  selectedTile.append(bossImg);
  introduceBoss(selectedTile);
}

function introduceBoss(selectedTile) {
  const dialogueBox = document.createElement("div");
  dialogueBox.className = "dialogue-box";

  const dialogueContent = document.createElement("p");
  dialogueContent.className = "dialogue-content";

  let bossDialogue =
    "I didn't think you would make it this far....no matter. This ends here!";
  let characterCounter = 0;
  let characterTimer = setInterval(() => {
    const character = bossDialogue[characterCounter];
    if (characterCounter < bossDialogue.length) {
      dialogueContent.textContent += character;
      characterCounter++;
    } else {
       clearInterval(characterTimer) 
       startBossFight(selectedTile)
    }
  }, 100);

  dialogueBox.appendChild(dialogueContent);

  selectedTile.appendChild(dialogueBox);
}

function introduceOldCat(selectedTile) {
  const dialogueBox = document.createElement("div");
  dialogueBox.className = "dialogue-box";

  const dialogueContent = document.createElement("p");
  dialogueContent.className = "dialogue-content";

  let bossDialogue = "It's dangerous to go alone. Take this!";
  let characterCounter = 0;
  let characterTimer = setInterval(() => {
    const character = bossDialogue[characterCounter];
    dialogueContent.textContent += character;
    if (characterCounter < bossDialogue.length - 1) {
      characterCounter++;
    } else {
        clearInterval(characterTimer);
    }
  }, 100);

  dialogueBox.appendChild(dialogueContent);

  selectedTile.appendChild(dialogueBox);
}

function startBossFight(selectedTile) {
  let dialogueBox = document.querySelector(".dialogue-box");
  setTimeout(() => {
    dialogueBox.remove();
    
let shadowClone1Position = "r3-c4"
let shadowClone2Position = "r3-c8"


let shadowClone1Animation = document.createElement("img")
shadowClone1Animation.src = "./image/shadowSamuraiDoge.png"
shadowClone1Animation.className = "shadowCloneDog1-animate cloneLeft"
selectedTile.append(shadowClone1Animation)

let shadowClone2Animation = document.createElement("img")
shadowClone2Animation.src = "./image/shadowSamuraiDoge.png"
shadowClone2Animation.className = "shadowCloneDog2-animate cloneRight"
selectedTile.append(shadowClone2Animation)

shadowClone1Animation.addEventListener("animationend", () => {
  shadowClone1Animation.remove();
  let shadowClone1Tile = document.querySelector("." + shadowClone1Position)
  let shadowClone1 = document.createElement("img")
shadowClone1.src = "./image/shadowSamuraiDoge.png"
shadowClone1.className = "shadowCloneDog1"
shadowClone1Tile.append(shadowClone1)
});
shadowClone2Animation.addEventListener("animationend", () => {
  shadowClone2Animation.remove();
  let shadowClone2Tile = document.querySelector("." + shadowClone2Position)
  let shadowClone2 = document.createElement("img")
shadowClone2.src = "./image/shadowSamuraiDoge.png"
shadowClone2.className = "shadowCloneDog1"
shadowClone2Tile.append(shadowClone2)

});

  }, 2000);

}

// --------------end boss-----------

// TODO restart should restart the round and reduce lives by 1 (done)
// TODO add trees to outdoor scene 2 (done)
// TODO sword attack to dogs should do something? (done)
// ----if isMoving, then don't allow attack (done)

// TODO make player position the tile last exited each round and adjust enemy spawns (done)
// ----- could do more to ensure spawns and enemy positions are correct

// TODO add boss stage after round 10

// TODO add ending
// TODO add dialogue to boss and old man (done)
// TODO add sound effects
// TODO calculate score better
// TODO (maybe) add secret sword location

// i didn't think you would make it this far....no matter. This ends here!
