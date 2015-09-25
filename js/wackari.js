window.onload = function () {

  /*
  Glad to see you here!
  TROLOLOLOLOL to you!
  Created on 5/25/2015
  Created by Ri Caragol as a "Free Friday"f or MOBI.
  */

  //Imagery Variables
  var picture_array = ["images/11.jpg", "images/13.jpg", "images/14.jpg", "images/15.jpg", "images/16.jpg",
  "images/17.jpg", "images/19.jpg", "images/20.jpg", "images/21.jpg", "images/22.jpg", "images/23.jpg",
  "images/24.jpg"];

  var original_picture_id = ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "00A", "00B"];

  //Game Flow Variables
  var source_reset = "images/00.jpg";
  var points = 0;
  var game_start = true;

  //Sounds
  var bump = new Audio('sounds/bump.wav');
  var level_in = new Audio('sounds/level_in.wav');
  var clear = new Audio('sounds/clear.wav');
  var coin = new Audio('sounds/coin.wav');

  level_in.play();
  bumpListener();

  if (game_start == true) {
   setInterval(change_image, 500 );
  }

  function change_image() {
    if (points < 5 && game_start == true) {
      var random_pic_to_replace = Math.floor(Math.random() * original_picture_id.length);
      var random_replacement_pic = Math.floor(Math.random() * picture_array.length);
      var change_to_src = picture_array[random_replacement_pic];

      document.getElementById(original_picture_id[random_pic_to_replace]).addEventListener("click", increasePoints);
      document.getElementById(original_picture_id[random_pic_to_replace]).src = change_to_src;
      setInterval(reset, 1000 );
    } else if (points == 5 && game_start == true){
      increasePoints();
      alert("You won, you get an adjustement to inflation on your next employee review!");
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

}