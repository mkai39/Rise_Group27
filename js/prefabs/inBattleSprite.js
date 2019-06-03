//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//inBattleSprite prefab

function InBattleSprite (game, which, key){

	//variable to keep track of whether it's the player's or mob's turn in a battle
	turn = 'player';
	//variable to check if player sprite in the middle of attacking animation
	//so the animation can play through before returning to default fight animation
	this.attacking = false;
	this.health;
	this.damage;

	//check what kind of sprite is being called
	if(which == 'player'){
		//create player sprite
		Phaser.Sprite.call(this, game, battlescreen.x - 70, battlescreen.y + 10, 'protagFight', 5);
		this.damage = 8;
	}
	else if(which == 'monster'){
		//create monster sprite
		Phaser.Sprite.call(this, game, battlescreen.x + 220, battlescreen.y + 10, key, 0);
		if(this.key == 'snekBig'){
			//snek killed in 2 hits
			this.health = 10;
		}
		else if(this.key == 'impBig'){
			//imp killed in 3 hits
			this.health = 14;
		}
		else if(this.key == 'wike mazowskiBig'){
			//wike mazowski not to be killed
			this.health = 500;
		}
		this.hpBar = game.add.sprite(this.x - 200, this.y - 200, 'hp');
		this.hpTop = game.add.sprite(this.x - 200, this.y - 200, 'hpTop');
	}
	



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

	//game.add.tween(fightArrow).to( {x: fightArrow.x+7 }, 400, Phaser.Easing.Linear.None, true, 0, -1, true);

}

InBattleSprite.prototype = Object.create(Phaser.Sprite.prototype);
InBattleSprite.prototype.constructor = InBattleSprite;

InBattleSprite.prototype.update = function(){

	//play sprite's idle animation depending on which sprite it is
	if(this.key == 'protagFight' && this.attacking == false){
		this.animations.play('capeFlap');
	}
	else if(this.key == 'snekBig'){
		this.animations.play('baddie2');
	}
	else if(this.key == 'impBig'){
		this.animations.play('baddie1');
	}
	else if(this.key == 'wike mazowskiBig'){
		this.animations.play('baddie3');
	}

	//check if it is the player's turn, and if the current sprite is the player
	// if(turn == 'player' && this.key == 'protagFight'){
	// 	//check if fightArrow is pointed at FIGHT
	// 	if(fightArrowPos == 1){
	// 		//check if the player selected FIGHT
	// 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
	// 			//play attacking animation, the player is in the middle of attacking
	// 			this.attacking = true;
	// 			game.add.tween(this).to({x: this.x + 90}, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
	// 			this.animations.play('slash');
	// 		}
	// 		//check if the last frame of attacking animation has played
	// 		if(this.frame == 10){
	// 			//player sprite is no longer attacking
	// 			this.attacking = false;
	// 		}
	// 	}
	// }

	if(this.key == 'protagFight'){
		if(this.frame == 10){
			console.log('hello');
			this.attacking = false;
		}
	}

}

//health bar = player.health/player.maxhealth
