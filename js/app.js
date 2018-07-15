/*
 * Author: Moamen Ali
 * Mail: moamen.ux@gmail.com
 */ 

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
let timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('time').html(timer.getTimeValues().toString());
});
function initGame() {
		let deck = document.querySelector('.deck');
	    // shuffle cards using shuffle function
		let cardHTML = shuffle(cards).map(function(card) {
			return generateCard(card);
		});
		deck.innerHTML = cardHTML.join('');
		timer.start();
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
			// // Start the timer if it is the first click
	  //   if (moveCounter === 1) {
	  //       timeInt = setInterval(timer, 1000);
	    // }
		}
	});
});

// // timer function .. count seconds from the game start to the end
//   let firstClick = false;
//   let counter;
//   let seconds = 0;
//   let second = 0;
//   let minute = 0;

//   function timer() {
//     firstClick = true;
//     counter = setInterval(function () {
//             seconds += 1;

//             second = (seconds % 60);
//             minute = parseInt(seconds / 60);

//             // if second < 10 add a 0 before the seconds
//             if (second < 10) {
//               second = `0${(seconds % 60)}`;
//             }

//             // if minutes < 10 add a 0 before the minutes
//             if (minute < 10) {
//               minute = `0${parseInt(seconds / 60)}`;
//             }

//             $('#time-info').html(`${minute} : ${second}`);

//         }, 1000);
//   }

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
						openCards[0].classList.add('rubberBand');
						//Minepulate the second open card!
						openCards[1].classList.add('match');
						openCards[1].classList.add('open');
						openCards[1].classList.add('show');
						openCards[1].classList.add('rubberBand');
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

/*
// end game when all cards are matched!*
*/

function endGame() {
	if(matchedCards.length === 16){
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

// Moves count & incrementation
let moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = 0;
function incrementMoves() {
	moves++;
	moveCounter.innerHTML = moves;
	// update moves value and call to update stars
    updateStars();
}

// initialize stars number and icon in HTML

function initStars() {
    stars = 3;
    $('.stars i').removeClass("fa-star-o");
    $('.stars i').addClass("fa-star");
    updateStars();
}

 // define the rules on the number os stars and update stars on the view

function updateStars() {
    // if moves <=12 with 3 starts
    if (moves <= 12) {
        $('.stars .fa').addClass("fa-star");
        stars = 3;
    } else if(moves >= 13 && moves <= 14){
        $('.stars li:last-child .fa').removeClass("fa-star");
        $('.stars li:last-child .fa').addClass("fa-star-o");
        stars = 2;
    } else if (moves >= 15 && moves <20){
        $('.stars li:nth-child(2) .fa').removeClass("fa-star");
        $('.stars li:nth-child(2) .fa').addClass("fa-star-o");
        stars = 1;
    } else if (moves >=20){
        $('.stars li .fa').removeClass("fa-star");
        $('.stars li .fa').addClass("fa-star-o");
        stars = 0;
    }
    $('.win-container .stars-number').text(stars);

}

// END of app.js