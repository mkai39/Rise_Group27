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
var platform;
var floor;
var battlescreen = 1;
var haveFought;
var moving;
var tempInstructions;
var selector;
var inBattle;
var inContact;
var battleEnded;
var mob, mob2;
var stepCount = 0, step;
var mapLayer, mapLayer2, mapLayer3;
var plants, plants2, plants3;

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

		//tilemap
		var map = game.add.tilemap('gamestage');
		map.addTilesetImage('final_final_final_bg','tilesheet');
		map.setCollisionBetween(0,170,true, '01platforms');
		map.setCollisionBetween(0,174,true,'02platforms');
		map.setCollisionBetween(0,174, true,'03platforms');
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
		player.body.gravity.y = 500;	//1000														//give player gravity
		player.body.collideWorldBounds = true;													//make player collide with world bounds

		//add player animations
		player.animations.add('walkRight', [6,7,8,9], 5,true);
		player.animations.add('walkLeft',[0,1,2,3], 5,true);



		//create enemy character
		mob = new Enemy(game, 100, game.world.height-500, 'mob');
		game.add.existing(mob);
		mob2 = new Enemy(game, 300,game.world.height-100,'mob');
		game.add.existing(mob2);

		//enable camera to follow player around
		game.camera.follow(player);


		//audio
		var selected = game.add.audio('selected');
		var changeSel = game.add.audio('changeSelection');
		var grass1 = game.add.audio('grass1');
		var grass2 = game.add.audio('grass2');


		//creating keys and their functions;
		//designate what is done when right key pressed/held down
		game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onHoldCallback = function(){
			//When in Platformer state
			if(!inBattle){
				//player moves right
				player.body.velocity.x = xMOVE_SPEED;
				//animate player walking right
				player.animations.play('walkRight');
				if(inContact){
					if(step == 0){
						grass1.play();
					}
					else if(step == 15){
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
				player.animations.play('walkLeft');			
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
				player.body.velocity.y = -450;
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
	 				selector.destroy();
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
				player.frameName = "protag 5.aseprite";
			}
			//when left is released
			else if(e.keyCode == Phaser.Keyboard.LEFT){
				//put player in lef-facing idle
				player.animations.stop();
				player.frameName = "protag 4.aseprite";
			}
		};

	},
	update: function(){
		//make player/floor collide
		inContact = game.physics.arcade.collide(player,[mapLayer,mapLayer2,mapLayer3]);

		//set player's default parameters
		player.body.velocity.x = 0;						//not moving
		stepCount++;
		step = stepCount % 30;

		if(player.y < 100){
			game.world.setBounds(0,0,game.width*2,2560);
		}
		if(player.x > game.width && player.y > game.height){
			game.world.setBounds(game.width,0,game.width*2,2560);
		}


	},
	render: function(){
		//game.debug.body(mob2);
		//game.debug.body(player);
	}
}