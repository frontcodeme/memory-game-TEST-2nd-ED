/*
 * Create a list that holds all of your cards
 */

let cards = ['fa-diamond', 'fa-diamond',
			'fa-paper-plane-o', 'fa-paper-plane-o',
			'fa-anchor', 'fa-anchor',
			'fa-bolt', 'fa-bolt',
			'fa-cube', 'fa-cube',
			'fa-leaf', 'fa-leaf',
			'fa-bicycle', 'fa-bicycle',
			'fa-bomb', 'fa-bomb',
			];

function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;			
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
// initGame self invoked function ***
*/

function initGame() {
		let deck = document.querySelector('.deck');
	    // shuffle cards using shuffle function
		let cardHTML = shuffle(cards).map(function(card) {
			return generateCard(card);
		});
		deck.innerHTML = cardHTML.join('');
}

initGame();

let allCards = document.querySelectorAll('.card');
let openCards = []; //openCards.length 0\EMPTY\RESET!
let matchedCards = [];

// Click events
allCards.forEach(function(card) { 
	card.addEventListener('click', function(e) { 
		//Keep cards open in several condition..
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')); {
			openCards.push(card);
			card.classList.add('open', 'show', 'disabled');
			// check if cards match!
			compare();
		}
	});
});

/*
// Compare opened cards function ***
*/

function compare(card) {

	if (openCards.length == 2 ) { 
					//Check if first clicked card matches the second one!
					if (openCards[0].dataset.card == openCards[1].dataset.card) {
						matchedCards.push(openCards[0], openCards[1]);
						//Minepulate the first open card
						openCards[0].classList.add('match');
						openCards[0].classList.add('open');
						openCards[0].classList.add('show');
						//Minepulate the second open card!
						openCards[1].classList.add('match');
						openCards[1].classList.add('open');
						openCards[1].classList.add('show');
						//Reset open cards
						openCards = [];					
						
						//check if all cards are matched..
						endGame();
					// if cards don't match - hide\quit!
					} else {
						setTimeout(function() { 
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show', 'disabled');
							});
							//Reset open cards
							openCards = [];
						},  600); //wait for split second (showing cards)
					incrementMoves();

					}
				} 
}

// Moves count & incrementation
const moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = 0;
function incrementMoves() {
	moves++;
	moveCounter.innerHTML = moves;
	rating();
} 

/*
// end game when all cards are matched!*
*/

function endGame() {
	if(matchedCards.length === 16){
		// alert("GAMEOVER!");
		displayPopup();
	}
}

//popupmodal

function displayPopup() {
	var popupmodal = document.getElementById("popupmodal");
	popupmodal.style.visibility = "visible";
}
	
	playAgain = document.querySelector("#play-again");
	playAgain.addEventListener("click", function() {
		resetGame()
	});					

// reset game function
	function resetGame() {
		window.location.reload();
}

const restartbtn = document.querySelector(".restart");
restartbtn.addEventListener('click', function () {

    resetGame();
    initGame();
});		

// Rating
const starsCounter = document.querySelector(".stars"); 
	function rating(argument) {
	if (moves > 5 && moves < 10) {
		var rate = document.getElementById("rate");
		// starsCounter.innerHTML = moves;
    	rate.removeChild(rate.childNodes[0]);
	}
}
