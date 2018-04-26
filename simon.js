
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
    score : 0,
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
        simonHTML.displayScore.textContent = '-';
    } 
  }

  function randomMoves (num) {
    for(let i = 0; i < num; i++){
      let moves = game.colors[Math.floor(Math.random() * game.colors.length)]
      game.computerMoves.push(moves);
    }
    return game.computerMoves;
  }

  function resetMoves () {
    game.computerMoves = [];
  }

const colors = [
  new Map([[green, "lime"], [yellow, "#FF6"], [blue, "dodgerblue"], [red, "salmon"]]),
  new Map([[green, "green"], [yellow, "#CC0"], [red, "red"], [blue, "blue"]])
];

const sounds = {
  green : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  yellow : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  red : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
};


function showMoves() {
  let i = 0;

  const start = setInterval(function() {
      if (i >= game.computerMoves.length) {
          clearInterval(start);
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
  let b = 0;
  if(e === simonHTML.colors[b]){
    b++;
    return true;
  } else {
    return false;
  }
}

function playerMoveDown(e){
  e.target.style.backgroundColor = colors[0].get(e.target);
  let color = e.target.id;
  sounds[color].play();
  return game.playerMoves.push(e.target);
}

function playerMoveUp(e){
  e.target.style.backgroundColor = colors[1].get(e.target);
}

for (let i = 0; i < simonHTML.colors.length; i++){
  simonHTML.colors[i].addEventListener('mousedown', playerMoveDown);
  simonHTML.colors[i].addEventListener('mouseup', playerMoveUp);
}
 

simonHTML.power.addEventListener('click', turnOn);          