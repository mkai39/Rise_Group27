//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Enemy Prefab
//Also covers part of battle sequence stuffs
function Enemy (game, x, y, key){
	//boolean to keep track of whether or not the player has fought this mob
	this.haveFought = false;

	//in battle sprites
	this.battlePlayer;
	this.battleEnemy;
	//in battle player character expression portrait
	this.headshot;
	//keeps track of if player/enemy has attacked their turn
	this.playOnce = false;
	//cant run popup
	this.cantrun;
	//keeps track of cant run popup
	this.triedToRun = false;
	this.cantfight;
	this.triedToFight = false;
	//tells game transition status to time battle start
	this.transitionEnded = false;

	//call enemy as a sprite
	Phaser.Sprite.call(this, game, x, y, key, 0);
	//set enemy's anchor to bottom left of enemy
	this.anchor.set(0,1);
	//enable arcaade physics for enemy
	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000;

	//battle music
	this.bgm = game.add.audio('battleBGM');
	this.sel = game.add.audio('selected');
	this.changeSel = game.add.audio('changeSelection');

	//animations for each type of baddie
	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 7, true);
	//snek
	this.animations.add('baddie2', [0,1], 5, true);
	//wike mazowski
	this.animations.add('baddie3', [0,1,2,3,4,3,2,1,0], 5, true);
	//chatter
	this.animations.add('baddie4', [0,1,2,3,4,5,6,5,4,3,2,1,0], 8, true);

	//transition for giong into and out of battles
	this.transition = game.add.tween(black).to({alpha: 1}, 100,Phaser.Easing.Linear.None, false,0,0,false);
	//when darkening tween starts
	this.transition.onStart.add(function(){
		//only change inBattle to true when openin transition
		if(!this.haveFought){
			inBattle = true;										//game is in battle state
		}
	}, this);
	this.transition2 = game.add.tween(black).to({alpha:0}, 300, Phaser.Easing.Linear.None, false,100,0,false);
	this.transition2.onStart.add(function(){
		this.transitionEnded = true;
	}, this);
	this.transition.chain(this.transition2);

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
	else if(this.key == 'chatter'){
		this.animations.play('baddie4');
	}

	//BATTLE

	//start battle when player collides with Enemy mob
	game.physics.arcade.overlap(player,this,function(){

		if(!this.haveFought){
			this.transition.start();
		}

		//check if enemy has been fought before
		//and if transition has been completed
		//happens once per encounter
		if(!this.haveFought && this.transitionEnded == true){
			//if not, game will BEGIN BATTLE

			turn = 'player';										//begin on player's turn
			this.haveFought = true;									//enemy has now been 'fought'

			//UI

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
			else if(this.key == 'chatter'){
				battlescreen.frame = 3;
			}
			//anchor is in the center (so UI can be made based on this position)
			battlescreen.anchor.setTo(0.5,0.5);

			//create fightArrow (shows player what action is selected)
			fightArrow = game.add.sprite(battlescreen.x - 30, battlescreen.y + 148,'fightArrow');
			fightArrowPos = 1;									//begins pointing at FIGHT

			//create portraight of player character's expression and mood
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

			//BATTLE SPRITES

			//create the in battle sprites for both player and enemy
			this.battlePlayer = new InBattleSprite(game, 'player', this.key);
			this.battleEnemy = new InBattleSprite(game, 'monster', this.key + 'Big');
			game.add.existing(this.battlePlayer);
			game.add.existing(this.battleEnemy);

			//check if current monster is an abstract monster
			if(this.key != 'imp' && this.key != 'snek'){
				//player's damage is 0,can't hurt monster
				this.battlePlayer.damage = 0;
			}

			//function for when action is selected during battle by player
			var battleAction = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			battleAction.onDown.add(function(){
				//check if game currently in battle, it is currently the PLAYER's turn
				if(this.battlePlayer.playOnce == false){
					//check if in battle, is player's turn, and popups not currently up
					if(inBattle && turn == 'player' && this.triedToRun == false && this.triedToFight == false){
						//FIGHT was selected
						if(fightArrowPos == 1){
							//animation

							//check if black overlay is almost completely black
							if(black.alpha >= 0.7){
								//create cant fight popup
								this.sel.play();
								this.cantfight = game.add.sprite(game.camera.x,game.camera.y,'cantFight', 0);
								//cant fight popup is onscreen
								this.triedToFight = true;
							}


							this.battlePlayer.attacking = true;							//mark player as attacking
							//move player
							var playerAttack = game.add.tween(this.battlePlayer).to({x: this.battleEnemy.x - this.battleEnemy.width/2}, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
							//call function when tween starts
							playerAttack.onStart.add(function(){
								this.battlePlayer.animations.play('slash');					//play slash animation

								//check if player's damage is equal to 0, then this monster is an abstract one
								if(this.battlePlayer.damage == 0){
									//make miss visible/float upawrds -> back to invisible
									var missTween = game.add.tween(this.battleEnemy.missed).to({y: this.battleEnemy.missed.y - 25, alpha:1}, 300, Phaser.Easing.Linear.None, true,300,0,false);
									var missTween2 = game.add.tween(this.battleEnemy.missed).to({y: this.battleEnemy.missed.y - 40, alpha:0}, 400, Phaser.Easing.Linear.None, false,0,0,false);
									missTween2.onComplete.add(function(){
										//when tween complete, reset miss's position
										this.battleEnemy.missed.y = this.battleEnemy.y - this.battleEnemy.height;
									},this);
									missTween.chain(missTween2);						//chain the two tweens
								}
							}, this);
							//call function when tween is finished
							playerAttack.onComplete.add(function(){
								//player damages monster
								this.battleEnemy.health -= this.battlePlayer.damage;
								//cap the minimum at 0 health so hp bar doesn't go into negatives
								if(this.battleEnemy.health <= 0){
									this.battleEnemy.health = 0;
								}
								//hp bar goes down
								var healthChange = game.add.tween(this.battleEnemy.hpTop.scale).to({x: this.battleEnemy.health/this.battleEnemy.maxHealth}, 200, Phaser.Easing.Linear.None, true,0,0,false);
								//call function when tween is finished
								healthChange.onComplete.add(function(){
									//check if enemy has no more hp
									if(this.battleEnemy.health <= 0){
										turn = 'battle over';								//no one's turn
										this.transition.start();							//exit transition
										battlescreen.destroy();								//get rid of battlescreen
	 									inBattle = false;									//battle is over
									}
									//it is now the enemy's turn
									turn = 'enemy';
								}, this);

								//the enemy's (1) attack counter is reset
								this.battleEnemy.playOnce = false;
							}, this);
							//the player's (1) attack counter is reached. player has attacked this turn
							this.battlePlayer.playOnce = true;
						}
						//SKILL or BAG was selected, those are not available options
						if(fightArrowPos == 2 || fightArrowPos == 3){
							this.sel.play();									//play error noise
						}
						//RUN was selected
						if(fightArrowPos == 4){
							//player not allowed to run for snake and imp monsters mobs 1,2
							if(this.key == 'snek' || this.key == 'imp'){
								//create cant run popup
								this.sel.play();
								this.cantrun = game.add.sprite(game.camera.x,game.camera.y,'cantRun');
								//cant run popup is currently on screen
								this.triedToRun = true;
							}
							else{
								turn = 'battle over';										//no one's turn
								this.transition.start();									//exit transition
								battlescreen.destroy();										//get rid of battlescreen
								inBattle = false;											//battle is over
							}
						}
					}
					//cant run popup is up
					else if(this.triedToRun == true){
						this.changeSel.play();												//play feedback audio
						this.cantrun.destroy();												//get rid of popup
						this.triedToRun = false;											//popup is no longer on screen
					}
					//cant fight popup is up
					else if(this.triedToFight == true){
						this.cantfight.frame ++;											//go to next part of message
						this.changeSel.play();												//play feedback audio
						//check if final frame of message series
						if(this.cantfight.frame == 2){
							//destroy popup, popup no longeer on screen
							this.triedToFight = false;
							this.cantfight.destroy();
						}
					}
				}
			},this);


			//play battle bgm on loop
			this.bgm.loopFull();
			this.bgm.volume = 0.25;
		}

		//check if enemy's turn
		if(turn == 'enemy' && this.transitionEnded == true){
			//check that enemy has not yet attacked this turn
			if(this.battleEnemy.playOnce == false){
				//enemy attack tween
				var enemyAttack = game.add.tween(this.battleEnemy).to({x: this.battlePlayer.x + this.battlePlayer.width/2}, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
				//call function when enemy attack tween complete
				enemyAttack.onComplete.add(function(){
					//reset player's(1) attack counter
					this.battlePlayer.playOnce = false;
					//enemy turn over, it is now player's turn
					turn = 'player';
				}, this);
				//make miss visible and float up->invisible
				var missTween = game.add.tween(this.battlePlayer.missed).to({y: this.battlePlayer.missed.y - 25, alpha:1}, 300, Phaser.Easing.Linear.None, true,300,0,false);
				var missTween2 = game.add.tween(this.battlePlayer.missed).to({y: this.battlePlayer.missed.y - 40, alpha:0}, 400, Phaser.Easing.Linear.None, false,0,0,false);
				missTween2.onComplete.add(function(){
					//when tween complete, reset miss's position
					this.battlePlayer.missed.y = this.battlePlayer.y - this.battlePlayer.height;
				},this);
				missTween.chain(missTween2);
					//check if player char's damage is 0, current monster is an abstract one
					if(this.battlePlayer.damage == 0 && black.alpha < 0.7){
						//fade closer to black each time player is attacked
						game.add.tween(black).to({alpha: black.alpha + 0.1}, 400,Phaser.Easing.Linear.None,true,300,0,false);
					}
				//enemy has reached it's (1) attack counter. enemy has attacked on its turn
				this.battleEnemy.playOnce = true;
			}
		}
		//cant fight popup is onscreen
		if(this.triedToFight == true){
			//keep it on top layer
			this.cantfight.bringToTop();
		}
		//check if black overlay is completely invisible
		if(black.alpha == 0){
			//then cnt fight popup will never be on screen
			this.triedToFight = false;
		}



	}, null, this);


	//once BATTLE OVER, player has fought this mob already
	if(this.haveFought && !inBattle){
		//turn off collision with this mob but still have it sitting on top of platforms
		this.body.checkCollision.up = false;
		this.body.checkCollision.right = false;
		this.body.checkCollision.left = false;

		//make black overlay invisible
		black.alpha = 0;

		//make mob transparent
		game.add.tween(this).to({alpha:0.5}, 500, Phaser.Easing.Linear.None, true);

		//destroy 'miss' word sprite
		this.battlePlayer.missed.destroy();

		//get rid of the the in battle sprites once the battle is over
		this.battlePlayer.hpBar.destroy();
		this.battlePlayer.hpTop.destroy();
		this.battleEnemy.hpBar.destroy();
		this.battleEnemy.hpTop.destroy();
		this.battlePlayer.destroy();
		this.battleEnemy.destroy();

		//get rid of fightArrow once battle over
		fightArrow.destroy();
		this.headshot.destroy()

		//stop battle music
		this.bgm.stop();
	}

}