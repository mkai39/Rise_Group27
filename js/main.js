"use strict";


//move global variables here, later


//create game object
var game = new Phaser.Game(640,960, Phaser.AUTO);

//add states
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);

//start game on load state
game.state.start('Load');


//Tasks:
//combat - pause game so second 'screen' can appear, when battle over, return to pre-battle settings/inputs

//check out p2 physics

//invisible button?