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
	init: function(){
		//selector arrow
		this.arrow;
		//keeps track of where selector is
		this.position = 1;
		this.changeSel;
		this.sel;
	},
	preload: function(){
		console.log('MainMenu preload');

	},
	create: function(){
		console.log('MainMenu create');

		//background image
		game.add.sprite(0,0,'menu');

		//create selector arrow object
		this.arrow = game.add.sprite(30,220,'arrow');
		//makes arrow bob from side to side
		game.add.tween(this.arrow).to( {x: this.arrow.x+7 }, 400, Phaser.Easing.Linear.None, true, 0, -1, true);

		this.changeSel = game.add.audio('changeSelection');
		this.sel = game.add.audio('selected');

	},
	update: function(){

		//check if arrow is next to START when player presses down
		if(this.position == 1 && game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			//change position tracker, move arrow to point at CREDITS
			this.position = 2;
			this.arrow.y += 83;
			this.changeSel.play();					//high pitched noise to give player feedback
		}
		//check if arrow is next to START when player presses up
		else if(this.position == 2 && game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			//change position tracker, move arrow to point at START
			this.position = 1;
			this.arrow.y -= 83;
			this.changeSel.play();					//high pitched noise to give player feedback
		}


		//check if arrow is next to START when player presses spacebar
		if(this.position == 1 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('GamePlay');
			this.sel.play();						//lower pitched noise to contrast with high. also player feedback
		}
	}
}