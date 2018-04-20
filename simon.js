
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

  function showMoves() {

    let i = -1;
    let c = -1;

    const start = setInterval(function() {
        if (i >= game.computerMoves.length - 1) {
            clearInterval(start);
        }

        console.log(i + 'start ' + game.computerMoves.length);

        const showColors = new Map([
            [green, 'lime'],
            [yellow, 'rgb(255,255,102)'],
            [blue, 'dodgerblue'],
            [red, 'salmon'],
        ]);

        i++;

        let move = game.computerMoves[i];

        move.style.backgroundColor = showColors.get(move);
        //revert the colors that were changed in showMoves
        //put at 2 seconds to change after showMoves is done
        const stop = setTimeout(function() {

            console.log(c + 'stop ' + game.computerMoves.length);

            if (c >= game.computerMoves.length - 1) {
                clearInterval(stop);

            }
            const colorKey = new Map([
                [green, 'green'],
                [yellow, 'rgb(204,204,0)'],
                [red, 'red'],
                [blue, 'blue']
            ]);

            c++;

            let move = game.computerMoves[c];

            move.style.backgroundColor = colorKey.get(move);
        }, 1000);
    }, 2000);
}


simonHTML.power.addEventListener('click', turnOn);          