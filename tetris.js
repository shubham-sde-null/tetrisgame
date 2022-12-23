// const grid = document.getElementById("grid");
// let data0;
// for (let i = 0; i < 200; i++) {
//     data0 = document.createElement("div");
//     data0.innerHTML = "";
//     grid.append(data0);
// }
// I can ceate 200n div using this way instead of writing inside html

const grid = document.querySelector(".grid");
let count = 0;

const width = 10; //I have made this variable to simply the calculations

// this variable is used to shift the position of our tetris element to anywhere we want
let squares = Array.from(document.querySelectorAll(".grid div"));
// here I am selecting all the boxes and putting them inside an array, now because of using array all the div's got a particular index number which will be helpful in selecting particular div and then applying effect on them
const score = document.getElementById("score");
const startBtn = document.getElementById("start-button");
const btnImg = document.getElementById("btnImg");

// arrow buttons

const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const downBtn = document.getElementById("down");
const rotateBtn = document.getElementById("rotate");

// colour
const colour = ["red", "blue", "green", "yellow", "purple"];
// const colour = ["#FF3353", "#A03EFF", "33FFD1", "FFE833", "15e915"];

// rough code

// for (i = 0; i < 200; i++) {
//     squares[i].textContent = count;
//     count++;
// }

// this is just rough code which will display the numbers in each squares with the help of this code I can create shapes our tetris.
//there are 5 shapes in our tetris game which are:
//1)L   2)O     3)S  4)T    5)I  this shapes rotates and makes different designs, and each can be rotate in four direction which meanss I have to make total 20 such shapes

// Shapes for each type of shape

const lshape = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
]; //here for l shape I have selected those div which will give me l shape from our main array i.e squares and then I am going to apply the background color to see the result in better way
const zshape = [
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
];
const tshape = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];
const oshape = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];
const ishape = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theShapes = [lshape, zshape, oshape, tshape, ishape];

let currentPosition = 6;
let currentRotation = 0;

// randomly selecting shapes
let random = Math.floor(Math.random() * theShapes.length);
let currentShape = theShapes[random][currentRotation];

// draw the shapes
function draw() {
  currentShape.forEach((index) => {
    squares[currentPosition + index].style.background = colour[random];
    // by adding currentPosition to array element what will happen is the number will get added in each of the array element ex: 4+[1,11,20,2]=[5,15,24,6] and this new array elements will change the background color of specify div's
  });
}
draw();
// here we want to make our tetris move from the first row what was happening is, our tetris is moving from the second row because currentPosition is becoming 14 at the setInterval function but we want it to be 4 initially to move from the first row

//erase the shapes
function erase() {
  currentShape.forEach((index) => {
    squares[currentPosition + index].style.background = ""; // earlier we were giving background color to the elements which are div, but over here we will not give any color to them in erase function
  });
}

//move down
function moveDown() {
  erase();
  currentPosition += width;
  draw();
  stop();
}
// draw();
var timer = setInterval(moveDown, 1000);

// stop the shapes when they reach bottom
function stop() {
  if (
    currentShape.some((index) =>
      squares[currentPosition + index + width].classList.contains("freeze")
    )
  ) {
    currentShape.forEach((index) =>
      squares[currentPosition + index].classList.add("freeze")
    );
    random = Math.floor(Math.random() * theShapes.length);
    currentRotation = 0;
    currentShape = theShapes[random][currentRotation];
    currentPosition = 4;
    draw();
    gameOver();
    addScore();
  }
}
// control the game
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  } else if (e.keyCode === 32) {
    rotate();
  }
}
window.addEventListener("keydown", control);

//control shapes in phone
leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
downBtn.addEventListener("click", moveDown);
rotateBtn.addEventListener("click", rotate);

// moveleft function
function moveLeft() {
  erase();
  let LeftBlockage = currentShape.some(
    (index) => (currentPosition + index) % width === 0
  );
  let Blockage = currentShape.some((index) =>
    squares[currentPosition + index - 1].classList.contains("freeze")
  );

  if (!LeftBlockage && !Blockage) {
    currentPosition--;
  }
  draw();
}
// moveRight function
function moveRight() {
  erase();
  let RightBlockage = currentShape.some(
    (index) => (currentPosition + index) % width === width - 1 //yaha par remainder 9 ayga extreme right side main
  );
  let Blockage = currentShape.some((index) =>
    squares[currentPosition + index + 1].classList.contains("freeze")
  );

  if (!RightBlockage && !Blockage) {
    currentPosition++;
  }
  draw();
}

// Rotate function
function rotate() {
  erase();
  currentRotation++;
  if (currentRotation === 4) {
    currentRotation = 0;
  }
  currentShape = theShapes[random][currentRotation];
  draw();
}

// add functionality to pause button
function pause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    btnImg.src = "./img/play.png";
  } else {
    draw();
    timer = setInterval(moveDown, 1000);
    btnImg.src = "./img/pause.png";
  }
}
startBtn.addEventListener("click", pause);

//game over function

function gameOver() {
  if (
    currentShape.some((index) =>
      squares[currentPosition + index].classList.contains("freeze")
    )
  ) {
    score.innerHTML = "Game Over";
    clearInterval(timer);
    window.alert("game is over, click ok to play again");
    location.reload();
  }
}

// add score
function addScore() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    if (row.every((index) => squares[index].classList.contains("freeze"))) {
      count += 10;
      score.textContent = `score:${count}`;
      row.forEach((index) => {
        squares[index].classList.remove("freeze");
        squares[index].style.background = "";
      });
      const squareRemoved = squares.splice(i, width);
      squares = squareRemoved.concat(squares);
      squares.forEach((square) => grid.appendChild(square));
    }
  }
}
