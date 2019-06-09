//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Gameplay State

//GitHub Repository
//https://github.com/mkaizena/FinalGame


"use strict";

//game.add.tween(fightArrow).to( {x: fightArrow.x+7 }, 400, Phaser.Easing.Linear.None, true, 0, -1, true);

var xMOVE_SPEED = 200;
var player;
var battlescreen, fightArrowPos;
var fightArrow;
var inBattle;
var black;
var stepCount = 0, step;
var inContact;
var turn = 'none';
var mood = 'normal';
var mapLayer;
var cutscene = false;

var GamePlay = function(game) {};
GamePlay.prototype = {
	init: function(){
		//audio
		this.bgm;
		//monsters
		this.mob,this.mob2,this.mob3,this.mob4,this.mob5;
		this.boss;
		//cutscene booleans/sprites
		this.cutscenePlayOnce = false;
		this.cutscenePlayer;
		this.playText = false;
		this.chooseArrowPos;
		this.chooseArrow;
		this.choosingTime = false;
		this.gotUp = false;
	},
	preload: function(){
		console.log('GamePlay preload');
	},
	create: function(){
		console.log('GamePlay create');
		//set the initial bounds of the world
		game.world.setBounds(0,0,game.width,2560);

		//create sky background
		var bg = game.add.sprite(0,game.world.height,'sky');
		bg.anchor.setTo(0,1);

		//create black overlay for transitions between platforming/battle and also for fade to black
		black = game.add.sprite(game.camera.x,game.camera.y, 'overlay');
		black.alpha = 0;

		//enable arcade physics in the world
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;												//prevent clipping when moving w/ high velocity

		//implement in tilemap
		var map = game.add.tilemap('gamestage');
		map.addTilesetImage('final_final_final_bg','tilesheet');
		//add collisions between tiles and the in game sprites
		map.setCollisionBetween(0,119,true, 'platforms');
		map.setCollisionBetween(136,153,true, 'platforms');
		map.setCollisionBetween(170,174,true,'platforms');
		//put in the tilemap layers
		mapLayer = map.createLayer('platforms');
		var plants = map.createLayer('plants');

		//create player character and enable arcade physics
		player = game.add.sprite(200,175,'protag',5);
		player.anchor.setTo(0,1);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 700;	//1000												//give player gravity
		player.body.collideWorldBounds = true;												//make player collide with world bounds
		player.body.setSize(40,59, 10, 5);													//change player bound box
		player.body.moves = true;															//initialize that player moves


		//add player walking animations
		player.animations.add('walkRight', [6,7,8,9], 5,true);
		player.animations.add('walkLeft',[0,1,2,3], 5,true);
		player.animations.add('neutWalkRight', [16,17,18,19], 5, true);
		player.animations.add('neutWalkLeft', [10,11,12,13], 5, true);
		player.animations.add('sadWalkRight', [26,27,28,29], 5, true);
		player.animations.add('sadWalkLeft', [20,21,22,23], 5, true);

		//create enemy character
		this.mob = new Enemy(game, 200,game.world.height-300,'snek');
		game.add.existing(this.mob);

		//flip mob and replace anchor
		this.mob.anchor.setTo(0.5,0.5);				//switch anchor for symmetrical flipping
		this.mob.scale.x *= -1;						//flip
		this.mob.anchor.setTo(0,1);					//reset anchor

		this.mob2 = new Enemy(game,390, 1850, 'imp');
		game.add.existing(this.mob2);

		this.mob3 = new Enemy(game, 250, 1100, 'wike mazowski');
		game.add.existing(this.mob3);

		this.mob4 = new Enemy(game, 400, 700, 'chatter');
		game.add.existing(this.mob4);

		this.mob5 = new Enemy(game,150,400,'bed');
		game.add.existing(this.mob5);

		//flip mob 5
		this.mob5.anchor.setTo(0.5,0.5);
		this.mob5.scale.x *= -1;
		this.mob5.anchor.setTo(0,1);

		this.boss = new Enemy(game, 375,50,'boss');
		game.add.existing(this.boss);


		//enable camera to follow player around
		game.camera.follow(player);


		//audio
		var selected = game.add.audio('selected');
		var changeSel = game.add.audio('changeSelection');
		changeSel.volume = 0.5;
		var step1 = game.add.audio('step1');
		var step2 = game.add.audio('step2');

		//play platforming bgm on loop
		this.bgm = game.add.audio('platformingBGM');
		this.bgm.loopFull();
		this.bgm.volume = 0.25;



		//KEYS AND THEIR FUNCTIONS

		//RIGHT key's functions
		game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onHoldCallback = function(){
			//When in Platformer state
			if(!inBattle){
				//player moves right
				player.body.velocity.x = xMOVE_SPEED;
				//animate player walking right
				//change which set of animation is being used depending on player char's mood
				if(mood == 'neutral'){
					player.animations.play('neutWalkRight');
				}
				else if(mood == 'sad'){
					player.animations.play('sadWalkRight');
				}
				else{
					player.animations.play('walkRight');
				}

				//walking audio
				if(inContact){
					if(step == 0){
						step1.play();
					}
					else if(step == 15){
						step2.play();
					}
				}
			}
			//When in Battle state
			else if(inBattle && turn == 'player'){
				//fightArrow points at FIGHT
				if(fightArrowPos == 1){
					//move fightArrow from FIGHT to BAG
					fightArrow.x += 130;
					fightArrowPos = 2;
					changeSel.play();							//feedback noise
				}
				//fightArrow points at SKILL
				if(fightArrowPos == 3){
					//move fightArrow from SKILL to RUN
					fightArrow.x += 130;
					fightArrowPos = 4;
					changeSel.play();
				}
			}
		};

		//LEFT key's functions
		game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onHoldCallback = function(){
			//When in Platformer state
			if(!inBattle){
				//player move left
				player.body.velocity.x = -xMOVE_SPEED;
				//animate player walking right
				//change which set of animation is being used depending on player char's mood
				if(mood == 'neutral'){
					player.animations.play('neutWalkLeft');
				}
				else if(mood == 'sad'){
					player.animations.play('sadWalkLeft');
				}
				else{
					player.animations.play('walkLeft');
				}

				//walking audio
				if(inContact){
					if(step == 0){
						step1.play();
					}
					else if(step == 15){
						step2.play();
					}
				}

			}
			//When in Battle state
			else if(inBattle && turn == 'player'){
				//fightArrow points at BAG
				if(fightArrowPos == 2){
					//move fightArrow from BAG to FIGHT
					fightArrow.x -= 130;
					fightArrowPos = 1;
					changeSel.play();						//feedback noise
				}
				//fightArrow points at RUN
				else if(fightArrowPos == 4){
					//move fightArrow from RUN to SKILL
					fightArrow.x -= 130;
					fightArrowPos = 3;
					changeSel.play();
				}
			}
		};

		//UP key's functions
		var moveUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		moveUp.onDown.add(function(){
			//When in Platformer state and touching the ground
			if(!inBattle && inContact){
				//move up(jump)
				player.body.velocity.y = -500;
			}
			//when in Battle state
			else if(inBattle && turn == 'player'){
				//fightArrow points at SKILL
				if(fightArrowPos == 3){
					//move fightArrow from SKILL to FIGHT
					fightArrow.y -= 75;
					fightArrowPos = 1;
					changeSel.play();
				}
				//fightArrow points at RUN
				else if(fightArrowPos == 4){
					//move fightArrow from RUN to BAG
					fightArrow.y -= 75;
					fightArrowPos = 2;
					changeSel.play();
				}
			}

		}, this);

		//DOWN key's functions
		var downSel = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		downSel.onDown.add(function(){
			//when in battle
			if(inBattle && turn == 'player'){
				//fightArrow points at FIGHT
				if(fightArrowPos == 1){
					//move fightArrow from FIGHT to SKILL
					fightArrow.y += 75;
					fightArrowPos = 3;
					changeSel.play();
				}
				//fightArrow points at BAG
				else if(fightArrowPos == 2){
					//move fightArrow from BAG to RUN
					fightArrow.y += 75;
					fightArrowPos = 4;
					changeSel.play();
				}
			}
		}, this);

		//SPACEBAR key's functions
		var spaceJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceJump.onDown.add(function(){
			//When in Platformer state and touching the ground
			if(!inBattle && inContact){
				//move up(jump)
				player.body.velocity.y = -500;
			}
		},this);



		//when key is released, do these actions
		game.input.keyboard.onUpCallback = function (e){
			//when RIGHT released
			if(e.keyCode == Phaser.Keyboard.RIGHT){
				///put player in right-facing idle
				//stop player from doing walking animation
				player.animations.stop();
				//change set of right-facing idle frame depending on player char's mood
				if(mood == 'neutral'){
					player.frameName = "protag_all 15.aseprite";
				}
				else if(mood == 'sad'){
					player.frameName = "protag_all 25.aseprite";
				}
				else{
					player.frameName = "protag_all 5.aseprite";
				}
			}
			//when LEFT released
			else if(e.keyCode == Phaser.Keyboard.LEFT){
				//put player in left-facing idle
				//stop player's walking animation
				player.animations.stop();
				//change set of left-facing idle frame depending on player char's mood
				if(mood == 'neutral'){
					player.frameName = "protag_all 14.aseprite";
				}
				else if(mood == 'sad'){
					player.frameName = "protag_all 24.aseprite";
				}
				else{
					player.frameName = "protag_all 4.aseprite";
				}
			}
		};




	},
	update: function(){
		//make player/floor collide
		inContact = game.physics.arcade.collide(player,mapLayer);

		//set player's default parameters
		player.body.velocity.x = 0;						//when not moving
		//counter for steps so walking sfx sounds natural-ish
		stepCount++;
		step = stepCount % 30;

		//when player reaches a certain height, make the world wider
		if(player.y < 150 ){
			game.world.setBounds(0,0,game.width*2,2560);
		}
		//when player reaches stage2, extend world again
		if(player.x > game.width && player.y > game.height){
			game.world.setBounds(game.width,0,game.width*3 + 96,2560);
		}


		//set player character mood, affects expressions/music
		if(player.y < game.world.height-600 && player.y > game.height*1.5 && player.x < game.width){
			mood = 'neutral';
		}
		else if((player.y < game.height*1.5 && player.x < game.width) || player.x >game.width && player.x < game.width*2){
			mood = 'sad';
		}
		else{
			mood = 'normal';
		}



		//check if in battle
		if(inBattle){
			//mute platforming music
			this.bgm.volume = 0;
			//keep player sprite in platformer from moving during battle in case player falls/other once battle starts
			//keeps battlescreen from being NOT fixed to camera
			player.body.moves = false;
		}
		//if in platforming mode
		else{
			//return to normal
			player.body.moves = true;
			//fade music
			if(player.y < game.world.height/5 * 2){
				game.add.tween(this.bgm).to({volume: 0}, 500, Phaser.Easing.Linear.None, true,0,0,false);
				
				//this.bgm.volume = 0;
			}else{
				this.bgm.volume = 0.25;
			}
		}

		//fix to camera
		black.x = game.camera.x;
		black.y = game.camera.y;

		//bring overlay to the top
		if(!cutscene){
			black.bringToTop();
		}

		//POST FIRST BOSS BATTLE CUTSCENE THING
		if(cutscene){
			inBattle = false;
			//black.alpha = 1;
			player.body.moves = false;
			//when player hits the ground, black
			game.physics.arcade.collide(this.cutscenePlayer,mapLayer,function(){
					black.alpha = 1;
				}, null,this);

			//right key function
			var rightSel = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			rightSel.onDown.add(function(){
				//when in cutscene
				if(this.choosingTime){
					//yes to no
					if(this.chooseArrowPos == 1){
						this.chooseArrow.x += 260;
						this.chooseArrowPos = 2;
						changeSel.play();
					}
				}
			}, this);

			//left key function
			var leftSel = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			leftSel.onDown.add(function(){
				if(this.choosingTime){
					if(this.chooseArrowPos == 2){
						this.chooseArrow.x -= 260;
						this.chooseArrowPos = 1;
						changeSel.play();
					}
				}
			},this);

			var actionSel = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			actionSel.onDown.add(function(){
				//choice 1
				if(this.text2.alpha == 1){
					//dont give up
					if(this.chooseArrowPos == 2){
						var choice1Done = game.add.tween(this.text2).to({alpha:0}, 100,Phaser.Easing.Linear.None,true,0,0,false);
						var choice2 = game.add.tween(this.text3).to({alpha:1},100,Phaser.Easing.Linear.None,false,0,0,false);
						//this.chooseArrow.y += 15;
						choice1Done.chain(choice2);
						selected.play();
					}
					//given up
					if(this.chooseArrowPos == 1){
						var choice1Done = game.add.tween(this.text2).to({alpha:0}, 100,Phaser.Easing.Linear.None,true,0,0,false);
						var givenUp = game.add.tween(this.giveupText1).to({alpha:1}, 100,Phaser.Easing.Linear.None,false,0,0,true);
						var givenUp2 = game.add.tween(this.giveupText2).to({alpha:1}, 100,Phaser.Easing.Linear.None, false,0,0,true);
						choice1Done.chain(givenUp);
						givenUp.chain(givenUp2);
						this.chooseArrow.destroy();
						selected.play();
						this.choosingTime = false;
						game.add.tween(getupBGM).to({volume:0},2000,Phaser.Easing.Linear.None,true,0,0,false);
					}
				}
				//choice 2
				if(this.text3.alpha ==1){
					//keep going
					if(this.chooseArrowPos == 1){
						var choice2Done = game.add.tween(this.text3).to({alpha:0}, 100,Phaser.Easing.Linear.None,true,0,0,false);
						var choice3 = game.add.tween(this.text4).to({alpha:1}, 100,Phaser.Easing.Linear.None,false,0,0,false);
						//this.chooseArrow.y -= 50;
						choice2Done.chain(choice3);
						selected.play();
					}
					//given up
					if(this.chooseArrowPos ==2){
						var choice2Done = game.add.tween(this.text3).to({alpha:0}, 100,Phaser.Easing.Linear.None,true,0,0,false);
						var givenUp = game.add.tween(this.giveupText1).to({alpha:1}, 100,Phaser.Easing.Linear.None,false,0,0,true);
						var givenUp2 = game.add.tween(this.giveupText2).to({alpha:1}, 100,Phaser.Easing.Linear.None, false,0,0,true);
						choice2Done.chain(givenUp);
						givenUp.chain(givenUp2);
						this.chooseArrow.destroy();
						selected.play();
						this.choosingTime = false;
						game.add.tween(getupBGM).to({volume:0},2000,Phaser.Easing.Linear.None,true,0,0,false);
					}
				}
				//choice 3
				if(this.text4.alpha == 1){
					var choice3Done = game.add.tween(this.text4).to({alpha:0},100,Phaser.Easing.Linear.None,true,0,0,false);
					var lastText = game.add.tween(this.text5).to({alpha:1},100,Phaser.Easing.Linear.None,false,0,0,true);
					lastText.onComplete.add(function(){
						//delay
						game.time.events.add(Phaser.Timer.SECOND*3, function(){
							this.cutscenePlayer.animations.play('gettingUp');
							player.mood = 'normal';
							this.gotUp = true;
						}, this);
					},this);
					choice3Done.chain(lastText);
					this.chooseArrow.destroy();
					selected.play();
					this.choosingTime = false;
					game.add.tween(getupBGM).to({volume:0},2000,Phaser.Easing.Linear.None,true,0,0,false);
				}
			},this);

			//PART1
			if(!this.cutscenePlayOnce){
				this.cutscenePlayOnce = true;
				//make player invisible
				player.visible = false;

				//black fades away
				game.add.tween(black).to({alpha:0}, 500,Phaser.Easing.Linear.None,true,0,0,false);
				//create player's cutscene sprite w/ physics
				this.cutscenePlayer = game.add.sprite(player.x,player.y,'getup',0);
				this.cutscenePlayer.anchor.setTo(0,1);
				game.physics.arcade.enable(this.cutscenePlayer);
				this.cutscenePlayer.body.gravity.y = 700;	//1000	

				//getup animations
				this.cutscenePlayer.animations.add('gettingUp', [0,1,2,3,4,5,6], 4,false);


				//make camera follow cutscene player
				game.camera.follow(this.cutscenePlayer);
				//throw player down
				var throw1 = game.add.tween(this.cutscenePlayer).to({x: game.width*1.5, y: this.cutscenePlayer.y - 150}, 600,Phaser.Easing.Linear.None,true,200,0,false);
				var throw2 = game.add.tween(this.cutscenePlayer).to({x:game.width*1.5, y: this.cutscenePlayer.y + 150}, 500,Phaser.Easing.Linear.None,false,0,0,false);
				throw2.onComplete.add(function(){
					this.playText = true;
				},this);
				throw1.chain(throw2);

				var selected = game.add.audio('selected');
				var changeSel = game.add.audio('changeSelection');
				changeSel.volume = 0.5;
				

				var getupBGM = game.add.audio('getupBGM');
				getupBGM.loopFull();
				getupBGM.volume = 0;
				game.add.tween(getupBGM).to({volume:0.05},3000,Phaser.Easing.Linear.None,true,0,0,false);


			}
			//PART2
			if(this.playText && black.alpha == 1){
					this.playText = false;
					//create text sprites
					var text1 = game.add.sprite(game.camera.x,game.camera.y,'getup1');
					this.text2 = game.add.sprite(game.camera.x ,game.camera.y,'getup2');
					this. text3 = game.add.sprite(game.camera.x,game.camera.y,'getup3');
					this. text4 = game.add.sprite(game.camera.x,game.camera.y,'getup4');
					this. text5 = game.add.sprite(game.camera.x,game.camera.y,'getup5');
					this.giveupText1 = game.add.sprite(game.camera.x,game.camera.y,'giveup1');
					this.giveupText2 = game.add.sprite(game.camera.x, game.camera.y,'giveup2');
					text1.alpha = 0;
					this.text2.alpha = 0;
					this.text3.alpha = 0;
					this.text4.alpha = 0;
					this.text5.alpha = 0;
					this.giveupText1.alpha = 0;
					this.giveupText2.alpha = 0;
					var textTween1 = game.add.tween(text1).to({alpha:1},100,Phaser.Easing.Linear.None, true,0,0,true); //4000
					var textTween2 = game.add.tween(this.text2).to({alpha:1},100,Phaser.Easing.Linear.None,false,0,0,false);//3000
					textTween2.onComplete.add(function(){
					 	this.chooseArrow = game.add.sprite(game.camera.x + game.width/2 - 200,game.camera.y + game.height/2 + 70,'fightArrow');
						this.chooseArrowPos = 1;
						this.choosingTime = true;
					},this);
					textTween1.chain(textTween2);
				}
				//PART3
				if(this.gotUp){
					
				}
			

		}

		//restart state
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
			game.state.start('GamePlay');
		}

	},
	render: function(){
		//game.debug.body(this.mob2.battleEnemy.hpTop);
		//game.debug.body(player);
	}
}