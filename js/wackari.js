window.onload = function () {

  /*
  Glad to see you here!
  TROLOLOLOLOL to you!
  Created on 5/25/2015
  Created by Ri Caragol as a "Free Friday".
  */

  //Imagery Variables
  var picture_array = ["images/11.jpg", "images/13.jpg", "images/14.jpg", "images/15.jpg", "images/16.jpg",
  "images/17.jpg", "images/19.jpg", "images/20.jpg", "images/21.jpg", "images/22.jpg", "images/23.jpg",
  "images/24.jpg"];

  var original_picture_id = ["000", "001", "002", "003", "004", "005", "006", "007", "008"];

  //Game Flow Variables
  var source_reset = "images/00.jpg";
  var points = 0;
  var game_start = true;
  var random_pic_to_replace = 0;
  var random_replacement_pic = 0;
  var change_to_src = "";

  //Sounds
  var bump = new Audio('sounds/bump.wav');
  var level_in = new Audio('sounds/level_in.wav');
  var clear = new Audio('sounds/clear.wav');
  var coin = new Audio('sounds/coin.wav');

  //Prizes
  prizes = [
            "You won! You get an adjustement to inflation on your next employee review!",
            "You won! You get vision insurance for one eye.",
            "You won! You get dental insurance for 5 teeth.",
            "You won! You get Company Swag! (The total value of the swag will be deducted from your next paycheck.)"
            ];

  //Start Game
  level_in.play();
  clockStart();
  bumpListener();

  if (game_start == true) {
   setInterval(change_image, 700 );
  }

  function change_image() {
    if (points < 5 && game_start == true) {
      random_pic_to_replace =  Math.floor(Math.random() * original_picture_id.length);
      random_replacement_pic = Math.floor(Math.random() * picture_array.length);
      change_to_src = picture_array[random_replacement_pic];

      document.getElementById(original_picture_id[random_pic_to_replace]).addEventListener("click", increasePoints);
      setStyle(original_picture_id[random_pic_to_replace], {'outline':'10px solid #008000'});
      document.getElementById(original_picture_id[random_pic_to_replace]).src = change_to_src;
      setInterval(reset, 1400 );
    } else if ((points == 5) && (game_start == true)){
      clockStop();
      increasePoints();
      random_prize =  Math.floor(Math.random() * prizes.length);
      alert(prizes[random_prize]);
      game_start = false;
    }
    else {
      window.location.replace("http://localhost:8888/whack-a-ri/thanks.html");
    }
  }

  function reset() {
    for (i =0; i < original_picture_id.length; i++) {
      document.getElementById(original_picture_id[i]).src = source_reset;
      document.getElementById(original_picture_id[i]).removeEventListener("click", increasePoints);
      setStyle(original_picture_id[i], {'outline':'0px'});
    }
  }

  function increasePoints(){
      document.getElementById("points").innerHTML = points++;
      coin.play();
  }

  function bumpListener() {
    for (i =0; i < original_picture_id.length; i++) {
      document.getElementById(original_picture_id[i]).addEventListener("click", bumpPlay());
    }
  }

  function bumpPlay() {
    bump.play();
  }

  //dynamic styles
  function setStyle( elId, propertyObject ) {
   var el = document.getElementById(elId);
   for (var property in propertyObject)
      el.style[property] = propertyObject[property];
  }

  //Timer
  var timerId // current timer if started
  var minutes = 0;
  var seconds = 0;

  function clockStart() {
    document.getElementById('min').innerHTML = minutes;
    if (timerId) return
    timerId = setInterval(update, 1000)
    update()  // (*)
  }

  function clockStop() {
    clearInterval(timerId)
    timerId = null
  }

  function update() {
    if (seconds < 60) {
      seconds++;
      document.getElementById('sec').innerHTML = seconds;
    } else {
      seconds = 0;
      minutes++;
      document.getElementById('sec').innerHTML = seconds;
      document.getElementById('min').innerHTML = minutes;
    }
  }

}
