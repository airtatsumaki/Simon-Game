var buttonColours =["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

jQuery(document).keypress(function() {
  if (!gameStarted){
    nextSequence();
    gameStarted = true;
  }
});

jQuery('.btn').click(function(){
  var userChosenColour = jQuery(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  jQuery("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
    
  jQuery("#" + randomChosenColour).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);

  //console.log(randomNumber);
}

function checkAnswer(currentLevel){
  console.log("current level " + currentLevel);

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    jQuery("#level-title").html("GAME OVER. YOU REACHED LEVEL " + level + ".<br />Press any key to start again.");
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    jQuery("body").addClass("game-over");
    setTimeout(function() {
      jQuery("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
  }
}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour){
  jQuery("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    jQuery("#" + currentColour).removeClass("pressed");
  }, 100);
  
}

function gameOver(){
  
  
}