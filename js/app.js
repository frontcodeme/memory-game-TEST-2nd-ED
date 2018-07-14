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

// Moves count & incrementation
let moveCounter = document.querySelector('.moves');
let moves = 0;
moveCounter.innerHTML = 0;
function incrementMoves() {
	moves++;
	moveCounter.innerHTML = moves;
	decrementStars();
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

// Rating "decrementing Stars"!
const starsCounter = document.querySelector(".stars"); 
	function decrementStars(argument) {
	if (moves > 8 && moves < 24) {
		var rate = document.getElementById("rate");
		// starsCounter.innerHTML = moves;
    	rate.removeChild(rate.childNodes[0]);
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////

// if all 16 cards are matched, stop the timer and display congrats
                // if (matchCounter === 16){
                //     stopTimer();
                //     // Allow time for the matching animation to finish before display popup
                //     setTimeout(function() {
                //         return displayCongrats();}, 900
                //     );
                // }

// Display the congrats message with the move count, total time, star rating and play again 'button'
// function displayCongrats() {
//     const popup = document.getElementsByClassName(`congratsPopup`);
//     popup[0].className = `congratsPopup`;
//     popup[0].innerHTML =
//         `<h2 class="congratsHeading" > Congratulations! </h2>
//         <h3 class="congratsTagline" > You've won the game! </h3>
//         <p class="congratsMove" > ${moveCounter} moves </p>
//         <p class="congratsTime" > ${timer.innerHTML} total time </p>
//         <p class="congratsStar" > ${starRating} stars </p>
//         <p class="congratsPlay" > Play Again </p>`;
//     const play = document.getElementsByClassName(`congratsPlay`);
//     play[0].addEventListener(`click`,reset);
// }

// // Hide the congrats popup by adding the class 'dimmed'
// // Erase the congrats text messages
// function hideCongrats() {
//     const popup = document.getElementsByClassName(`congratsPopup`);
//     popup[0].className = `congratsPopup dimmed`;
//     popup[0].innerHTML = ``;
// }



//Timer { if !firstClick }
// allCards.onclick = begin;
// function begin(e) {
//         // features function
//         if (!firstClick) {
//           timer();
//         }
// 	}

// Resets timer state and restarts timer
// function resetTimer() {
//   clearInterval(timer.clearTime);
//   timer.seconds = 0;
//   timer.minutes = 0;
//   $(".timer").text("0:00");

//   timer.clearTime = setInterval(startTimer, 1000);
// }

	//gameIsRunning = true;
	//let play = false;
	// cards.each(function () {
	//     // cache $(this) in a variable to improve performance .. don't call it many times just once
	//     let $this = $(this);


	//     $this.on('click', function () {

	//       if (play) {
	//         // features function
	//         if (!firstClick) {
	//           timer();
	//         }

	// // // // REPLACEMENT
	// timer function .. count seconds from the game start to the end
	// let firstClick = false;
	// let counter;
	// let seconds = 0;
	// let second = 0;
	// let minute = 0;

	// var onClick = function() {
//  		if (isValid($(this))) {
// 	    	if (open.length === 0) {
// 		      openCard($(this));
// 		    } else if (open.length === 1) {
// 		      openCard($(this));
// 	}	
// 		}
// 			}
// // var onClick = function() {
// //   if(timer.seconds == 0 && timer.minutes == 0){
// //     resetTimer();
// //   }


// // function resetTimer() {
// //   clearInterval(timer.clearTime);
// //   timer.seconds = 0;
// //   timer.minutes = 0;
// //   $(".timer").text("0:00");

// //   timer.clearTime = setInterval(startTimer, 1000);
// // }


	//Start time first card is clicked

	//Start timer
	// var startTimer = function() {
	//   if (timer.seconds === 59) {
	//     timer.minutes++;
	//     timer.seconds = 0;
	//   } else {
	//     timer.seconds++;
	//   }
	// }
	  // Ensure that single digit seconds are preceded with a 0
	  // var formattedSec = "0";
	  // if (timer.seconds < 10) {
	  //   formattedSec += timer.seconds;
	  // } else {
	  //   formattedSec = String(timer.seconds);
	  // }

	  // var time = String(timer.minutes) + ":" + formattedSec;
	  // $(".timer").text(time);

	// // // Animate matched cards 
	// animateMatched = (openCards) =>{
	// 	animateDa(openCards);
	// 	animateTada(openCards);
	// 	hideSymbols(openCards);
	// 	openCards = [];
	// }