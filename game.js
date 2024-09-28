
const buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).keypress(function() {
    if (!started) {
    // changing the h1 to level 0 and calling the function and then the level change from the function nextSequence().
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});
  
// this is created to find which button was pressed by the user and send it to the functions.
$(".btn").click (function () {
    let userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern    [currentLevel]) {
        console.log("success");


        if (userClickedPattern.length  === gamePattern.length) {

            setTimeout (function (){ 
                nextSequence();
            },1000)
            
        }


    } else {

        console.log("wrong");
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")   

        setTimeout (function (){
            $("body").removeClass("game-over");
        },200)

        startOver();// to reset everything
    }
}


function nextSequence() {

    userClickedPattern = []; // reseting the array for the next level.

    // adding the next level and changing the h1.
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4)
  
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}


// It takes as input the random button.
function playSound (name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// Function that add the and removes the style it takes as input the color of the random button.
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    },100); 
}

// reseting everthing to start over the game.
function startOver () {
    gamePattern = [];
    started = false;
    level = 0;
}


