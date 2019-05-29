//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//inBattleSprite prefab

function InBattleSprite (game, which, key){

	this.turn = 'player';
	this.attacking = false;

	if(which == 'player'){
		Phaser.Sprite.call(this, game, battlescreen.x - 190, battlescreen.y - 100, 'protagFight', 5);
	}
	else if(which == 'monster'){
		Phaser.Sprite.call(this, game, battlescreen.x + 10, battlescreen.y - 150, key, 0);
		if(this.key == 'snek'){
			this.health = 2;
		}
		else if(this.key == 'imp'){
			this.health == 3;
		}
		else if(this.key == 'wike mazowski'){
			this.health == 500;
		}
		//this.anchor.setTo(0,1);
	}
	this.scale.setTo(2,2);


	//animations
	//player
	this.animations.add('capeFlap', [0,1,2,3,4,5], 5, true);
	//player attack
	this.animations.add('slash', [6,7,8,9,10], 5, false);
	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 5, true);
	//snek
	this.animations.add('baddie2', [0,1], 3, true);
	//eye, wike mazowski
	this.animations.add('baddie3', [0,1,2,3,4,3,2,1,0], 4, true);

}

InBattleSprite.prototype = Object.create(Phaser.Sprite.prototype);
InBattleSprite.prototype.constructor = InBattleSprite;

InBattleSprite.prototype.update = function(){

	if(this.key == 'protagFight' && this.attacking == false){
		this.animations.play('capeFlap');
	}
	else if(this.key == 'snek'){
		this.animations.play('baddie2');
	}
	else if(this.key == 'imp'){
		this.animations.play('baddie1');
	}
	else if(this.key == 'wike mazowski'){
		this.animations.play('baddie3');
	}

	if(this.turn == 'player' && this.key == 'protagFight'){
		if(selector.x < battlescreen.x){
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				this.attacking = true;
				this.animations.play('slash');
			}
			if(this.frame == 10){
				this.attacking = false;
			}
		}
	}

}

//health bar = player.health/player.maxhealth