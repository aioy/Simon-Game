
let simonHTML = {
    power : document.querySelector('.powerButton'),
    strictButton : document.getElementById('strict'),
    startButton : document.getElementById('start'),
    displayScore : document.getElementById('score')
  }
  
  let game = {
    on : false,
    start : false,
    strict : false,
    score : 0,
    computerMoves : [],
    playerMoves : [],
    colors : [green, blue, yellow, red]
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

  function random () {
    let moves = game.colors[Math.floor(Math.random() * game.colors.length)]
    game.computerMoves.push(moves);
    return game.computerMoves;
  }

  
  
  simonHTML.power.addEventListener('click', turnOn);          