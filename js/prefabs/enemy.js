//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Enemy Prefab
//Also covers part of battle sequence stuffs
function Enemy (game, x, y, key){
	//boolean to keep track of whether or not the player has fought this mob
	this.haveFought = false;

	this.battlePlayer;
	this.battleEnemy;
	this.headshot;

	//call enemy as a sprite
	Phaser.Sprite.call(this, game, x, y, key, 0);
	//set enemy's anchor to bottom left of enemy
	this.anchor.set(0,1);
	//enable arcaade physics for enemy
	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000;

	//battle music
	this.bgm = game.add.audio('battleBGM');



	//animations for each type of baddie
	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 5, true);
	//snek
	this.animations.add('baddie2', [0,1], 5, true);
	//wike mazowski
	this.animations.add('baddie3', [0,1,2,3,4,3,2,1,0], 5, true);

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){

	//enable collision between enemy mob and the platforms
	game.physics.arcade.collide(this, mapLayer);

	//ANIMATION

	//play animations for each type of mob
	if(this.key == 'imp'){
		this.animations.play('baddie1');
	}
	else if(this.key == 'snek'){
		this.animations.play('baddie2');
	}
	else if(this.key == 'wike mazowski'){
		this.animations.play('baddie3');
	}

	//BATTLE

	//start battle when player collides with Enemy mob
	game.physics.arcade.overlap(player,this,function(){
		//check if enemy has been fought before
		if(!this.haveFought){
			//if not, game will BEGIN BATTLE
			turn = 'player';
			inBattle = true;										//game is in battle state
			this.haveFought = true;									//enemy has now been 'fought'

			//create battlescreen in center of screen
			battlescreen = game.add.sprite(game.width/2,game.camera.y + game.height/2,'fightScreen');
			
			//change which battlescreen is used depending on mob player is fighting
			if(this.key == 'snek'){
				battlescreen.frame = 0;
			}
			else if(this.key == 'imp'){
				battlescreen.frame = 1;
			}
			else if(this.key == 'wike mazowski'){
				battlescreen.frame = 2;
			}
			//anchor is in the center (so in battle sprites can be made based on this position)
			battlescreen.anchor.setTo(0.5,0.5);

			//create fightArrow (shows player what action is selected)
			fightArrow = game.add.sprite(battlescreen.x - 30, battlescreen.y + 148,'fightArrow');
			fightArrowPos = 1;

			this.headshot = game.add.sprite(battlescreen.x - 220, battlescreen.y + 125, 'headshot',0);
			if(mood == 'normal'){
				this.headshot.frame = 0;
			}
			else if(mood == 'neutral'){
				this.headshot.frame = 2;
			}
			else if(mood == 'sad'){
				this.headshot.frame = 3;
			}


			//create the in battle sprites for both player and enemy
			this.battlePlayer = new InBattleSprite(game, 'player', this.key);
			this.battleEnemy = new InBattleSprite(game, 'monster', this.key + 'Big');
			game.add.existing(this.battlePlayer);
			game.add.existing(this.battleEnemy);

			var battleAction = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			battleAction.onDown.add(function(){
				if(inBattle && turn == 'player'){
					if(fightArrowPos == 1){
						selected.play();
						//animation
						this.battlePlayer.attacking = true;
						var playerAttack = game.add.tween(this.battlePlayer).to({x: this.battlePlayer.x +110}, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
						playerAttack.onComplete.add(function(){
							this.battleEnemy.health -= this.battlePlayer.damage;
							console.log('enemy health: ' + this.battleEnemy.health);
							turn = 'enemy';
						}, this);
						this.battlePlayer.animations.play('slash');
					}
				}
			},this);


			//play battle bgm on loop
			this.bgm.loopFull();
		}

		if(turn == 'enemy'){
				game.add.tween(this.battleEnemy).to({x: this.battleEnemy.x - 110}, 200, Phaser.Easing.Linear.None, true, 1000, 0, true);
				turn = 'player';
		}

		//the enemy has no more health, end the battle
		//destroy all UI related sprites
		if(this.battleEnemy.health <= 0){
			turn = 'battle over';
			battlescreen.destroy();
	 		inBattle = false;

		}

	console.log(turn);

	}, null, this);


	//once BATTLE OVER, player has fought this mob already
	if(this.haveFought && !inBattle){
		//turn off collision with this mob but still have it sitting on top of platforms
		this.body.checkCollision.up = false;
		this.body.checkCollision.right = false;
		this.body.checkCollision.left = false;

		//make mob transparent
		game.add.tween(this).to({alpha:0.5}, 500, Phaser.Easing.Linear.None, true);

		//get rid of the the in battle sprites once the battle is over
		this.battlePlayer.destroy();
		this.battleEnemy.destroy();

		//get rid of fightArrow once battle over
		fightArrow.destroy();
		this.headshot.destroy()

		//stop battle music
		this.bgm.stop();
	}

}