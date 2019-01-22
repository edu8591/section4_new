/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
- Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
- After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added 
- to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
(function(){
    
    //this will be where the averall score for each player is
    var scores = [];
    //the round score for the active player
    var roundScore;
    //the active player, it will set the the values to the scores arr, so it should be 0 or 1
    var activePlayer;
    //will hold the dice number to get the correct dice image
    var dice;
    init()

    //object to store all dom strings
    var selectors = {
        rollBtn: document.querySelector('.btn-roll'),
        btnHold: document.querySelector('.btn-hold'),
        current: document.querySelector('#current-' + activePlayer),
        score: document.querySelector('#score-' + activePlayer),
        die: document.querySelector('.dice').src = 'dice-' + dice + '.png',
        player: document.querySelector('.player-' + activePlayer + '-panel'),
        new: document.querySelector(".btn-new")
    };

    if (scores[0] >= 100 || scores[1] >= 100){

    } else if(scores[0] === 0 && scores[1] === 0){
    //function to generate random number from 1-6, also modifies the die image
    



    selectors.btnHold.addEventListener('click', holdBtn);
    selectors.rollBtn.addEventListener('click', rollDice);
    selectors.new.addEventListener('click', init);

    }
    function rollDice() {
        //random value is stored into the dice variable
        dice = Math.ceil(Math.random() * 6);
        //change the die image to the one corresponding to the actual die roll
        die = document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //check if a player can continue rolling dice and adds the score for his turn
        //when getting a 1 total score will not vary, roundscore will be 0, and it will
        //become next players turn
        if (dice > 1) {
            roundScore += dice;
            selectors.current.textContent = roundScore;
            console.log('dice is: ' + dice);
            console.log('roundScore is :' + roundScore);
            console.log('current player :' + activePlayer);
        } else{
            nextPlayer();
        }
    }

    //changes the active players
    function nextPlayer() {
        roundScore = 0;
        //remove the active class from previous player to change CSS
        selectors.player.classList.remove('active');
        console.log(selectors.player);
        //changes the value of active player to modify scores and domstrings
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        //sets the new player html class to active to change CSS
        selectors.player = document.querySelector('.player-' + activePlayer + '-panel');
        //sets the new player html class to active to change CSS
        selectors.player.classList.add('active');
        //sets previous player current score back to 0
        selectors.current.textContent = roundScore;
        //modifies current score domstring so that it will point to the new player's
        selectors.current = document.querySelector('#current-' + activePlayer);
        //modifies the score domstring so that it will point to the new player's
        selectors.score = document.querySelector('#score-' + activePlayer);
    }

    //add the current score to the score of the current player and switches to the next player
    function holdBtn() {
        scores[activePlayer] += roundScore;

        if(scores[activePlayer] >= 100) { //modify to set rules
            alert('Player ' + activePlayer + ' won the game!')
        } else {
            selectors.score.textContent = scores[activePlayer];
            nextPlayer();
        }
    }

    function init() {
        scores[0] = 0;
        scores[1] = 0;
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;
        document.querySelector('#score-0').textContent = 0;
        document.querySelector('#score-1').textContent = 0;
        if (!document.querySelector('.player-0-panel').className.match('active')) { 
            document.querySelector('.player-0-panel').classList.add('active')
        }
        if (document.querySelector('.player-1-panel').className.match('active')) {
            document.querySelector('.player-1-panel').classList.remove('active')
        }
        document.querySelector('.dice').style.display = 'hide';
        activePlayer = 0;
        roundScore = 0;
        dice = 1;
    }
})()