let mainEl = document.getElementsByTagName("main")[0];

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

function placePlayer1() {
  let startingTile = document.querySelector(".r6-c6");
  let catImg = document.createElement("img");
  catImg.className = "catImg r6-c6";
  catImg.src = "./image/cat.png";
  startingTile.append(catImg);
}

placePlayer1();

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
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

function moveUp() {
  let catImg = document.querySelector(".catImg");
  let catPosition = catImg.classList[1];
  let row = catPosition.split("-")[0].substring(1);
  let column = catPosition.split("-")[1].substring(1);
  if (row > 1) {
    let newPosition = "r" + (parseInt(row) - 1) + "-c" + column;
    console.log(newPosition);
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
    console.log(newPosition);
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
    console.log(newPosition);
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
    console.log(newPosition);
    catImg.remove();
    let newCatImg = document.createElement("img");
    newCatImg.className = "catImg " + newPosition;
    newCatImg.src = "./image/cat.png";
    let nextTile = document.querySelector("." + newPosition);
    nextTile.append(newCatImg);
  }
}
