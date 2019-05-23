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
		//art
		game.load.image('mc','assets/img/TempChar.png');
		game.load.image('mob','assets/img/TempBad.png');
		game.load.image('battle','assets/img/battledraft.png');
		game.load.image('select', 'assets/img/selection.png');
		game.load.image('sky','assets/img/sky.png');
		//texture atlas of happy player character walking animations
		game.load.atlas('protag','assets/img/protag.png','assets/img/protag.json');
		game.load.atlas('protagNeutral', 'assets/img/protag_neutral.png','assets/img/protag_neutral.json');
		game.load.atlas('protagSad','assets/img/protag_sad.png','assets/img/protag_sad.json');

		//background tilemap data, spritesheet
		game.load.tilemap('gamestage', 'assets/img/gamemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet','assets/img/final_final_final_bg.png',32,32);

		//audio
		game.load.audio('selected', 'assets/audio/select.mp3');
		game.load.audio('changeSelection','assets/audio/select2.mp3');
		game.load.audio('grass1', 'assets/audio/grassStep.mp3');
		game.load.audio('grass2', 'assets/audio/grassStep2.mp3');

		//narration script
		game.load.text('narration','js/narration.json');

	},
	update: function(){
			//go to next state: menu
			game.state.start('MainMenu');
	}
}