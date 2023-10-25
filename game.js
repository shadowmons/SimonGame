var buttonColors = ["red","blue","green", "yellow"];
var GamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playsound(name){
    var buttonSound = new Audio("./sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
    
}

$(document).keydown(function() {
    if (!started) {
      nextSequence();
      started = true;
 }});

function nextSequence(){
    var randomColor = buttonColors[Math.floor(Math.random()*4)];
    GamePattern .push(randomColor);
    $("#" + randomColor).fadeOut().fadeIn();
    playsound(randomColor);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    $("#" + userChosenColor).fadeOut().fadeIn();
    playsound(userChosenColor);
    animatePress(userChosenColor);
    if (started) {
        userClickedPattern.push(userChosenColor);
        checkAnswer(level)
        }
    
});



function checkAnswer(currentLevel){
    var position = userClickedPattern.length - 1;
        if (userClickedPattern[position] === GamePattern[position]){
            if (userClickedPattern.length === currentLevel){
                setTimeout(nextSequence,1000);
            }
        } else{
            gameOver();
        }

}

function gameOver(){
    $("#level-title").text("Game Over, press any key to restart");
    playsound("wrong");
    paintBackgroundRed();
    startOver();
}

function paintBackgroundRed(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },400); 
}

function startOver(){
    GamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}