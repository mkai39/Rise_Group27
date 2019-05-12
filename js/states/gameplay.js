
"use strict";

var xMOVE_SPEED = 200;
var player;
var mob;
var floor;
var battlescreen;

var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function(){
		console.log('GamePlay preload');
	},
	create: function(){

		console.log('GamePlay create');
		//set background color
		game.stage.backgroundColor = "#1C8A2E";

		//identify stage
		game.add.text(50,50,'This is GAMEPLAY\nSPACE to go to GAMEOVER state', {font:'18px Impact', fill: '#FFFFFF'});

		//enable arcade physics in the world
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//set the bounds of the world
		game.world.setBounds(0,0,2000,game.height);

		//create player character and enable arcade physics
		player = game.add.sprite(100,game.height-100,'mc');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 1000;															//give player gravity
		player.body.collideWorldBounds = true;													//make player collide with world bounds

		//create enemy character and enable arcade physics
		mob = game.add.sprite(300,game.height-100,'mob');
		game.physics.arcade.enable(mob);
		mob.body.gravity.y = 1000;


		//enable camera to follow player around
		game.camera.follow(player);

		//create floor object
		floor = game.add.sprite(0,game.height-20,'mc');
		floor.scale.setTo(30,1);
		//set floor to black/easier on the eyes
		floor.tint = 0x000000;
		//enable arcade physics for the floor
		game.physics.arcade.enable(floor);
		floor.body.immovable = true;



		//test battle screen
		var bat_label = game.add.text(game.width-100,20,'battle', {font:'24px Impact', fill: '#FFFFFF'});
		bat_label.inputEnabled = true;
		bat_label.events.onInputUp.add(function(){
			game.paused = true;
			console.log('game supposedly paused');
			battlescreen = game.add.sprite(0,0,'battle');
});
			//input listener
			game.input.onDown.add(platform,self);

			function platform(event){
				if(game.paused){
					if(event.y > game.height/2){
						console.log('action clicked, clicking works');
					}
					else{
						battlescreen.destroy();
						game.paused = false;
						console.log('game supposedly unpaused');
					}
				}
			};
		







	},
	update: function(){
		//make player/floor collide
		var inContact = game.physics.arcade.collide(player,floor);
		game.physics.arcade.collide(mob,floor);

		//movement for player character
		//check if right key down
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			//move right
			player.body.velocity.x = xMOVE_SPEED;
		}
		//check if left key down
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			//move left
			player.body.velocity.x = -xMOVE_SPEED;
		}
		else{
			//otherwise, don't move left/right
			player.body.velocity.x = 0;
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
	render: function(){
		//game.debug.body(floor);
		
	}
}