//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Gameover State


"use strict";

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(){
		this.bgm;
	},
	create: function(){
		console.log('GameOver create');
		game.world.setBounds(0,0,game.width,game.height);
		//create credits image
		var credits = game.add.sprite(0,0, 'endCredits');
		//black overlay for fade
		var black = game.add.sprite(0,0, 'overlay');

		this.bgm = game.add.audio('creditsBGM');
		this.bgm.loopFull();
		this.bgm.volume = 0;

		//feedback audio
		this.action = game.add.audio('selected');

		//fade
		game.add.tween(black).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 3000,0,false)
		game.add.tween(this.bgm).to({volume:0.1},5000,Phaser.Easing.Linear.None, true,500,0,false);

	},
	update: function(){
		//check if space pressed
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to menu state
			this.action.play();
			this.bgm.destroy();
			//game.add.tween(this.bgm).to({volume:0},1500,Phaser.Easing.Linear.None,true,0,0,false);
			game.state.start('MainMenu');
		}
	}
}