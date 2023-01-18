// Array variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Boolean and Number variables
var counter = 0;
var level = 0;
var keyPressed = false;
var clickable = false;

//#Main function for starting
function startGame() {
	clickable = true;
	$("p").text("Watch closely!");
	$("h2").text("STOP");
	$(".btnStart").attr("onclick", "restart()");
	proceed();
}

//# Event Listeners
//Listening for keypress to start
$(document).keydown(function (e) {
	// For starting the game
	if (e.keyCode == 32) {
		if (!keyPressed) {
			return startGame();
		}
	}
});

$(document).keydown(function (e) {
	if (e.keyCode == 27) {
		restart();
	}
});

$(".btn").click(function () {
	if (clickable) {
		userChosencolor = $(this).attr("id");
		userClickedPattern.push(userChosencolor);
		soundEffect(userChosencolor);
		animatePress(userChosencolor);
		counter++;
		$("p").text("Step " + counter);
		checkAnswer(counter - 1);
	}
});

// function for starting after a given time
function proceed() {
	keyPressed = true;
	userClickedPattern = []; //Resetting user pattern upon generation of new sequence
	counter = 0;
	clickable = true;

	{
		setTimeout(function () {
			nextSequence();
		}, 1000);
	}
}

// Random starting color generator
function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	var selectedId = "#" + randomChosenColor;
	$(selectedId).fadeIn(100).fadeOut(100).fadeIn(100);
	soundEffect(randomChosenColor);
	autoAnimatePress(randomChosenColor);

	level++;
	$("h1").text("Level " + level);
}

function checkAnswer(i) {
	var val1 = gamePattern[i];
	var val2 = userClickedPattern[i];

	if (val1 !== val2) {
		return gameOver();
	} else {
		if (gamePattern.length != userClickedPattern.length) {
			return;
		} else {
			gamePattern.length == userClickedPattern.length;
			$("p").text("Level " + counter + " complete");
			return proceed();
		}
	}
}

// Adding sound effect, corresponding to each color

function soundEffect(color) {
	var audio = new Audio("sounds/" + color + ".mp3");
	return audio.play();
}

// Adding animation effect after every button click

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 80);
}

function autoAnimatePress(currentColor) {
	$("#" + currentColor).addClass("autoPressed");

	setTimeout(function () {
		$("#" + currentColor).removeClass("autoPressed");
	}, 80);
}

//# function for restarting
function restart() {
	$(".btnStart").attr("onclick", "startGame()");
	$("h2").text("PLAY");
	$("h1").text("Game Over!");
	$("p").text("Click Play to start.");
	keyPressed = false;
	clickable = false;
	counter = 0;
	level = 0;
	userClickedPattern = [];
	gamePattern = [];
}

//# function for failing a game
function gameOver() {
	$(".btnStart").attr("onclick", "startGame()");
	$("body").addClass("game-over");
	$("h2").text("PLAY");
	soundEffect("wrong");

	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 500);

	restart();
}
