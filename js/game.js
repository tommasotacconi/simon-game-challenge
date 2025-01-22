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
	const randomNumber = Math.floor(Math.random() * 4);
	// Selects color with nextSequence function
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	// Select button with selected colour
	const buttonSelected = $('div' + '#' + randomChosenColour + '.btn');
	buttonSelected.animate({opacity: 0.2}).animate({opacity: 1});
	// Reproduce audio
	playSound(randomChosenColour);
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


// SET UP PHASE
const buttonColours = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];



// PROCESSING PHASE
nextSequence();

// Handler function for when buttons are clicked
$('div.btn').on('click', function (e) {
	const userChosenColour = e.target.id;
	playSound(userChosenColour);
	animatePress(userChosenColour);
	userClickedPattern.push(userChosenColour);
})
