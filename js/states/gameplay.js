
"use strict";

var xMOVE_SPEED = 200;
var player;
var mob;
var floor;
var battlescreen;
var commenceBattle;
var haveFought;
var grass,jingle,ding;

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

		//whether or not player has fought this mob yet
		//later move to prefab when multiple mobs exist
		haveFought = false;


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

		//https://phaser.io/examples/v2/misc/pause-menu
		//input listener
		game.input.onDown.add(this.battleChoice,self);

		//audio
		grass = game.add.audio('grass');
		jingle = game.add.audio('jingle');
		ding = game.add.audio('ding');




	},
	update: function(){
		//make player/floor collide
		var inContact = game.physics.arcade.collide(player,floor);
		game.physics.arcade.collide(mob,floor);

		//call this.startBattle if player and mob overlap, go to battle screen
		game.physics.arcade.overlap(player,mob,this.startBattle, null, this);

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
	startBattle: function(player,enemy){
		//check if player has already fought this enemy
		if(!haveFought){
			//mark enemy as fought
			haveFought = true;
			//pause the game/cease player input for platforming game section
			game.paused = true;
			console.log('game supposedly paused');
			//create battlescreen
			battlescreen = game.add.sprite(game.width/2,game.height/2,'battle');
			battlescreen.anchor.setTo(0.5,0.5);
		}
	},
	battleChoice: function(event){
		//this function is called when mouse is clicked
		//check if game paused aka in battle
		if(game.paused){
			//if bottom half of screen clicked, acknowledge in console
			if(event.y > game.height/2){
				console.log('action clicked, clicking works');
			}
			//if clicked elsewhere (top half)
			else{
				//end battle sequence
				battlescreen.destroy();
				//resume game
				game.paused = false;
				console.log('game supposedly unpaused');
			}
		}
	},
	render: function(){
		
	}
}