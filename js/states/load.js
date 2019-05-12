
"use strict";

//note to self: go over nathan's paddle pong code later on
//to figure out loading screen stuffs



var Load = function(game) {};
Load.prototype = {
	preload: function(){
		console.log('Load preload');

		//preload assets
		game.load.spritesheet('button','assets/img/button.png');
		game.load.image('mc','assets/img/TempChar.png');
		game.load.image('mob','assets/img/TempBad.png');

	},
	create: function(){
		console.log('Load create');
		//set bg color
		game.stage.backgroundColor = "#1C538A";

		//identify state w text
		game.add.text(50,50,'This is LOAD\nSPACE to go to MENU state', {font:'18px Impact', fill: '#FFFFFF'});
	},
	update: function(){
		//check if spacebar is down
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('MainMenu');
		}
	}
}