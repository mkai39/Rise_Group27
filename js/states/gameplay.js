//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Gameplay State

//GitHub Repository
//https://github.com/mkaizena/FinalGame


"use strict";


//everything is a global variable so I don't need to deal w this. at the moment
var xMOVE_SPEED = 200;
var player;
var battlescreen = 1;
var selector;
var inBattle;
var inContact;				//can be local variable
var mob, mob2, mob3, mob4, mob5;			//prolly local variables
var stepCount = 0, step;
var mapLayer, mapLayer2, mapLayer3;
var plants, plants2, plants3;
var mood = 'normal';

var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay preload');
	},
	create: function(){
		console.log('GamePlay create');
			//set the bounds of the world
		game.world.setBounds(0,0,game.width,2560);

		//create sky background
		var bg = game.add.sprite(0,game.world.height,'sky');
		bg.anchor.setTo(0,1);


		//enable arcade physics in the world
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.TILE_BIAS = 32;

		// put in tilemap
		var map = game.add.tilemap('gamestage');
		map.addTilesetImage('final_final_final_bg','tilesheet');
		//add collisions between tiles and the in game sprites
		map.setCollisionBetween(0,119,true, '01platforms');
		map.setCollisionBetween(136,153,true, '01platforms');
		map.setCollisionBetween(0,69,true,'02platforms');
		map.setCollisionBetween(67,174, true,'03platforms');
		//put in the tilemap layers
		mapLayer = map.createLayer('01platforms');
		mapLayer2 = map.createLayer('02platforms');
		mapLayer3 = map.createLayer('03platforms');
		plants = map.createLayer('01plants');
		plants2 = map.createLayer('02plants');
		plants3 = map.createLayer('03plants');

		//create player character and enable arcade physics
		player = game.add.sprite(100,game.world.height-100,'protag',5);
		player.anchor.set(0,1);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 600;	//1000														//give player gravity
		player.body.collideWorldBounds = true;													//make player collide with world bounds

		//add player animations
		player.animations.add('walkRight', [6,7,8,9], 5,true);
		player.animations.add('walkLeft',[0,1,2,3], 5,true);
		player.animations.add('neutWalkRight', [16,17,18,19], 5, true);
		player.animations.add('neutWalkLeft', [10,11,12,13], 5, true);
		player.animations.add('sadWalkRight', [26,27,28,29], 5, true);
		player.animations.add('sadWalkLeft', [20,21,22,23], 5, true);

		//create enemy character
		mob = new Enemy(game, 120, game.world.height-500, 'imp');
		game.add.existing(mob);

		//flip mob and replace anchor
		mob.anchor.setTo(0.5,0.5);
		mob.scale.x *= -1;
		mob.anchor.setTo(0,1);

		mob2 = new Enemy(game, 300,game.world.height-100,'snek');
		game.add.existing(mob2);

		mob3 = new Enemy(game, 250, 1100, 'wike mazowski');
		game.add.existing(mob3);

		//enable camera to follow player around
		game.camera.follow(player);


		//audio
		var selected = game.add.audio('selected');
		var changeSel = game.add.audio('changeSelection');
		changeSel.volume = 0.5;
		var grass1 = game.add.audio('grass1');
		var grass2 = game.add.audio('grass2');
		grass1.volume = 0.25;
		grass2.volume = 0.25;


		//creating keys and their functions;
		//designate what is done when right key pressed/held down
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
						grass1.play();
					}
					else if(step == 12){
						grass2.play();
					}
				}
			}
			//When in Battle state
			else if(inBattle){
				//check if selector is over 'fight' button
				if(selector.x == battlescreen.x - 150){
					//move selector over from 'fight' to 'run'
					selector.x += 150;
					changeSel.play();							//feedback noise
				}
			}
		};

		//designate what is done when left key pressed/held down
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
			}
			//When in Battle state
			else if(inBattle){
				//check if selecto is over 'run' button
				if(selector.x == battlescreen.x){
					//move selector over from 'run' to 'fight'
					selector.x -= 150;
					changeSel.play();						//feedback noise
				}
			}
		};

		//designate what is done when up key is pressed
		var jump = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		jump.onDown.add(function(){
			//When in Platformer state and touching the ground
			if(!inBattle && inContact){
				//move up(jump)
				player.body.velocity.y = -500;
			}
		}, this);

		//designate what's done when space pressed
		var selAction = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		selAction.onDown.add(function(){
			//when in Battle
			if(inBattle){
				//selected 'fight'
				if(selector.x == battlescreen.x - 150){
					//play sound
					selected.play();
				}
				//selected 'run'
				else if(selector.x == battlescreen.x){
					//destroy the battle screen and selector objects, tell system game is no longer in battle state
					battlescreen.destroy();
	 				inBattle = false;
				}
			}
		}, this);

		//when key is released, do these actions
		game.input.keyboard.onUpCallback = function (e){
			//when right is released
			if(e.keyCode == Phaser.Keyboard.RIGHT){
				//put player in right-facing idle
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
			//when left is released
			else if(e.keyCode == Phaser.Keyboard.LEFT){
				//put player in lef-facing idle
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

		this.black = game.add.sprite(game.camera.x,game.camera.y, 'overlay');
		this.black.alpha = 0;

	},
	update: function(){
		//make player/floor collide
		inContact = game.physics.arcade.collide(player,[mapLayer,mapLayer2,mapLayer3]);

		//set player's default parameters
		player.body.velocity.x = 0;						//not moving
		stepCount++;
		step = stepCount % 24;

		if(player.y < 200){
			game.world.setBounds(0,0,game.width*2,2560);
		}
		if(player.x > game.width && player.y > game.height){
			game.world.setBounds(game.width,0,game.width*2 + game.width/2,2560);
		}

		if(player.y < game.world.height-600 && player.y > game.height*1.5 && player.x < game.width){
			mood = 'neutral';
		}
		else if((player.y < game.height*1.5 && player.x < game.width) || player.x >game.width && player.x < game.width*2){
			mood = 'sad';
		}
		else{
			mood = 'normal';
		}

		this.black.x = game.camera.x;
		this.black.y = game.camera.y;
		if(inBattle){
			this.black.bringToTop();
			this.black.visible = true;
		}
		else{
			this.black.visible = false;
		}


	},
	render: function(){
		//game.debug.body(mob2);
		//game.debug.body(player);
	}
}