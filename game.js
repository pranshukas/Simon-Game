
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

// Function to Play Sound Corresponding to the Button Pressed

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to Check if Game starts the user presses Key for the first time

var started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Function to Randomly Generate New Sequence of button

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Fucntion to detect which button was pressed 

$(".btn").click(function () {
    if (!started) {
        gameOver();
        return;
    }
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//Function to check user has pressed the same sequence order

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }
    else {
        gameOver();
    }
}

//Function to Animate the Button when Pressed 

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Function to Add the game-over Class when game ends 

function gameOver() {
    $("body").addClass("game-over");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

//Function to reset the Variable when the Game Ends 

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}
