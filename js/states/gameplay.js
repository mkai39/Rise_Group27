//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//GitHub Repository
//https://github.com/mkaizena/FinalGame

//Gameplay State


"use strict";


//everything is a global variable so I don't need to deal w this. at the moment
var xMOVE_SPEED = 200;
var player;
var platform;
var mob, mob2;
var floor;
var battlescreen;
var haveFought;
var grass,ding, selected;
var moving;
var tempInstructions;
var selector;
var inBattle;
var inContact;
//var selectRight, selectLeft, select;

var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay preload');
	},
	create: function(){
		console.log('GamePlay create');
			//set the bounds of the world
		game.world.setBounds(0,0,game.width,1600);

		//create sky background
		var bg = game.add.sprite(0,game.world.height,'bg');
		bg.anchor.setTo(0,1);
		bg.scale.setTo(2.45,2.4);

		//enable arcade physics in the world
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create player character and enable arcade physics
		player = game.add.sprite(100,game.world.height-100,'mc');
		player.anchor.set(0,1);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 200;	//1000														//give player gravity
		player.body.collideWorldBounds = true;													//make player collide with world bounds

		//create enemy character
		mob = new Enemy(game, 100, game.world.height-500, 'mob');
		game.add.existing(mob);
		mob2 = new Enemy(game, 300,game.world.height-100,'mob');
		game.add.existing(mob2);

		//enable camera to follow player around
		game.camera.follow(player);

		//create floor object
		floor = game.add.sprite(0,game.world.height-64,'mc');
		floor.scale.setTo(10,10);
		//set floor to black/easier on the eyes
		floor.tint = 0x000000;
		//enable arcade physics for the floor
		game.physics.arcade.enable(floor);
		floor.body.immovable = true;
		

		platform = game.add.sprite(0 , floor.y - 400, 'mc');
		platform.scale.setTo(5, 1);
		game.physics.arcade.enable(platform);
		platform.body.immovable = true;
	


		//https://phaser.io/examples/v2/misc/pause-menu
		//input listener
//		game.input.onDown.add(this.battleChoice,self);

		//audio
		grass = game.add.audio('grass');
		//ding = game.add.audio('ding');
		selected = game.add.audio('selected');

		//boolean to tell whether player is currently moving so audio knows whent to be playing
		//moving = false;

		//creating keys and their functions;
		//designate what is done when right key pressed/held down
		game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onHoldCallback = function(){
			//When in Platformer state
			if(!inBattle){
				//player moves right
				player.body.velocity.x = xMOVE_SPEED;
				//check so audio just plays once, not keep restarting while key down
				// if (!moving){
				// 	grass.play();
				// 	moving = true;
				// }
			}
			//When in Battle state
			else if(inBattle){
				//check if selector is over 'fight' button
				if(selector.x == battlescreen.x - 150){
					//move selector over from 'fight' to 'run'
					selector.x += 150;
				}
			}
		};

		//designate what is done when left key pressed/held down
		game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onHoldCallback = function(){
			//When in Platformer state
			if(!inBattle){
				//player move left
				player.body.velocity.x = -xMOVE_SPEED;
				//check so audio just plays once, not keep restarting while key down
				// if (!moving){
				// 	grass.play();
				// 	moving = true;
				// }			
			}
			//When in Battle state
			else if(inBattle){
				//check if selecto is over 'run' button
				if(selector.x == battlescreen.x){
					//move selector over from 'run' to 'fight'
					selector.x -= 150;
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

	//var tempSky = game.add.sprite(0,game.world.height, 'bg');
	//tempSky.anchor.setTo(0,1);


	},
	update: function(){
		//make player/floor collide
		inContact = game.physics.arcade.collide(player,[floor,platform]);

		//call this.startBattle if player and mob overlap, go to battle screen
		game.physics.arcade.overlap(player,[mob,mob2],this.startBattle, null, this);


		//set player's default parameters
		player.body.velocity.x = 0;				//not moving
		//moving = false;							
		//grass.stop();


	},
	startBattle: function(player,enemy){
		//check if player has already fought this enemy
		if(!mob.haveFought){
			inBattle = true;
			//mark enemy as fought
			mob.haveFought = true;
			//create battlescreen
			battlescreen = game.add.sprite(game.width/2,game.world.height - game.canvas.height/2,'battle');
			battlescreen.anchor.setTo(0.5,0.5);
			//temporary instructions for battle screen
			//shows what action is currently selected
			selector = game.add.sprite(battlescreen.x - 150, battlescreen.y + 100,'select');
			console.log(battlescreen.y);
		}
	},
	render: function(){
		game.debug.body(mob);
		game.debug.body(player);
	}
}