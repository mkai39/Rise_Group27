//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//GitHub Repository
//https://github.com/mkaizena/FinalGame

//Main

"use strict";


//move global variables here, later

//create game object
var game = new Phaser.Game(520,780, Phaser.AUTO);

//add states
game.state.add('Boot', Boot);
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);

//start game on load state
game.state.start('Boot');


//Tasks:

//invisible button? on menu screen