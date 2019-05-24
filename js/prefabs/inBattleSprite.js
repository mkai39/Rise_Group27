//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//inBattleSprite prefab

function InBattleSprite (game, which, key){

	if(which == 'player'){
		Phaser.Sprite.call(this, game, battlescreen.x - 190, battlescreen.y - 100, 'protag', 5);
	}
	else if(which == 'monster'){
		Phaser.Sprite.call(this, game, battlescreen.x + 10, battlescreen.y - 150, key, 0);
		//this.anchor.setTo(0,1);
	}
	this.scale.setTo(2,2);

	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 5, true);
	//snek
	this.animations.add('baddie2', [0,1], 3, true);

}

InBattleSprite.prototype = Object.create(Phaser.Sprite.prototype);
InBattleSprite.prototype.constructor = InBattleSprite;

InBattleSprite.prototype.update = function(){

	if(this.key == 'snek'){
		this.animations.play('baddie2');
	}
	else if(this.key == 'imp'){
		this.animations.play('baddie1');
	}


}

//health bar = player.health/player.maxhealth