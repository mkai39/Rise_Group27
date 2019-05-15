//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Gameover State


"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function(){
		console.log('GameOver preload');
	},
	create: function(){
		console.log('GameOver create');
		//set bg color
		game.stage.backgroundColor = "#8A6F1C";

		//temporary, so travversing through states is easier
		//identify state
		game.add.text(50,50,'This is GAMEOVER\nSPACE to go to LOAD state', {font:'18px Impact', fill: '#FFFFFF'});


	},
	update: function(){
		//temporarily, go from gameover to load state for the sake of going around to all states easily
		//check if spacebar is down
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('Load',true, true);
		}
	}
}