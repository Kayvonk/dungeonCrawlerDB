let mainEl = document.getElementsByTagName("main")[0];
let startBtn = document.getElementById("start");
let endingEl = document.getElementById("endingContainer");
let highscoresEl = document.getElementById("highscoresIcon");

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
let lossPause = false;
let playingBossDialogue = false;
let bossPosition = "r3-c6";
let shadowClone1Position = "r3-c4";
let shadowClone2Position = "r3-c8";
let bossHealth = 3;
let bossEnemyPositions = [
  {
    position: "r3-c6",
    enemyClass: "bossImg",
    isAlive: true,
    isMoving: false,
    hitsRemaining: 3,
  },
  {
    position: "r3-c4",
    enemyClass: "shadowCloneDog1",
    isAlive: true,
    isMoving: false,
    hitsRemaining: 1,
  },
  {
    position: "r3-c8",
    enemyClass: "shadowCloneDog2",
    isAlive: true,
    isMoving: false,
    hitsRemaining: 1,
  },
];

let lowestHighscore;
let highscoresCount;
let showHighscoresBoard = false;
let highscoresData;

startBtn.addEventListener("click", startPrologue);

// ------------------start prologue --------------------------

function startPrologue() {
  gameStarted = true;
  highscoresEl.style.opacity = 0;
  setTimeout(() => {
    highscoresEl.style.display = "none";
  }, 500);
  playSoundEffect("gameStart");
  let audioBtn = document.getElementById("audioButton");
  audioBtn.classList.add("faded");
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

    if (row === "1") {
      let wall = document.createElement("div");
      if (column === "7") {
        // tower entrance
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
  treePositions = [];
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
  const currentRound = round;
  canMove = false;
  let limitMovementTimer = setTimeout(() => {
    if (playingBossDialogue) {
      clearTimeout(limitMovementTimer);
      return;
    } else if (currentRound !== round) {
      clearTimeout(limitMovementTimer);
      canMove = true;
      return;
    } else {
      canMove = true;
    }
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
  playSoundEffect("drop");
  setTimeout(() => {
    if (selectedPosition === playerPosition && !gameOver) {
      return loseGame(enemyIndex);
    }
  }, 1000);
}

function enterTower() {
  isOutdoor2 = false;
  mainEl.innerHTML = "";
  playerEnterDirection = "bottom";
  startingPosition = "r6-c7";
  playerPosition = startingPosition;
  boulderPositions = [];
  treePositions = [];
  createTiles();
  startTower();
  placePlayer1();
}

function startTower() {
  secondsTimer = setInterval(() => {
    if (gameOver) {
      clearInterval(secondsTimer);
      if (gameOver) {
        clearInterval(secondsTimer);
        if (bossEnemyPositions[0].isAlive) {
          return displayRestartMenu();
        } else {
          return;
        }
      }
    }
    seconds++;
  }, 1000);
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
}

function restartRound() {
  lives--;
  playerPosition = startingPosition;
  gameStarted = true;

  clearInterval(boulderTimer);
  clearInterval(secondsTimer);

  secondsTimer = setInterval(() => {
    if (gameOver) {
      clearInterval(secondsTimer);
      if (bossEnemyPositions[0].isAlive) {
        return displayRestartMenu();
      } else {
        return;
      }
    }
    seconds++;
  }, 1000);

  let scoreDiv = document.getElementById("results");
  scoreDiv.style.display = "none";
  attackingEnemyIndex = null;
  round--;
  gameOver = false;
  endRound();
}

function displayRestartMenu() {
  let scoreDiv = document.getElementById("results");
  scoreDiv.style.display = "flex";
  scoreDiv.style.fontFamily = "Arial";
  scoreDiv.innerHTML = `
   <h2>${
     typeof attackingEnemyIndex === "number" ? "Game Over" : "You win"
   } </h2>
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

function calculateScore() {
  let baseScore = 10000;

  let livesBonus = lives * 1000;

  let timeScore = Math.ceil((1 / seconds) * 100000) + 100;

  let finalScore = baseScore + timeScore + livesBonus;

  if (isFinite(finalScore) && finalScore > highScore) {
    highScore = finalScore;
  }

  if (highScore > lowestHighscore.score || highscoresCount < 100) {
    let highscoresInputDiv = document.createElement("div");
    highscoresInputDiv.className = "highscoresInputDiv";

    let highscoresInputContainer = document.createElement("div");
    highscoresInputContainer.className = "highscoresInputContainer";

    let highscoresLeftContainer = document.createElement("div");
    highscoresLeftContainer.className = "highscoresLeftContainer";

    let highscoresRightContainer = document.createElement("div");
    highscoresRightContainer.className = "highscoresRightContainer";

    // ------------------

    let highscoresLeftScoreLabel = document.createElement("div");
    highscoresLeftScoreLabel.className = "highscoresLeftScoreLabel";
    highscoresLeftScoreLabel.textContent = "Score: ";

    let highscoresLeftScoreValue = document.createElement("div");
    highscoresLeftScoreValue.className = "highscoresLeftScoreValue";
    highscoresLeftScoreValue.textContent = highScore;

    highscoresLeftContainer.append(highscoresLeftScoreLabel);
    highscoresLeftContainer.append(highscoresLeftScoreValue);
    highscoresInputContainer.append(highscoresLeftContainer);

    // ------------------

    let highscoresRightNameLabel = document.createElement("div");
    highscoresRightNameLabel.className = "highscoresRightNameLabel";
    highscoresRightNameLabel.textContent = "Name: ";

    let highscoresRightNameValue = document.createElement("input");
    highscoresRightNameValue.className = "highscoresRightNameValue";
    highscoresRightNameValue.setAttribute("maxlength", "3");

    highscoresRightNameValue.type = "text";
    highscoresRightNameValue.placeholder = "Enter your name";

    let highscoresRightNameButton = document.createElement("button");
    highscoresRightNameButton.className = "highscoresRightNameButton";
    highscoresRightNameButton.textContent = "OK";

    highscoresRightNameButton.addEventListener("click", sendHighscore);

    highscoresRightContainer.append(highscoresRightNameLabel);
    highscoresRightContainer.append(highscoresRightNameValue);
    highscoresRightContainer.append(highscoresRightNameButton);
    highscoresInputContainer.append(highscoresRightContainer);

    // ----------------

    let newHighscoreToast = document.createElement("div");
    newHighscoreToast.className = "newHighscoreToast";
    newHighscoreToast.textContent = "New Highscore!";

    highscoresInputDiv.append(newHighscoreToast);
    highscoresInputDiv.append(highscoresInputContainer);

    endingEl.append(highscoresInputDiv);
  } else {
    highscoresEl.style.display = "block";
    highscoresEl.style.opacity = 1;
  }
}

function sendHighscore() {
  let newUserName = document.querySelector(".highscoresRightNameValue").value;
  if (newUserName === "") {
    newUserName = "AAA";
  }
  let newHighscore = {
    userName: newUserName,
    score: highScore,
    lowestHighscoreId: lowestHighscore.id,
    count: highscoresCount,
  };

  fetch("/api/highscores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHighscore),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let highscoresInputDiv = document.querySelector(".highscoresInputDiv");
      highscoresInputDiv.style.display = "none";
      highscoresEl.style.display = "block";
      highscoresEl.style.opacity = 1;
      getHighscores();
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function restartGame() {
  location.reload();
}

function loseGame(enemyIndex) {
  attackingEnemyIndex = enemyIndex;
  playSoundEffect("gameOver");
  gameOver = true;
  lossPause = true;
  setTimeout(() => {
    lossPause = false;
  }, 2000);
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
  if (round + 1 === 10) {
    return startBoss();
  }
  playSoundEffect("teleport");
  mainEl.innerHTML = "";
  enemyPositions = [];
  bossEnemyPositions = [
    {
      position: "r3-c6",
      enemyClass: "bossImg",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 3,
    },
    {
      position: "r3-c4",
      enemyClass: "shadowCloneDog1",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 1,
    },
    {
      position: "r3-c8",
      enemyClass: "shadowCloneDog2",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 1,
    },
  ];
  boulderPositions = [];
  treePositions = [];
  round++;
  createTiles();
  placePlayer1();
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
    }

    mainEl.append(tile);
  }
}

//------------- player logic------------
function placePlayer1() {
  let startingTile = document.querySelector("." + startingPosition);
  let catImg = document.createElement("img");
  catImg.className = "catImg " + startingPosition;
  catImg.src = "./image/cat.png";
  startingTile.append(catImg);
}

function swingSword() {
  if (playingBossDialogue) {
    return;
  }
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

  playSoundEffect("swing");

  swordAnimationLine.addEventListener("animationend", () => {
    swordAnimation.remove();
    swordSwingTile.classList.remove("swordSwing");
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

  let bossTargeted = document.querySelector(".bossImg");

  if (bossTargeted) {
    let bossPosition = bossTargeted.classList[1];

    if (bossTargeted && bossPosition === affectedTile) {
      if (bossEnemyPositions[0].isMoving === true) {
        return;
      }
      bossHealth = bossHealth - 1;
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === "bossImg" && item.hitsRemaining - 1 > 0) {
          bossTargeted.remove();
          let bossDeathImg = document.createElement("img");
          bossDeathImg.className = "bossImg";
          bossDeathImg.src = "./image/smoke.png";
          swordSwingTile.append(bossDeathImg);
          let logImg = document.createElement("img");
          setTimeout(() => {
            logImg.className = "logImg";
            logImg.src = "./image/log.png";
            swordSwingTile.append(logImg);
          }, 200);
          setTimeout(() => {
            bossDeathImg.remove();
            setTimeout(() => {
              logImg.remove();
            }, 500);
          }, 1000);
          bossPosition = "r3-c6";
          return {
            ...item,
            isAlive: true,
            hitsRemaining: item.hitsRemaining - 1,
          };
        } else if (
          item.enemyClass === "bossImg" &&
          item.hitsRemaining - 1 === 0
        ) {
          bossTargeted.remove();
          let bossDeathImg = document.createElement("img");
          bossDeathImg.className = "bossImg animateDeath";
          bossDeathImg.src = "./image/samuraiDoge.png";

          swordSwingTile.append(bossDeathImg);

          bossDeathImg.addEventListener("animationend", () => {
            bossDeathImg.remove();
          });

          return {
            ...item,
            position: null,
            isAlive: false,
            hitsRemaining: item.hitsRemaining - 1,
          };
        } else {
          return item;
        }
      });

      bossEnemyPositions[0].isAlive ? placeBoss(bossHealth) : startEnding();
    }
  }

  let shadowClonesTargeted = document.querySelectorAll(
    "div." + affectedTile + " > img.dogeClone"
  );
  shadowClonesTargeted.forEach((shadowClone) => {
    let shadowClonePosition = shadowClone.classList[1];
    if (shadowClonePosition === affectedTile) {
      let shadowCloneClass = shadowClone.classList[0];
      let foundShadowClone = bossEnemyPositions.find(
        (item) => item.enemyClass === shadowCloneClass
      );
      if (foundShadowClone && foundShadowClone.isMoving === true) {
        return;
      }

      let allShadowCloneClass = document.querySelectorAll(
        "." + shadowCloneClass
      );

      allShadowCloneClass.forEach((img) => {
        img.remove();
      });

      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === shadowCloneClass) {
          return {
            ...item,
            position: null,
            isAlive: false,
            hitsRemaining: 0,
          };
        } else {
          return item;
        }
      });

      let shadowCloneDeathImg = document.createElement("img");
      shadowCloneDeathImg.className = shadowCloneClass;
      shadowCloneDeathImg.src = "./image/smoke.png";

      swordSwingTile.append(shadowCloneDeathImg);

      setTimeout(() => {
        shadowCloneDeathImg.remove();
      }, 750);

      // playSoundEffect("shadowCloneDeath");
    }
  });
}

// -------start player movement-------------------

function moveUp() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition) ||
      (isBossRound &&
        bossEnemyPositions.some((element) => element.position === newPosition))
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
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition) ||
      (isBossRound &&
        bossEnemyPositions.some((element) => element.position === newPosition))
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
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition) ||
      (isBossRound &&
        bossEnemyPositions.some((element) => element.position === newPosition))
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
    if (
      enemyPositions.some((element) => element.position === newPosition) ||
      boulderPositions.includes(newPosition) ||
      treePositions.includes(newPosition) ||
      (isBossRound &&
        bossEnemyPositions.some((element) => element.position === newPosition))
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

// --------end player movement----------------

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

          if (affectedTiles[j] === playerPosition && !gameOver) {
            loseGame(enemyIndex);
          }
        }, 500); // Revert back to original color after 500ms
      }, 500); // Delay each iteration by 500ms
    }
  }, 500); // Initial delay of 500ms before executing the code
}

// ------------start enemy movement------------------

function startEnemyMovement(enemyClass, enemyImgPath, enemyIndex, enemyType) {
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

    if (playerPosition === newPosition && !gameOver) {
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

    if (playerPosition === newPosition && !gameOver) {
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

    if (playerPosition === newPosition && !gameOver) {
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

    if (playerPosition === newPosition && !gameOver) {
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
  } else if (
    gameStarted &&
    gameOver &&
    bossHealth !== 0 &&
    evt.keyCode === 32 &&
    !lossPause
  ) {
    lives > 0 ? restartRound() : restartGame();
  } else if (bossHealth === 0) {
    return;
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

// ----------end key press logic-----------

/* ----------start music logic------------- */

let musicArray = [
  {
    name: "opening",
    song: "./audio/bgm/opening.mp3",
    duration: "430000",
  },
  {
    name: "boss",
    song: "./audio/bgm/boss.mp3",
    duration: "212000",
  },
  {
    name: "ending",
    song: "./audio/bgm/ending.mp3",
    duration: "242000",
  },
];
let musicCount = 0;

let musicToggleStatus = false;

let audio = new Audio(musicArray[musicCount].song);

audio.volume = 0.25;

let toggleMusic = () => {
  if (musicToggleStatus) {
    audio.pause();
    audio.currentTime = 0;
  } else {
    audio.play();
  }

  musicToggleStatus = !musicToggleStatus;

  let audioButton = document.getElementById("audioButton");
  audioButton.textContent = musicToggleStatus ? "🔇" : "🔊";
};

let updateVolume = (event) => {
  audio.volume = event.target.value;
};

window.addEventListener("load", () => {
  let audioButton = document.getElementById("audioButton");
  let volumeSlider = document.getElementById("volumeSlider");

  volumeSlider.value = 0.25;

  audioButton.textContent = musicToggleStatus ? "🔇" : "🔊";

  audioButton.addEventListener("click", toggleMusic);

  audio.volume = volumeSlider.value;

  volumeSlider.addEventListener("input", updateVolume);
});

const soundEffects = {
  gameOver: new Audio("./audio/se/gameOver.mp3"),
  gameStart: new Audio("./audio/se/gameStart.mp3"),
  swing: new Audio("./audio/se/swing.mp3"),
  teleport: new Audio("./audio/se/teleport.mp3"),
  drop: new Audio("./audio/se/drop.mp3"),
};

Object.values(soundEffects).forEach((effect) => (effect.volume = 0.1));
soundEffects.swing.playbackRate = 1.5;
soundEffects.drop.playbackRate = 3;

const playSoundEffect = (effect) => {
  if (soundEffects[effect]) {
    soundEffects[effect].play();
  } else {
    console.error(`Sound effect "${effect}" not found.`);
  }
};

// -------------end music logic--------------

// ----start dialogue logic---------

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

function introduceBoss(selectedTile) {
  canMove = false;
  const dialogueBox = document.createElement("div");
  dialogueBox.className = "dialogue-box";

  const dialogueContent = document.createElement("p");
  dialogueContent.className = "dialogue-content";

  let bossDialogue =
    "I didn't think you would make it this far... no matter. This ends here!";
  let characterCounter = 0;
  let characterTimer = setInterval(() => {
    const character = bossDialogue[characterCounter];
    if (characterCounter < bossDialogue.length) {
      dialogueContent.textContent += character;
      characterCounter++;
    } else {
      clearInterval(characterTimer);
      startBossFight(selectedTile);
    }
  }, 50);

  dialogueBox.appendChild(dialogueContent);

  selectedTile.appendChild(dialogueBox);
}

// ----end dialogue logic---------

// -----------start boss -----------------

function startBoss() {
  startingPosition = "r6-c6";
  playerPosition = startingPosition;
  exitTilePosition = null;
  isBossRound = true;
  bossHealth = 3;
  playingBossDialogue = true;
  mainEl.innerHTML = "";
  enemyPositions = [];
  boulderPositions = [];
  treePositions = [];
  round++;
  startingPosition = "r6-c6";
  bossEnemyPositions = [
    {
      position: "r3-c6",
      enemyClass: "bossImg",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 3,
    },
    {
      position: "r3-c4",
      enemyClass: "shadowCloneDog1",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 1,
    },
    {
      position: "r3-c8",
      enemyClass: "shadowCloneDog2",
      isAlive: true,
      isMoving: false,
      hitsRemaining: 1,
    },
  ];
  createTiles();
  placePlayer1();
  placeBoss(3);

  musicCount = 1; // Index of the boss song
  audio.src = musicArray[musicCount].song; // Change the audio source to boss song

  if (musicToggleStatus) {
    audio.play();
  }
}

function placeBoss(hitsRemaining) {
  let selectedTile = document.querySelector("." + bossPosition);
  let bossImg = document.createElement("img");
  bossImg.src = "./image/samuraiDoge.png";
  bossImg.className =
    "bossImg" + " " + bossEnemyPositions[0].position + " " + "dogeBoss";
  selectedTile.append(bossImg);
  if (gameOver) {
    return;
  }
  if (hitsRemaining === 3) {
    canMove = false;
    introduceBoss(selectedTile);
  } else {
    startBossMovement(
      ".bossImg",
      "./image/samuraiDoge.png",
      0,
      "dogeBoss",
      hitsRemaining
    );
  }
}

function startBossFight(selectedTile) {
  let dialogueBox = document.querySelector(".dialogue-box");

  setTimeout(() => {
    dialogueBox.remove();

    let shadowClone1Animation = document.createElement("img");
    shadowClone1Animation.src = "./image/shadowSamuraiDoge.png";
    shadowClone1Animation.className = "shadowCloneDog1-animate cloneLeft";
    selectedTile.append(shadowClone1Animation);

    let shadowClone2Animation = document.createElement("img");
    shadowClone2Animation.src = "./image/shadowSamuraiDoge.png";
    shadowClone2Animation.className = "shadowCloneDog2-animate cloneRight";
    selectedTile.append(shadowClone2Animation);

    shadowClone1Animation.addEventListener("animationend", () => {
      shadowClone1Animation.remove();
      let shadowClone1Tile = document.querySelector("." + shadowClone1Position);
      let shadowClone1 = document.createElement("img");
      shadowClone1.src = "./image/shadowSamuraiDoge.png";
      shadowClone1.className =
        "shadowCloneDog1 " + bossEnemyPositions[1].position + " " + "dogeClone";
      shadowClone1Tile.append(shadowClone1);
      startBossMovement(
        ".shadowCloneDog1",
        "./image/shadowSamuraiDoge.png",
        1,
        "dogeClone"
      );
    });
    shadowClone2Animation.addEventListener("animationend", () => {
      shadowClone2Animation.remove();
      let shadowClone2Tile = document.querySelector("." + shadowClone2Position);
      let shadowClone2 = document.createElement("img");
      shadowClone2.src = "./image/shadowSamuraiDoge.png";
      shadowClone2.className =
        "shadowCloneDog2 " + bossEnemyPositions[2].position + " " + "dogeClone";
      shadowClone2Tile.append(shadowClone2);
      startBossMovement(
        ".shadowCloneDog2",
        "./image/shadowSamuraiDoge.png",
        2,
        "dogeClone"
      );
      startBossMovement(
        ".bossImg",
        "./image/samuraiDoge.png",
        0,
        "dogeBoss",
        3
      );
      playingBossDialogue = false;
      canMove = true;
    });
  }, 2000);
}

function startBossMovement(
  enemyClass,
  enemyImgPath,
  enemyIndex,
  enemyType,
  hitsRemaining
) {
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  if (
    gameOver ||
    (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
    bossEnemyPositions[enemyIndex].hitsRemaining === 0
  ) {
    return;
  }

  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  let isBoss = foundEnemy.enemyClass === "bossImg";

  let enemyDelay = 1500;

  let isAttacking = Math.random() < 0.5;
  let enemyTimer = setTimeout(() => {
    if (
      bossEnemyPositions[enemyIndex]?.isAlive === false ||
      (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth)
    ) {
      clearTimeout(enemyTimer);
      return;
    }
    let enemyImg = document.querySelector(enemyClass);
    if (!enemyImg) {
      return;
    }
    if (isAttacking) {
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
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
      if (Math.random() < 0.5) {
        // change to eyes attack animation
        enemyImg.src = isBoss
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
        fireBigBeam(enemyClass, enemyIndex, enemyType, hitsRemaining);
      } else {
        enemyImg.src = isBoss
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
        performOctoSlash(enemyClass, enemyIndex, enemyType, hitsRemaining);
      }
    } else {
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
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
      if (
        (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
        bossEnemyPositions[enemyIndex].hitsRemaining === 0
      ) {
        return;
      }
      if (foundEnemy && foundEnemy.isAlive === false) {
        return;
      }
      if (directionSelected === "up") {
        bossEnemyMoveUp(
          enemyClass,
          enemyImgPath,
          enemyIndex,
          enemyType,
          hitsRemaining
        );
      } else if (directionSelected === "down") {
        bossEnemyMoveDown(
          enemyClass,
          enemyImgPath,
          enemyIndex,
          enemyType,
          hitsRemaining
        );
      } else if (directionSelected === "left") {
        bossEnemyMoveLeft(
          enemyClass,
          enemyImgPath,
          enemyIndex,
          enemyType,
          hitsRemaining
        );
      } else if (directionSelected === "right") {
        bossEnemyMoveRight(
          enemyClass,
          enemyImgPath,
          enemyIndex,
          enemyType,
          hitsRemaining
        );
      }
    }
    if (gameOver) {
      return;
    }
    if (
      (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
      bossEnemyPositions[enemyIndex].hitsRemaining === 0
    ) {
      return;
    } else {
      startBossMovement(
        enemyClass,
        enemyImgPath,
        enemyIndex,
        enemyType,
        hitsRemaining
      );
    }
  }, enemyDelay);
}
function fireBigBeam(enemyClass, enemyIndex, enemyType, hitsRemaining) {
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  if (gameOver) {
    return;
  }
  if (
    (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
    bossEnemyPositions[enemyIndex].hitsRemaining === 0
  ) {
    return;
  }
  if (
    (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
    bossEnemyPositions[enemyIndex].hitsRemaining === 0
  ) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  if (Math.random() < 0.2) {
    if (
      quadrant1.includes(playerPosition) ||
      quadrant2.includes(playerPosition)
    ) {
      let currentEnemyPositon = document.querySelector(enemyClass);
      currentEnemyPositon.remove();
      let newEnemyTile = document.querySelector(".r2-c11");
      let newBossEnemyImg = document.createElement("img");
      newBossEnemyImg.src =
        enemyClass === ".bossImg"
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
      newBossEnemyImg.className =
        enemyClass.substring(1) + " " + "r2-c11" + " " + enemyType;
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              position: "r2-c11",
              isMoving: false,
            };
          } else {
            return item;
          }
        });
      }
      newEnemyTile.append(newBossEnemyImg);
      fireBigBeamLeft("r2-c11");
    } else if (
      quadrant3.includes(playerPosition) ||
      quadrant4.includes(playerPosition)
    ) {
      let currentEnemyPositon = document.querySelector(enemyClass);
      currentEnemyPositon.remove();
      let newEnemyTile = document.querySelector(".r2-c2");
      let newBossEnemyImg = document.createElement("img");
      newBossEnemyImg.src =
        enemyClass === ".bossImg"
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
      newBossEnemyImg.className = enemyClass.substring(1) + " " + "r2-c2";
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              position: "r2-c2",
              isMoving: false,
            };
          } else {
            return item;
          }
        });
      }
      newEnemyTile.append(newBossEnemyImg);
      fireBigBeamRight("r2-c2");
    } else if (
      quadrant5.includes(playerPosition) ||
      quadrant6.includes(playerPosition)
    ) {
      let currentEnemyPositon = document.querySelector(enemyClass);
      currentEnemyPositon.remove();
      let newEnemyTile = document.querySelector(".r5-c11");
      let newBossEnemyImg = document.createElement("img");
      newBossEnemyImg.src =
        enemyClass === ".bossImg"
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
      newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c11";
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              position: "r5-c11",
              isMoving: false,
            };
          } else {
            return item;
          }
        });
      }
      newEnemyTile.append(newBossEnemyImg);
      fireBigBeamLeft("r5-c11");
    } else if (
      quadrant7.includes(playerPosition) ||
      quadrant8.includes(playerPosition)
    ) {
      let currentEnemyPositon = document.querySelector(enemyClass);
      currentEnemyPositon.remove();
      let newEnemyTile = document.querySelector(".r5-c2");
      let newBossEnemyImg = document.createElement("img");
      newBossEnemyImg.src =
        enemyClass === ".bossImg"
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
      newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c2";
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              position: "r5-c2",
              isMoving: false,
            };
          } else {
            return item;
          }
        });
      }
      newEnemyTile.append(newBossEnemyImg);
      fireBigBeamRight("r5-c2");
    }
  } else if (Math.random() > 0.5) {
    if (quadrant1.includes(playerPosition)) {
      let currentEnemyPositon = document.querySelector(enemyClass);
      currentEnemyPositon.remove();
      let newEnemyTile = document.querySelector(".r5-c2");
      let newBossEnemyImg = document.createElement("img");
      newBossEnemyImg.src =
        enemyClass === ".bossImg"
          ? "./image/samuraiDoge.png"
          : "./image/shadowSamuraiDoge.png";
      newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c2";
      if (foundEnemy) {
        bossEnemyPositions = bossEnemyPositions.map((item) => {
          if (item.enemyClass === enemyClass.substring(1)) {
            return {
              ...item,
              position: "r5-c2",
              isMoving: false,
            };
          } else {
            return item;
          }
        });
      }
      newEnemyTile.append(newBossEnemyImg);
      fireBigBeamUp("r5-c2");
    }
  } else if (quadrant2.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r5-c5");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c5";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r5-c5",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamUp("r5-c5");
  } else if (quadrant3.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r5-c8");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c8";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r5-c8",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamUp("r5-c8");
  } else if (quadrant4.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r5-c11");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r5-c11";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r5-c11",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamUp("r5-c11");
  } else if (quadrant5.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r2-c2");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r2-c2";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r2-c2",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamDown("r2-c2");
  } else if (quadrant6.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r2-c5");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r2-c5";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r2-c5",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamDown("r2-c5");
  } else if (quadrant7.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r2-c8");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r2-c8";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r2-c8",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamDown("r2-c8");
  } else if (quadrant8.includes(playerPosition)) {
    let currentEnemyPositon = document.querySelector(enemyClass);
    currentEnemyPositon.remove();
    let newEnemyTile = document.querySelector(".r2-c11");
    let newBossEnemyImg = document.createElement("img");
    newBossEnemyImg.src =
      enemyClass === ".bossImg"
        ? "./image/samuraiDoge.png"
        : "./image/shadowSamuraiDoge.png";
    newBossEnemyImg.className = enemyClass.substring(1) + " " + "r2-c11";
    if (foundEnemy) {
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            position: "r2-c11",
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }
    newEnemyTile.append(newBossEnemyImg);
    fireBigBeamDown("r2-c11");
  }
}

function bossEnemyMoveUp(
  enemyClass,
  enemyImgPath,
  enemyIndex,
  enemyType,
  hitsRemaining
) {
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  if (
    gameOver ||
    (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth)
  ) {
    return;
  }
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;

    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition && !gameOver) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveUp");
    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    let bossMovementTimer = setTimeout(() => {
      if (
        gameOver ||
        (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
        (foundEnemy && foundEnemy.isAlive === false)
      ) {
        clearTimeout(bossMovementTimer);
      }
      enemyImg.remove();
      nextTile.append(newEnemyImg);
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }, 100);
  }
}

function bossEnemyMoveDown(
  enemyClass,
  enemyImgPath,
  enemyIndex,
  enemyType,
  hitsRemaining
) {
  if (gameOver) {
    return;
  }
  if (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) {
    return;
  }
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (row < 6) {
    let newPosition = "r" + (parseInt(row) + 1) + "-c" + column;

    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition && !gameOver) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveDown");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    let bossMovementTimer = setTimeout(() => {
      if (
        gameOver ||
        (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
        (foundEnemy && foundEnemy.isAlive === false)
      ) {
        clearTimeout(bossMovementTimer);
      }
      enemyImg.remove();
      nextTile.append(newEnemyImg);
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }, 100);
  }
}

function bossEnemyMoveLeft(
  enemyClass,
  enemyImgPath,
  enemyIndex,
  enemyType,
  hitsRemaining
) {
  if (gameOver) {
    return;
  }
  if (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) {
    return;
  }
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column > 1) {
    let newPosition = "r" + row + "-c" + (parseInt(column) - 1);

    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition && !gameOver) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveLeft");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    let bossMovementTimer = setTimeout(() => {
      if (
        gameOver ||
        (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
        (foundEnemy && foundEnemy.isAlive === false)
      ) {
        clearTimeout(bossMovementTimer);
      }
      enemyImg.remove();
      nextTile.append(newEnemyImg);
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }, 100);
  }
}

function bossEnemyMoveRight(
  enemyClass,
  enemyImgPath,
  enemyIndex,
  enemyType,
  hitsRemaining
) {
  if (gameOver) {
    return;
  }
  if (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) {
    return;
  }
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  let enemyImg = document.querySelector(enemyClass);
  if (!enemyImg) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }
  let enemyPosition = enemyImg.classList[1];
  let row = enemyPosition.split("-")[0].substring(1);
  let column = enemyPosition.split("-")[1].substring(1);
  if (column < 12) {
    let newPosition = "r" + row + "-c" + (parseInt(column) + 1);

    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: newPosition,
        };
      } else {
        return item;
      }
    });

    if (playerPosition === newPosition && !gameOver) {
      loseGame(enemyIndex);
    }
    enemyImg.classList.add("moveRight");

    let newEnemyImg = document.createElement("img");
    newEnemyImg.className =
      enemyClass.substring(1) + " " + newPosition + " " + enemyType;
    newEnemyImg.src =
      attackingEnemyIndex === enemyIndex
        ? "./image/dogeAttack.png"
        : enemyImgPath;
    let nextTile = document.querySelector("." + newPosition);
    let bossMovementTimer = setTimeout(() => {
      if (
        gameOver ||
        (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
        (foundEnemy && foundEnemy.isAlive === false)
      ) {
        clearTimeout(bossMovementTimer);
      }
      enemyImg.remove();
      nextTile.append(newEnemyImg);
      bossEnemyPositions = bossEnemyPositions.map((item) => {
        if (item.enemyClass === enemyClass.substring(1)) {
          return {
            ...item,
            isMoving: false,
          };
        } else {
          return item;
        }
      });
    }, 100);
  }
}

// ----top half----
let quadrant1 = [
  "r1-c1",
  "r1-c2",
  "r1-c3",
  "r2-c1",
  "r2-c2",
  "r2-c3",
  "r3-c1",
  "r3-c2",
  "r3-c3",
];
let quadrant2 = [
  "r1-c4",
  "r1-c5",
  "r1-c6",
  "r2-c4",
  "r2-c5",
  "r2-c6",
  "r3-c4",
  "r3-c5",
  "r3-c6",
];
let quadrant3 = [
  "r1-c7",
  "r1-c8",
  "r1-c9",
  "r2-c7",
  "r2-c8",
  "r2-c9",
  "r3-c7",
  "r3-c8",
  "r3-c9",
];
let quadrant4 = [
  "r1-c10",
  "r1-c11",
  "r1-c12",
  "r2-c10",
  "r2-c11",
  "r2-c12",
  "r3-c10",
  "r3-c11",
  "r3-c12",
];

// ----bottom half----
let quadrant5 = [
  "r4-c1",
  "r4-c2",
  "r4-c3",
  "r5-c1",
  "r5-c2",
  "r5-c3",
  "r6-c1",
  "r6-c2",
  "r6-c3",
];
let quadrant6 = [
  "r4-c4",
  "r4-c5",
  "r4-c6",
  "r5-c4",
  "r5-c5",
  "r5-c6",
  "r6-c4",
  "r6-c5",
  "r6-c6",
];
let quadrant7 = [
  "r4-c7",
  "r4-c8",
  "r4-c9",
  "r5-c7",
  "r5-c8",
  "r5-c9",
  "r6-c7",
  "r6-c8",
  "r6-c9",
];
let quadrant8 = [
  "r4-c10",
  "r4-c11",
  "r4-c12",
  "r5-c10",
  "r5-c11",
  "r5-c12",
  "r6-c10",
  "r6-c11",
  "r6-c12",
];

function fireBigBeamUp(newEnemyTile) {
  let affectedTiles = [];
  if (newEnemyTile === "r5-c2") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(1);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow - 1; i >= endRow; i--) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireUp");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r5-c5") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(1);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow - 1; i >= endRow; i--) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireUp");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r5-c8") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(1);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow - 1; i >= endRow; i--) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireUp");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r5-c11") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(1);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow - 1; i >= endRow; i--) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireUp");
    }, 500); // Initial delay of 500ms before executing the code
  }
}
function fireBigBeamDown(newEnemyTile) {
  let affectedTiles = [];

  if (newEnemyTile === "r2-c2") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(6);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow + 1; i <= endRow; i++) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireDown");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r2-c5") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(6);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow + 1; i <= endRow; i++) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireDown");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r2-c8") {
    let enemyBeamTimer = setTimeout(() => {
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(6);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow + 1; i <= endRow; i++) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireDown");
    }, 500); // Initial delay of 500ms before executing the code
  } else if (newEnemyTile === "r2-c11") {
    let enemyBeamTimer = setTimeout(() => {
      if (gameOver) {
        clearTimeout(enemyBeamTimer);
      }
      let startRow = parseInt(newEnemyTile.charAt(1));
      let endRow = parseInt(6);
      let column = parseInt(newEnemyTile.substring(4));

      for (let i = startRow + 1; i <= endRow; i++) {
        affectedTiles.push("r" + i + "-c" + (column - 1));
        affectedTiles.push("r" + i + "-c" + column);
        affectedTiles.push("r" + i + "-c" + (column + 1));
      }
      damageBigBeamTiles(affectedTiles, "fireDown");
    }, 500); // Initial delay of 500ms before executing the code
  }
}

function fireBigBeamLeft(newEnemyTile) {
  let affectedTiles = [];
  if (newEnemyTile === "r2-c11") {
    let row = parseInt(newEnemyTile.charAt(1));
    let startColumn = parseInt(newEnemyTile.substring(4));
    let endColumn = parseInt(1);
    for (let i = startColumn - 1; i >= endColumn; i--) {
      affectedTiles.push("r" + (row - 1) + "-c" + i);
      affectedTiles.push("r" + row + "-c" + i);
      affectedTiles.push("r" + (row + 1) + "-c" + i);
    }
    damageBigBeamTiles(affectedTiles, "fireLeft");
  } else if (newEnemyTile === "r5-c11") {
    let row = parseInt(newEnemyTile.charAt(1));
    let startColumn = parseInt(newEnemyTile.substring(4));
    let endColumn = parseInt(1);
    for (let i = startColumn - 1; i >= endColumn; i--) {
      affectedTiles.push("r" + (row - 1) + "-c" + i);
      affectedTiles.push("r" + row + "-c" + i);
      affectedTiles.push("r" + (row + 1) + "-c" + i);
    }
    damageBigBeamTiles(affectedTiles, "fireLeft");
  }
}
function fireBigBeamRight(newEnemyTile) {
  let affectedTiles = [];
  if (newEnemyTile === "r2-c2") {
    let row = parseInt(newEnemyTile.charAt(1));
    let startColumn = parseInt(newEnemyTile.substring(4));
    let endColumn = parseInt(12);
    for (let i = startColumn + 1; i <= endColumn; i++) {
      affectedTiles.push("r" + (row - 1) + "-c" + i);
      affectedTiles.push("r" + row + "-c" + i);
      affectedTiles.push("r" + (row + 1) + "-c" + i);
    }

    damageBigBeamTiles(affectedTiles, "fireRight");
  } else if (newEnemyTile === "r5-c2") {
    let row = parseInt(newEnemyTile.charAt(1));
    let startColumn = parseInt(newEnemyTile.substring(4));
    let endColumn = parseInt(12);
    for (let i = startColumn + 1; i <= endColumn; i++) {
      affectedTiles.push("r" + (row - 1) + "-c" + i);
      affectedTiles.push("r" + row + "-c" + i);
      affectedTiles.push("r" + (row + 1) + "-c" + i);
    }

    damageBigBeamTiles(affectedTiles, "fireRight");
  }
}

function damageBigBeamTiles(affectedTiles, directionSelected) {
  for (let j = 0; j < affectedTiles.length; j++) {
    let delayTimer = setTimeout(() => {
      //  cancel under condition
      let damageTile = document.querySelector("." + affectedTiles[j]);
      let originalColor = "#008b8a";

      damageTile.style.backgroundColor = "lightsalmon";

      let damageTileTimer = setTimeout(() => {
        if ((j + 2) % 3 === 0) {
          if (directionSelected === "fireUp") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              j === 1
                ? "laserBeam bigLaserBeamVerticalStartFireUp"
                : j === affectedTiles.length - 1
                ? "laserBeam bigLaserBeamVerticalEndFireUp"
                : "laserBeam bigLaserBeamVertical";
            damageTile.append(laserBeam);
          } else if (directionSelected === "fireDown") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              j === 1
                ? "laserBeam bigLaserBeamVerticalStartFireDown"
                : j === affectedTiles.length - 1
                ? "laserBeam bigLaserBeamVerticalEndFireDown"
                : "laserBeam bigLaserBeamVertical";

            damageTile.append(laserBeam);
          } else if (directionSelected === "fireLeft") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              j === 1
                ? "laserBeam bigLaserBeamHorizontalStartFireLeft"
                : j === affectedTiles.length - 1
                ? "laserBeam bigLaserBeamHorizontalEndFireLeft"
                : "laserBeam bigLaserBeamHorizontal";

            damageTile.append(laserBeam);
          } else if (directionSelected === "fireRight") {
            let laserBeam = document.createElement("div");
            laserBeam.className =
              j === 1
                ? "laserBeam bigLaserBeamHorizontalStartFireRight"
                : j === affectedTiles.length - 1
                ? "laserBeam bigLaserBeamHorizontalEndFireRight"
                : "laserBeam bigLaserBeamHorizontal";

            damageTile.append(laserBeam);
          }
        }
        damageTile.style.backgroundColor = originalColor; // Revert back to original color

        if (affectedTiles[j] === playerPosition && !gameOver) {
          loseGame(-1);
        }
      }, 500); // Revert back to original color after 500ms
    }, 500); // Delay each iteration by 500ms
  }
}

// ----------Octo-Slash------------------

function performOctoSlash(enemyClass, enemyIndex, enemyType, hitsRemaining) {
  const foundEnemy = bossEnemyPositions.find(
    (item) => item.enemyClass === enemyClass.substring(1)
  );
  if (gameOver) {
    return;
  }
  if (
    (enemyIndex === 0 && hitsRemaining && hitsRemaining !== bossHealth) ||
    bossEnemyPositions[enemyIndex].hitsRemaining === 0
  ) {
    return;
  }
  if (foundEnemy && foundEnemy.isAlive === false) {
    return;
  }

  possibleStartPositions = ["r3-c4", "r3-c6", "r3-c8"];

  let startingAttackPosition =
    possibleStartPositions[
      Math.floor(Math.random() * possibleStartPositions.length)
    ];
  let currentEnemyPosition = document.querySelector(enemyClass);
  currentEnemyPosition.remove();
  let newEnemyTile = document.querySelector("." + startingAttackPosition);
  let newBossEnemyImg = document.createElement("img");
  newBossEnemyImg.src =
    enemyClass === ".bossImg"
      ? "./image/samuraiDoge.png"
      : "./image/shadowSamuraiDoge.png";
  newBossEnemyImg.className =
    enemyClass.substring(1) + " " + startingAttackPosition + " " + enemyType;
  if (foundEnemy) {
    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === enemyClass.substring(1)) {
        return {
          ...item,
          position: startingAttackPosition,
          isMoving: false,
        };
      } else {
        return item;
      }
    });
  }
  newEnemyTile.append(newBossEnemyImg);

  let mainAxisTiles = [];
  let offAxisTiles = [];

  if (startingAttackPosition === "r3-c4") {
    mainAxisTiles = [
      "r3-c2",
      "r3-c3",
      "r3-c5",
      "r3-c6",
      "r5-c4",
      "r4-c4",
      "r2-c4",
      "r1-c4",
    ];
    offAxisTiles = [
      "r5-c2",
      "r4-c3",
      "r2-c5",
      "r1-c6",
      "r1-c2",
      "r2-c3",
      "r4-c5",
      "r5-c6",
    ];
  } else if (startingAttackPosition === "r3-c6") {
    mainAxisTiles = [
      "r3-c4",
      "r3-c5",
      "r3-c7",
      "r3-c8",
      "r5-c6",
      "r4-c6",
      "r2-c6",
      "r1-c6",
    ];
    offAxisTiles = [
      "r5-c4",
      "r4-c5",
      "r2-c7",
      "r1-c8",
      "r1-c4",
      "r2-c5",
      "r4-c7",
      "r5-c8",
    ];
  } else if (startingAttackPosition === "r3-c8") {
    mainAxisTiles = [
      "r3-c6",
      "r3-c7",
      "r3-c9",
      "r3-c10",
      "r5-c8",
      "r4-c8",
      "r2-c8",
      "r1-c8",
    ];
    offAxisTiles = [
      "r5-c6",
      "r4-c7",
      "r2-c9",
      "r1-c10",
      "r1-c6",
      "r2-c7",
      "r4-c9",
      "r5-c10",
    ];
  }

  // Loop for main axis tiles
  for (let j = 0; j < mainAxisTiles.length; j++) {
    let delayTimer = setTimeout(() => {
      if (bossEnemyPositions[enemyIndex]?.isAlive === false) {
        clearTimeout(delayTimer);
        return;
      }

      let damageTile = document.querySelector("." + mainAxisTiles[j]);
      let originalColor = "#008b8a";

      damageTile.style.backgroundColor = "lightsalmon";

      let damageTileTimer = setTimeout(() => {
        if (bossEnemyPositions[enemyIndex]?.isAlive === false) {
          damageTile.style.backgroundColor = originalColor;
          clearTimeout(damageTileTimer);
          return;
        }
        let swordEffectContainer = document.createElement("div");
        swordEffectContainer.className = "swordEffectContainer";

        let swordSlashEffect = document.createElement("div");
        swordSlashEffect.className = "swordSlashEffect";

        let swordSlashEffectLine = document.createElement("div");
        swordSlashEffectLine.className =
          j < 4 ? "horizontalSlashEffectLine" : "verticalSlashEffectLine";

        swordSlashEffect.appendChild(swordSlashEffectLine);
        swordEffectContainer.appendChild(swordSlashEffect);
        damageTile.appendChild(swordEffectContainer);

        damageTile.style.backgroundColor = originalColor; // Revert back to original color

        // Remove the swordEffectContainer after the animation ends
        swordSlashEffect.addEventListener("animationend", () => {
          swordEffectContainer.remove();
        });

        if (mainAxisTiles[j] === playerPosition && !gameOver) {
          loseGame(-1);
        }
      }, 500);
    }, 500); // Delay each iteration by 500ms
  }

  // Loop for off-axis tiles
  for (let k = 0; k < offAxisTiles.length; k++) {
    let delayTimer = setTimeout(() => {
      if (bossEnemyPositions[enemyIndex]?.isAlive === false) {
        clearTimeout(delayTimer);
        return;
      }
      let damageTile = document.querySelector("." + offAxisTiles[k]);
      let originalColor = "#008b8a";

      damageTile.style.backgroundColor = "lightsalmon";
      let damageTileTimer = setTimeout(() => {
        if (bossEnemyPositions[enemyIndex]?.isAlive === false) {
          damageTile.style.backgroundColor = originalColor;
          clearTimeout(damageTileTimer);
          return;
        }
        let swordEffectContainer = document.createElement("div");
        swordEffectContainer.className = "swordEffectContainer";

        let swordSlashEffect = document.createElement("div");
        swordSlashEffect.className = "swordSlashEffect";

        let swordSlashEffectLine = document.createElement("div");
        swordSlashEffectLine.className =
          k < 4 ? "diagonalSlashBLTRLine" : "diagonalSlashTLBRLine";

        swordSlashEffect.appendChild(swordSlashEffectLine);
        swordEffectContainer.appendChild(swordSlashEffect);
        damageTile.appendChild(swordEffectContainer);

        damageTile.style.backgroundColor = originalColor; // Revert back to original color

        // Remove the swordEffectContainer after the animation ends
        swordSlashEffect.addEventListener("animationend", () => {
          swordEffectContainer.remove();
        });

        if (offAxisTiles[k] === playerPosition && !gameOver) {
          loseGame(-1);
        }
      }, 500);
    }, 1000); // Delay each iteration by 1000ms
  }
}
// --------------end boss-----------

// ------------start ending --------
function startEnding() {
  gameOver = true;
  calculateScore();
  let shadowClonesTargeted = document.querySelectorAll("img.dogeClone");
  shadowClonesTargeted.forEach((shadowClone) => {
    let shadowClonePosition = shadowClone.classList[1];
    let shadowCloneClass = shadowClone.classList[0];
    let enemyPositionTile = document.querySelector("." + shadowClonePosition);

    let allShadowCloneClass = document.querySelectorAll("." + shadowCloneClass);

    allShadowCloneClass.forEach((img) => {
      img.remove();
    });

    bossEnemyPositions = bossEnemyPositions.map((item) => {
      if (item.enemyClass === shadowCloneClass) {
        return {
          ...item,
          position: null,
          isAlive: false,
          hitsRemaining: 0,
        };
      } else {
        return item;
      }
    });

    let shadowCloneDeathImg = document.createElement("img");
    shadowCloneDeathImg.className = shadowCloneClass;
    shadowCloneDeathImg.src = "./image/smoke.png";

    enemyPositionTile.append(shadowCloneDeathImg);

    setTimeout(() => {
      shadowCloneDeathImg.remove();
    }, 750);
  });
  endingEl.style.display = "flex";
  mainEl.classList.add("fadeOut");

  musicCount = 2; // Index of the boss song
  audio.src = musicArray[musicCount].song; // Change the audio source to boss song

  if (musicToggleStatus) {
    audio.play();
  }

  let endingSceneContainer = document.createElement("div");
  endingSceneContainer.className = "endingSceneContainer";

  let cardboardCat = document.createElement("img");
  cardboardCat.src = "./image/cardboardCat.png";
  cardboardCat.className = "cardboardCat";

  let endHeader = document.createElement("div");
  endHeader.textContent = "The End";
  endHeader.className = "endingHeader";
  endingEl.append(endHeader);

  endingSceneContainer.append(cardboardCat);
  endingEl.append(endingSceneContainer);

  function createStar() {
    const star = document.createElement("div");
    star.className = "star";
    // Set random positions and sizes for the stars
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.width = Math.random() * 4 + "px";
    star.style.height = star.style.width;
    return star;
  }

  function addStars(numStars) {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(createStar());
    }
    return stars;
  }

  function createStarLayers(numLayers) {
    for (let i = 0; i < numLayers; i++) {
      const starLayer = document.createElement("div");
      starLayer.className = "star-layer";
      starLayer.style.animationDelay = `-${i * 3}s`; // Stagger the animation for each layer

      const stars = addStars(100); // Adjust the number of stars as needed
      stars.forEach((star) => starLayer.appendChild(star)); // Add all stars to the layer

      endingSceneContainer.appendChild(starLayer);
    }
  }

  createStarLayers(3); // Adjust the number of layers as needed for a continuous effect
}

// ------------end ending ---------

// ----------------start highscores logic-------------

function createHighscoresBoard() {
  let highscoresBoard = document.createElement("div");
  highscoresBoard.className = "highscoresBoard";
  document.body.appendChild(highscoresBoard);
}

createHighscoresBoard();

function getHighscores() {
  fetch("/api/highscores")
    .then((res) => res.json())
    .then((data) => {
      highscoresData = data;
      lowestHighscore = data[data.length - 1] || 0;
      highscoresCount = data.length;
      displayHighscores(data);
    });
}

getHighscores();

function displayHighscoresIcon() {
  let highscoresIconImg = document.createElement("img");
  highscoresIconImg.className = "highscoresIconImg";
  highscoresIconImg.src = "./image/highscores.png";

  highscoresEl.append(highscoresIconImg);
}

displayHighscoresIcon();

highscoresEl.addEventListener("click", displayHighscoresBoard);

function displayHighscoresBoard() {
  let highscoresBoard = document.querySelector(".highscoresBoard");
  if (showHighscoresBoard) {
    highscoresBoard.style.display = "none";
    showHighscoresBoard = false;
  } else {
    highscoresBoard.style.display = "block";
    showHighscoresBoard = true;
  }
}

function displayHighscores(highscores) {
  let highscoresBoard = document.querySelector(".highscoresBoard");
  highscoresBoard.innerHTML = "";

  let topScoresLabel = document.createElement("div");
  topScoresLabel.className = "topScoresLabel";
  topScoresLabel.textContent = "Top 100";

  highscoresBoard.append(topScoresLabel);

  highscores.forEach((element, index) => {
    let scoreRow = document.createElement("div");
    scoreRow.className = "scoreRow";

    let indexDiv = document.createElement("div");
    indexDiv.className = "scoreIndex";
    indexDiv.textContent = index + 1 + ".";
    indexDiv.style.flex = "1";

    let userNameDiv = document.createElement("div");
    userNameDiv.className = "scoreUserName";
    userNameDiv.textContent = element.userName;
    userNameDiv.style.flex = "2";

    let scoreDiv = document.createElement("div");
    scoreDiv.className = "scoreScore";
    scoreDiv.textContent = element.score;
    scoreDiv.style.flex = "1";

    scoreRow.append(indexDiv, userNameDiv, scoreDiv);

    highscoresBoard.append(scoreRow);
  });
}
// ----------------end highscores logic---------------

// TODO finish ending
