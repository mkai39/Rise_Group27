//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Opening Narration State
"use strict";

var Open = function(game){};
Open.prototype = {
	init: function(){
		//spacebar sprite
		this.space;
		//select audio
		this.sel;
	},
	create: function(){
		//black bg
		var bg = game.add.sprite(0,0,'narrateBG');
		//create the images w/ narration text and set them to be invisible
		var set1 = game.add.sprite(0,0,'open1');
		var set2 = game.add.sprite(0,0,'open2');
		set1.alpha = 0;
		set2.alpha = 0;

		//create space key and make it invisible
		this.space = game.add.sprite(game.width/2,game.height/3 * 2, 'space');
		this.space.anchor.setTo(0.5,0.5);						//set its anchor to its center
		this.space.alpha = 0;									//invisible

		//create flashing animation for space key, looks like it's being pressed
		this.space.animations.add('flash', [0,1], 2, true);

		//create tweens to fade these texts to visibility
		var tween1 = game.add.tween(set1).to({alpha: 1}, 7000, Phaser.Easing.Linear.None, true,800,0,true);
		var tween2 = game.add.tween(set2).to({alpha: 1}, 7000, Phaser.Easing.Linear.None, false,0,0,false);
		var tween3 = game.add.tween(this.space).to({alpha:1}, 1000, Phaser.Easing.Linear.None, false,0,0,false);
		//tween 2 happens upon tween 1's completion
		//second set of texxt fades in
		tween1.chain(tween2);
		//tween 3 happens upon tween 2's completion
		//space key fades n
		tween2.chain(tween3);

	},
	update: function(){
		//make spacebar flash
		this.space.animations.play('flash');

		//go to next state on press of space, to gameplay state
		if(this.space.alpha >= 0.8 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('GamePlay');
		}
	}
}