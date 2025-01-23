// console.log('js ok');
// FUNCTIONS
/**
 * Reproduces file audio specified in the parameter 'name'
 * 
 * @param {String} name 
 */
function playSound(name) {
// Reproduce audio
	const audio = new Audio('./../sounds/' + name + '.mp3');
	audio.play();	
}

/**
 * Return a integer number between 0 and 3 and shows the square
 * related to the number to the user with animation and given sound
*/
function nextSequence() {
	if (!level) $('body').off('keypress');
	
	userClickedPattern.length = 0;
	const randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	const buttonSelected = $('div' + '#' + randomChosenColour + '.btn');
	buttonSelected.animate({opacity: 0.2}).animate({opacity: 1});
	playSound(randomChosenColour);
	
	$('h1').text('Level ' + level++);
}

/**
 * Adds 'pressed' class to button of colour in argument 'currentColour'
 * 
 * @param {String} currentColour 
 */
function animatePress(currentColour) {
	const pressedButton = $('.' + currentColour);
	pressedButton.addClass('pressed');
	setTimeout(function () {
		pressedButton.removeClass('pressed');
	}, 100);
}

/**
 * Compares with a strict equality at the index equals to 'currentLevel' the stored sequence
 * with the one remembered by the player
 * 
 * @param {Number} currentLevel 
 * @returns {Boolean}  
*/
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		return true
	}
	else {
		return false
	}
}

/**
 * Game reset function
 */
function startOver() {
	level = 0;
	gamePattern.length = 0;
	$('div#result').remove();
	$('h1').text('Level ' + level);
	$('.container').slideDown();
	setTimeout(nextSequence, 400);
}


// SET UP PHASE
const buttonColours = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;


// PROCESSING PHASE
// Checks whether the game has started or not, before calling nextSequence
// function when a keyboard keys get pressed
if (!level) {
	$('body').on('keypress', nextSequence);
}
// Handler function for when buttons are clicked
$('div.btn').on('click', function (e) {
	const userChosenColour = e.target.id;
	playSound(userChosenColour);
	animatePress(userChosenColour);
	userClickedPattern.push(userChosenColour);
	// Checks if the added colour is correct, considering that the 'currentLevel' argument
	// corresponds to the index of the last answer given by the user, which is the one
	// to verify
	if (!checkAnswer(userClickedPattern.length - 1)) {
		playSound('wrong');
		$('body').addClass('game-over');
		$('h1').text('Game-over');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);
		const newElement = $("<div id='result'></div>").text('You made a mistake, try again	by pressing any key.')
		.css({'margin-top': '50px', color: '#fff', fontFamily: "'Press Start 2P', cursive"});
		$('body').append(newElement);
		$('.container').slideUp();
		$('body').on('keypress', startOver);
		return
	}
	// Controls if a new level can be calculated, after 'nextSequence' is already
	// increased by one, even if the user is still completing the sequence of
	// level equal to 'level' - 1 
	if (userClickedPattern.length === level) {
		setTimeout(nextSequence, 2000);
	}
})
