
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
		game.load.image('battle','assets/img/battledraft.png');
		game.load.image('select', 'assets/img/selection.png');
		//temp audio
		//https://freesound.org/people/SilentStrikeZ/sounds/389625/
		game.load.audio('grass', 'assets/audio/389625__silentstrikez__footsteps-grass-1.wav');
		//https://freesound.org/people/alienistcog/sounds/123659/
		game.load.audio('jingle', 'assets/audio/123659__alienistcog__md4trk9.aiff');
		//https://freesound.org/people/InspectorJ/sounds/415510/
		game.load.audio('ding', 'assets/audio/415510__inspectorj__bell-counter-a.wav');

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