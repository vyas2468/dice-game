/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Section 4: JS in the Browser: DOM Manipulation and Events, 48:
- How to create our fundamental game variables;
- How to generate a random number;
- How to manipulate the DOM;
- How to read from the DOM;
- How to change CSS Styles;

*/


let scores, roundScore, activePlayer, gamePlaying;

/*
THE BELOW WILL GO IN THE INIT FUNCTION 

scores = [0,0];
roundScore = 0;
activePlayer = 0; 
*/

// call the init function
init();

document.querySelector('.dice').style.display = 'none';

/*
getElementByID() faster than querySelector for
we dont use # symbol. just put name in there
set textContent to 0
so we set all 4 values to 0 LIKE THE BELOW BUT ALL THESE WILL GO INTO OUR INIT() FUNCTION

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    // only want all of this to happen if we are playing a game. during our game this needs to be true. 
    // The code inside the if happens only if the game is still playing. after the game is finished, no matter how many times you push this button, it will not do anything.
    if (gamePlaying) {

        // 1. Random Number when someone clicks the button
        // Dont need the dice variable outside of the function
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round Score IF the rolled number was NOT a 1
        // can also say if dice is different from 1 or greater than 1
        if(dice !== 1) {
            // Add score 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player 
            nextPlayer();
        }
    }  
});

/*
we need to hold our points and update the scores in our interface
setup an eventListner for the other buttom


*/


document.querySelector('.btn-hold').addEventListener('click', function() 
{
    if (gamePlaying) 
    {
        // score will be - add score that the player got in this round to the socre they already had. below is score of ative player = score[activePlayer] that the palyer already had + roundScore
        scores[activePlayer] += roundScore; 

        // Update the UI (print number by performing DOM Manipulation)
        // we are constructing our string name using the activePlayer variable So we dont have to write score-0 or score-1.
        // so now we have activePlayer score selected in the UI now we need to change the content using the textContent method
        // go into scores array and then select points from the activePlayer. if first player it will be first element of array and if secondPlayer then second element of array
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        // Check if player won the game
        if (scores[activePlayer] >= 20) 
        {
            // display the winner. replace Player 1 or Player 2 for winner. id = name if player wins the game we want below to happen. if no winner, we want the else block to happen
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            // Dice not visible anymore
            document.querySelector('.dice').style.display = 'none';
            // applying the winner class to the player panel (activePlayer) that won the game
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // also remove the active class from the panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // after player won change state to false
            gamePlaying = false;

        } else 
        {
            // nextplayer to paly the game only if no winner
            // need to change activePlayer once you hit the hold button
            // used in first eventListener so we can use that but we apply DRY by implementing a new function
            nextPlayer();
        }

    }
    
 

})

document.querySelector('.btn-new').addEventListener('click', init);

/*
// Implementing new game functionality using eventListener 
document.querySelector('.btn-new').addEventListener('click', function() {
    
    // reset player scores
    // scores = [0,0];
    // activePlayer reverts back to Zero as thats the player that starts
    // activePlayer = 0;
    // if there was any roundScore left, we also need that back to Zero
    // roundScore = 0;
    // AS WE HAVE THIS AT THE TOP BETTER TO USE A FUNCTION AND IT WILL BE AN INIT FUNCTION AS ITS THE INITIALISE FUNCTION 
    
    // we can just call the init() like this: 
    // init(); 
    
    // but there is another way of doing this instead of crating an anonymous function to call another function, you can just let the eventListener call that function for you (see below)

})
*/

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 
    // set to true when start the game
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // change back player names from winner etc.
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // remove winner class and active class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    // make player 1 active player again
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}


// function next players turn if user chooses to hold his points. 
// in first eventListner we had the same code when the user scored 1. 
// doesnt return any result or take parameters to avoid repeating our code. we can call this function in the eventListeners relevant sections
function nextPlayer() {
    // Next player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0;

    // as soon as player rolls a 1 he looses the current score. so should be set to zero in the user-interface like the below. 
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // if rolls 1 then we want to hide the dice from the screen
    document.querySelector('.dice').style.display = 'none';

}





            