//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Load State


"use strict";

//note to self: go over nathan's paddle pong code later on
//to figure out loading screen stuffs



var Load = function(game) {};
Load.prototype = {
	preload: function(){
		console.log('Load preload');

		//set background color to dark gray
		game.stage.backgroundColor = "#383838";
		//create load bar and set it at center of the screen
		//based off Nathan's Paddle Parkour
		var loadBar = game.add.sprite(game.width/2, game.height/2, 'load');
		loadBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadBar);

		//preload assets
		game.load.image('mc','assets/img/TempChar.png');
		game.load.image('mob','assets/img/TempBad.png');
		game.load.image('battle','assets/img/battledraft.png');
		game.load.image('select', 'assets/img/selection.png');
		game.load.image('sky','assets/img/sky.png');
		//texture atlas of happy player character walking animations
		game.load.atlas('protag','assets/img/protag.png','assets/img/protag.json');
		game.load.atlas('protagNeutral', 'assets/img/protag_neutral.png','assets/img/protag_neutral.json');
		game.load.atlas('protagSad','assets/img/protag_sad.png','assets/img/protag_sad.json');

		//temp audio
		//https://freesound.org/people/SilentStrikeZ/sounds/389625/
		game.load.audio('grass', 'assets/audio/389625__silentstrikez__footsteps-grass-1.wav');
		//https://freesound.org/people/InspectorJ/sounds/415510/
		game.load.audio('ding', 'assets/audio/415510__inspectorj__bell-counter-a.wav');
		game.load.audio('selected', 'assets/audio/select.mp3');

	},
	update: function(){
			//go to next state: menu
			game.state.start('MainMenu');
	}
}