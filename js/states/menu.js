//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//GitHub Repository
//https://github.com/mkaizena/FinalGame

//Menu State

"use strict";

var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function(){
		//selector arrow
		this.arrow;

		//keeps track of where selector is
		this.position = 1;

		//audio
		this.changeSel;
		this.sel;
		this.bgm;

		//whether credits are up or not
		this.credits;
		this.creditsUP = false;
	},
	preload: function(){
		console.log('MainMenu preload');

	},
	create: function(){
		console.log('MainMenu create');

		//background image
		game.add.sprite(0,0,'menu');

		//create selector arrow object
		this.arrow = game.add.sprite(30,225,'menuArrow');
		//makes arrow bob from side to side
		game.add.tween(this.arrow).to( {x: this.arrow.x+7 }, 400, Phaser.Easing.Linear.None, true, 0, -1, true);

		this.changeSel = game.add.audio('changeSelection');
		this.sel = game.add.audio('selected');
		//create and play menu bgm on loop
		this.bgm = game.add.audio('menuBGM');
		this.bgm.loopFull();
		this.bgm.volume = 0.5;

		//create function for when spacebar pressed
		var action = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		action.onDown.add(function(){
			//check if credits aren't up
			if(this.creditsUP == false){
				if(this.position == 1){
					this.sel.play();											//lower pitched noise to contrast with high. also player feedback
					this.bgm.stop();
					//go to next state
					game.state.start('Open');
				}
				if(this.position == 2){
					this.changeSel.play();										//play noise
					this.credits = game.add.sprite(0,0,'startCredits');			//create credits page
					this.creditsUP = true;										//the credits are up
				}
			}
			//check if credits are up
			else if(this.creditsUP == true){
				this.changeSel.play();											//play noise
				this.credits.destroy();											//destory credits page
				this.creditsUP = false;											//credits are no longer up
			}
		}, this);



	},
	update: function(){

		//check if credits aren't up, so selection can't be changed within credits page
		if(this.creditsUP == false){
			//check if arrow is next to START when player presses down
			if(this.position == 1 && game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
				//change position tracker, move arrow to point at CREDITS
				this.position = 2;
				this.arrow.y += 85;
				this.changeSel.play();					//high pitched noise to give player feedback
			}
			//check if arrow is next to START when player presses up
			else if(this.position == 2 && game.input.keyboard.isDown(Phaser.Keyboard.UP)){
				//change position tracker, move arrow to point at START
				this.position = 1;
				this.arrow.y -= 85;
				this.changeSel.play();					//high pitched noise to give player feedback
			}
		}
		
	}
}