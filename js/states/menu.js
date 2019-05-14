//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//GitHub Repository
//https://github.com/mkaizena/FinalGame

//Menu State

"use strict";


var button;

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function(){
		console.log('MainMenu preload');

	},
	create: function(){
		console.log('MainMenu create');

		//change background color
		game.stage.backgroundColor = "#1C8A7A";
		//identify state via text
		game.add.text(50,50,'This is MENU\nSPACE to go to GAMEPLAY state', {font:'18px Impact', fill: '#FFFFFF'});
		
		//button = game.add.button(game.width/2,game.height/2,'button',)
	},
	update: function(){
		//check if spacebar is down
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('GamePlay');
		}
	}
}





//code from button example
// this.pauseButton = this.game.add.sprite(0, 0, 'pauseButton');
// this.pauseButton.inputEnabled = true;
// this.pauseButton.events.onInputUp.add(function () {this.game.paused = true;},this);
// this.game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false;},this);
