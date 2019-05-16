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
var mob;
var floor;
var battlescreen;
var commenceBattle;
var haveFought;
var grass,ding;
var moving;
var tempInstructions;
var selector;
var inBattle;

var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay preload');
	},
	create: function(){
		console.log('GamePlay create');
		//set background color
		game.stage.backgroundColor = "#1C8A2E";

		//enable arcade physics in the world
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//set the bounds of the world
		game.world.setBounds(0,0,game.width,1600);

		//create sky background
		var bg = game.add.sprite(0,0,'bg');
		bg.scale.setTo(3,2.1);

		//identify stage
		game.add.text(50,50,'This is GAMEPLAY\nSPACE to go to GAMEOVER state', {font:'18px Impact', fill: '#FFFFFF'});


		//create player character and enable arcade physics
		player = game.add.sprite(100,game.world.height-200,'mc');
		player.anchor.set(0,1);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 1000;															//give player gravity
		player.body.collideWorldBounds = true;													//make player collide with world bounds

		//create enemy character
		mob = new Enemy(game, 300, game.world.height-200, 'mob');
		game.add.existing(mob);


		//enable camera to follow player around
		game.camera.follow(player);

		//create floor object
		floor = game.add.sprite(0,game.world.height-200,'mc');
		floor.scale.setTo(10,40);
		//set floor to black/easier on the eyes
		floor.tint = 0x000000;
		//enable arcade physics for the floor
		game.physics.arcade.enable(floor);
		floor.body.immovable = true;

		//https://phaser.io/examples/v2/misc/pause-menu
		//input listener
//		game.input.onDown.add(this.battleChoice,self);

		//audio
		grass = game.add.audio('grass');
		ding = game.add.audio('ding');

		//boolean to tell whether player is currently moving so audio knows whent to be playing
		moving = false;



	},
	update: function(){
		//make player/floor collide
		var inContact = game.physics.arcade.collide(player,floor);

		//call this.startBattle if player and mob overlap, go to battle screen
		game.physics.arcade.overlap(player,mob,this.startBattle, null, this);

		//movement for player character
		//check if right key down

		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			//move right
			player.body.velocity.x = xMOVE_SPEED;
			//check so audio just plays once, not keep restarting while key down
			if (!moving){
				grass.play();
				moving = true;
			}
		}
		//check if left key down
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			//move left
			player.body.velocity.x = -xMOVE_SPEED;
			//check so audio just plays once, not keep restarting while key down
			if (!moving){
				grass.play();
				moving = true;
			}
		}
		else{
			//otherwise, don't move left/right
			player.body.velocity.x = 0;
			//reset audio conditions
			moving = false;
			grass.stop();
		}


		//if player on ground and up key down
		if(inContact && game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			//move up(jump)
			player.body.velocity.y = -450;
		}

		//check if spacebar down
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//go to next state
			game.state.start('GameOver');
		}
	},
	startBattle: function(player,enemy){
		//check if player has already fought this enemy
		if(!mob.haveFought){
			//mark enemy as fought
			mob.haveFought = true;
			//pause the game/cease player input for platforming game section
			game.paused = true;
			console.log('game supposedly paused');
			//create battlescreen
			battlescreen = game.add.sprite(game.width/2,4.5*game.height/4,'battle');
			battlescreen.anchor.setTo(0.5,0.5);
			//temporary instructions for battle screen
			//tempInstructions = game.add.text(battlescreen.x - battlescreen.width/2,battlescreen.y - battlescreen.height/2, 'click\nbottom half: console acknowledgement\ntop half: close battle window\n1 battle per enemy', {font: '20px Impact', fill: '#000000'});
			//shows what action is currently selected
			selector = game.add.sprite(battlescreen.x - 150,battlescreen.y + 100,'select');
		}
	},
	pauseUpdate(){
		if(selector.x == battlescreen.x - 150){
			if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				selector.x += 150;
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				console.log('current problem is that game is still paused so sound doesnt play until game is unpaused');
				ding.play();
			}
		}
		else if(selector.x == battlescreen.x){
			if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
				selector.x -= 150;
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				battlescreen.destroy();
				selector.destroy();
				console.log('game supposedly unpaused');
				game.paused = false;
			}
		}
	},
	render: function(){
		game.debug.body(mob);
		game.debug.body(player);
	}
}