
let simonHTML = {
    power : document.querySelector('.powerButton'),
    strictButton : document.getElementById('strict'),
    startButton : document.getElementById('start'),
    displayScore : document.getElementById('score')
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
const colorFlashPeriod = 1000; // in ms
function showMoves() {
    var moveCounter = 0; 
    const timeoutCount = game.computerMoves.length * 2; 
    (function nextColor() {
        var move = game.computerMoves[moveCounter >> 1]; 
        move.style.backgroundColor = colors[(moveCounter++) & 1].get(move);
        if (moveCounter < timeoutCount) { setTimeout(nextColor, colorFlashPeriod) }
    })();
}

simonHTML.power.addEventListener('click', turnOn);          