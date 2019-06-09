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
	this.playOnce = false;
	this.maxHealth;

	//check what kind of sprite is being called
	if(which == 'player'){
		//create player sprite
		Phaser.Sprite.call(this, game, battlescreen.x - 70, battlescreen.y + 10, 'protagFight', 5);
		this.damage = 8;
		this.health = 1;
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
			this.health = 17;
		}
		// else if(this.key == 'wike mazowskiBig'){
		// 	//wike mazowski not to be killed
		// 	this.health = 5000;
		// }
		// else if(this.key == 'chatterBig'){
		// 	//chatter also not to be killed
		// 	this.health = 5000;
		// }
		else{
			//a lot of health, enemy not meant to be killed
			this.health = 5000;
		}
	}
	this.anchor.setTo(1,1);

	//health bar
	this.maxHealth = this.health;
	this.hpBar = game.add.sprite(this.x - this.width, this.y - this.height - 30, 'hp');
	this.hpTop = game.add.sprite(this.x - this.width + 22, this.y - this.height - 30, 'hpTop');

	//create miss for player char
	if(this.key == 'protagFight'){
		this.missed = game.add.sprite(this.x - this.width/2,this.y - this.height, 'miss');
		this.missed.alpha = 0;
	}
	//create miss for enemy char
	else{
		this.missed = game.add.sprite(this.x - this.width, this.y -this.height, 'miss');
		this.missed.alpha = 0;
	}

	//player's attack audio
	var shing = game.add.audio('shing');

	//adding animations
	//player
	this.animations.add('capeFlap', [0,1,2,3,4,5], 5, true);
	//player attack
	var attackAnim = this.animations.add('slash', [6,7,8,9,10], 5, false);
	//when slash animation starts, play shing sound
	attackAnim.onStart.add(function(){
		//delay 1/3 of a second
		game.time.events.add(Phaser.Timer.SECOND/3, function(){
			//play sound
			shing.play();
		}, this);
	}, this);
	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 7, true);
	//snek
	this.animations.add('baddie2', [0,1], 3, true);
	//eye, wike mazowski
	this.animations.add('baddie3', [0,1,2,3,4,3,2,1,0], 8, true);
	//chatter, bubble expands
	this.animations.add('baddie4', [0,1,2,3,4,5,6,5,4,3,2,1,0], 7, true);
	//bed
	this.animations.add('baddie5', [0,1,2,3], 6, true);
	//boss
	this.animations.add('bossAni', [0,1,2,3,4,5,6,7], 8, true);
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
	else if(this.key == 'chatterBig'){
		this.animations.play('baddie4');
	}
	else if(this.key == 'bedBig'){
		this.animations.play('baddie5');
	}
	else if(this.key == 'bossBig'){
		this.animations.play('bossAni');
	}

}