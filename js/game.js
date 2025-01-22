// console.log('js ok');
// FUNCTIONS
/**
 * Reproduces file audio specified in the parameter 'name'
 * 
 * @param {string} name 
 */
function playSound(name) {
// Reproduce audio
	let audio = new Audio('../sounds/' + name + '.mp3');
	audio.play();	
}

/**
 * return a integer number between 0 and 3
 * 
 * @returns {number}
 */
function nextSequence() {
	// Remove the event listener at beginning game
	if (!level) $('body').off('keypress');

	const randomNumber = Math.floor(Math.random() * 4);
	// Selects color with nextSequence function
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	console.log(gamePattern);
	// Select button with selected colour
	const buttonSelected = $('div' + '#' + randomChosenColour + '.btn');
	buttonSelected.animate({opacity: 0.2}).animate({opacity: 1});
	// Reproduces audio
	playSound(randomChosenColour);
	// Change title
	$('h1').text('Level ' + level++);
	console.log(level);
}

/**
 * Adds 'pressed' class to button of colour in argument 'currenColour'
 * 
 * @param {string} currentColour 
 */
function animatePress(currentColour) {
	const pressedButton = $('.' + currentColour);
	pressedButton.addClass('pressed');
	setTimeout(function () {
		pressedButton.removeClass('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log('success', '---game pattern:', gamePattern[currentLevel], '---' );
		return true
	}
	else {
		console.log('wrong', '---game pattern:', gamePattern[currentLevel], '---');
		return false
	}
}


// SET UP PHASE
const buttonColours = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;


// PROCESSING PHASE
// Checks whether the game has started or not before calling nextSequence
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
	console.log(userClickedPattern);
	// Checks if the added colour is correct remembering 
	if (!checkAnswer(userClickedPattern.length - 1)) {
		const newElement = $("<div id='result'></div>").text('Hai fatto un errore, riprova').css({color: '#fff', fontFamily: "'Press Start 2P', cursive"});
		$('body').append(newElement);
		$('.container').slideUp();
		return
	}
	if (userClickedPattern.length === level) {
		userClickedPattern.length = 0;
		setTimeout(nextSequence, 2000);
	}
})
