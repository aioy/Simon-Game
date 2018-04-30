
const simonHTML = {
    power : document.querySelector('.powerButton'),
    strictButton : document.getElementById('strict'),
    startButton : document.getElementById('start'),
    displayScore : document.getElementById('score'),
    colors : document.getElementsByClassName('color')
  }
  
const game = {
  on : false,
  start : false,
  strict : false,
  playerTurn : false,
  turn : 1,
  score : 0,
  counter : 0,
  computerMoves : [],
  playerMoves : [],
  colors : [greenBox = document.getElementById('green'), 
  blueBox = document.getElementById('blue'), 
  yellowBox = document.getElementById('yellow'), 
  redBox = document.getElementById('red')]
}
  
//move the purple div back and forth
function turnOn () {
  if(!game.on){
    simonHTML.power.classList.add('moveRight');
    simonHTML.power.classList.remove('moveLeft')
    game.on = true;
    simonHTML.displayScore.textContent = game.score.toString();
  }  
  else if(game.on){ 
    simonHTML.power.classList.remove('moveRight');
    simonHTML.power.classList.add('moveLeft'); 
    game.on = false; 
    game.turn = 1;
    game.score = 0
    game.counter = 0;
    resetMoves();
    simonHTML.strictButton.style.backgroundColor = 'red';
    simonHTML.startButton.style.backgroundColor = 'red';
    game.start = false;
    game.strict = false;
    simonHTML.displayScore.textContent = '-';
    } 
  }

function randomMoves (num) {
  for(let i = 0; i < num; i++){
    let moves = game.colors[Math.floor(Math.random() * game.colors.length)]
    game.computerMoves.push(moves);
    console.log(game.computerMoves);
  }
  return game.computerMoves;
}

function resetMoves () {
  game.computerMoves = [];
  game.playerMoves = [];
}

const colors = [
  new Map([[game.colors[0], "lime"], [game.colors[2], "#FF6"], [game.colors[1], "dodgerblue"], [game.colors[3], "salmon"]]),
  new Map([[game.colors[0], "green"], [game.colors[2], "#CC0"], [game.colors[3], "red"], [game.colors[1], "blue"]])
];

const sounds = {
  green : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  yellow : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  red : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
};


function showMoves() {
  let i = 0;
  game.playerTurn = false;
  const start = setInterval(function() {
    if(!game.on){
      clearInterval(start);
    }
    if (i >= game.computerMoves.length) {
      clearInterval(start);
      game.playerTurn = true;
      return;
    }

    const move = game.computerMoves[i];
    setLight(move, true);
    setTimeout(setLight.bind(null, move, false), 1000); //Using bind to preset arguments
      
    i++;
  }, 2000);
}

function setLight(color, isOn) {
  if(isOn){
    sounds[color.id].play();
  }
  color.style.backgroundColor = isOn ? colors[0].get(color) : colors[1].get(color);
}

function compareMoves(e){
  if(e === game.computerMoves[game.counter]){
    game.counter++;
    if(game.playerMoves.length === game.computerMoves.length && e === game.computerMoves[game.computerMoves.length-1]){
      simonHTML.displayScore.textContent = ++game.score;
      resetMoves();
      randomMoves(++game.turn);
      showMoves();
      game.counter = 0;
    }
  } else if(game.strict) {
    game.counter = 0;
    game.turn = 0;
    game.score = 0;
    simonHTML.displayScore.textContent = game.score;
    resetMoves();
    randomMoves(++game.turn);
    showMoves();

  } else {
    game.playerMoves = [];
    game.counter = 0;
    showMoves();
  }
}

function playerMoveDown(e){
  if(game.playerTurn){
    e.target.style.backgroundColor = colors[0].get(e.target);
    let color = e.target.id;
    let compare = e.target;
    sounds[color].play();
    game.playerMoves.push(e.target);
    compareMoves(compare);
  }
}

function playerMoveUp(e){
  e.target.style.backgroundColor = colors[1].get(e.target);
}

for (let i = 0; i < simonHTML.colors.length; i++){
  simonHTML.colors[i].addEventListener('mousedown', playerMoveDown);
  simonHTML.colors[i].addEventListener('mouseup', playerMoveUp);
}

//for purple button
simonHTML.power.addEventListener('click', turnOn);  

simonHTML.strictButton.addEventListener('click', function(){
  if(game.on){
    if(!game.strict){
      simonHTML.strictButton.style.backgroundColor = 'green';
      game.strict = true;
    } else if(game.strict){
      simonHTML.strictButton.style.backgroundColor = 'red';
      game.strict = false;
    }
  }
});

simonHTML.startButton.addEventListener('click', function(){
  if(game.on){
    if(!game.start){
      game.start = true;
      simonHTML.startButton.style.backgroundColor = 'green';
      randomMoves(game.turn);
      showMoves();
    } else if (game.start){
      game.start = false;
      simonHTML.startButton.style.backgroundColor = 'red';
      resetMoves();
      game.turn = 1;
      game.score = 0;
      simonHTML.displayScore.textContent = game.score;
    }
  } 
});