/*
 * Author: Moamen Ali
 * Mail: moamen.ux@gmail.com
 */ 

//Create a list [ARRAY] that holds all of your cards

let cards = ['fa-diamond', 'fa-diamond',
			'fa-paper-plane-o', 'fa-paper-plane-o',
			'fa-anchor', 'fa-anchor',
			'fa-bolt', 'fa-bolt',
			'fa-cube', 'fa-cube',
			'fa-leaf', 'fa-leaf',
			'fa-bicycle', 'fa-bicycle',
			'fa-bomb', 'fa-bomb',
			];

// Manifactor the HTML holding the cards

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

// initialise the "TIMER" with ('asyTimer.js') from https://github.com/albert-gonzalez/easytimer.js by Albert Gonzalez
let timer = new Timer();
	timer.start();
	timer.addEventListener('secondsUpdated', function (e) {
	    $('time').html(timer.getTimeValues().toString());
	});

// Intialize the game by calling all functions needed to buld the game 

function initGame() {
    initMoves();
    initStars();
    shuffleCards();
    timer.start();
    endGame();
}
initGame();  

// shuffle cards using shuffle function

function shuffleCards() {
	let cardHTML = shuffle(cards).map(function(card) {
	deck.innerHTML = cardHTML.join('');	
		return generateCard(card);
	});
}

// Add query selectors & Declare necessary variables as defualt!

let deck = document.querySelector('.deck');
let allCards = document.querySelectorAll('.card');
let openCards = []; //openCards.length 0\EMPTY\RESET!
let matchedCards = [];
let moves = 0;
let stars = 3;

// Add Event Listeners & edit cards visual status

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

// Compare opened cards
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
						},  1000); //wait for split second (showing cards)
					incrementMoves();
					}
	} 
}

//popupmodal
function displayPopup() {
	var popupmodal = document.getElementById("win-container");
	popupmodal.style.visibility = "visible";
}

// Moves count & incrementation:
// - initialize moves value

function initMoves() {
    moves = 0;
    $('.moves').text(moves);
}
// - incrementation the moves counter by 1 each try

function incrementMoves() {
	moves++;
    $('.moves').text(moves);
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

// reset game function  || window.location.reload();
// Listeners for the restart btn 

$('.restart').on('click', function (event) {
    event.preventDefault();
    timer.reset();
    initGame();
}); 

// end game when all cards are matched!

function endGame() {
	if(matchedCards.length === 16){
		timer.stop();
		displayPopup();
        $(".container").hide();
        $(".win-container").show();
    } else{
        $(".container").show();
        $(".win-container").hide();
	}
}

// initialise the game on page loading.


// END of app.js