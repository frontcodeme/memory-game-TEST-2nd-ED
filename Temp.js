/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/*
///////////////////////////////////////
// Restart button function ***
///////////////////////////////////////
*/

// const restartbtn = document.querySelector(".restart");
// 	restartbtn.addEventListener("click", function() {
// 		//Erase all
// 		//Reshuffle
// 		initGame();
// 		//Reset containers

// 	});

// play again function

// 	    window.location.reload(); .. this is the easy way :D (refresh the page)

//     // // flib back all the cards

//     // if (cards.hasClass('clicked')) {
//     //   cards.removeClass('clicked');
//     // }

//     // if (cards.hasClass('open')) {
//     //   cards.removeClass('open');
//     // }

//     // if (cards.hasClass('show')) {
//     //   cards.removeClass('show');
//     // }

//     // if (cards.hasClass('match')) {
//     //   cards.removeClass('match');
//     // }

//     // // if (cards.hasClass('flipInY')) {
//     // //   cards.removeClass('flipInY');
//     // // }

//     // // reset matched cards array
//     // matchedCards = [];
//     // // reset open cards array
//     // // openCards = [];
//     // // reset the number of seconds to 0 .. stop the timer .. reset timer status (first click (true/false))
//     // // seconds = 0;
//     // // clearInterval(counter);
//     // // $('#time-info').html('00 : 00');
//     // // reset the first click status
//     // // firstClick = false; // to run the timer again
//     // // reset the number of moves to 0
//     // move = 0;
//     // $('.moves').html(move);
//     // // reset the number of stars to 3 and show full stars
//     // starsNumber = 3;
//     // secondStar.attr('class', 'star-two fa fa-star');
//     // LastStar.attr('class', 'star-three fa fa-star');
// }