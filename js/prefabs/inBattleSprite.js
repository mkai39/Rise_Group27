//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//inBattleSprite prefab

function InBattleSprite (game, which, key){

	//variable to keep track of whether it's the player's or mob's turn in a battle
	this.turn = 'player';
	//variable to check if player sprite in the middle of attacking animation
	//so the animation can play through before returning to default fight animation
	this.attacking = false;

	//check what kind of sprite is being called
	if(which == 'player'){
		//create player sprite
		Phaser.Sprite.call(this, game, battlescreen.x - 70, battlescreen.y + 10, 'protagFight', 5);
	}
	else if(which == 'monster'){
		//create monster sprite
		Phaser.Sprite.call(this, game, battlescreen.x + 220, battlescreen.y + 10, key, 0);
		if(this.key == 'snek'){
			//snek killed in 2 hits
			this.health = 2;
		}
		else if(this.key == 'imp'){
			//imp killed in three hits
			this.health == 3;
		}
		else if(this.key == 'wike mazowski'){
			//wike mazowski not to be killed
			this.health == 500;
		}
	}
	//make in battle sprites 2x as big as platform sprites
	this.scale.setTo(2,2);
	this.anchor.setTo(1,1);

	//adding animations
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

	//play sprite's idle animation depending on which sprite it is
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

	//check if it is the player's turn, and if the current sprite is the player
	if(this.turn == 'player' && this.key == 'protagFight'){
		//check if selector is pointed at FIGHT
		if(selector.x < battlescreen.x){
			//check if the player selected FIGHT
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				//play attacking animation, the player is in the middle of attacking
				this.attacking = true;
				this.animations.play('slash');
			}
			//check if the last frame of attacking animation has played
			if(this.frame == 10){
				//player sprite is no longer attacking
				this.attacking = false;
			}
		}
	}

}

//health bar = player.health/player.maxhealth

	// var battleAction = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	// battleAction.onDown.add(function(){
	// 	if(inBattle && turn == 0){
	// 		if(selector.x == battlescreen.x-150){
	// 			console.log(this.health)
	// 			console.log('fight');
	// 		}
	// 	}
	// },this);