//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Opening Narration State
"use strict";

var Open = function(game){};
Open.prototype = {
	init: function(){
		this.convoNum = 0;
		this.lineNum = 0;

	},
	create: function(){
		this.narrate = JSON.parse(this.game.cache.getText('narration'));
		this.narText = this.add.text(game.width/2,game.height/2, 'hello',{font:'20px Press Start 2P',fill:'#FFFFFF'});
		this.narText.anchor.setTo(0.5,0.5);
	},
	update: function(){


	},
	printText: function(){
		this.narText = '';
		this.curLine = this.narrate[this.convoNum][this.lineNum];


		for(var char = 0;char<this.curLine.length*10;char++){
			if(char % 10 == 0){
				this.narText.text += this.curLine[char/10];
			}
		}


	}
}