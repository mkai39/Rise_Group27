//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Enemy Prefab

function Enemy (game, x, y, key){


	//later, have a picker that will spawn different kind of enemy

	//call enemy as a sprite
	Phaser.Sprite.call(this, game, x, y, key);

	//set enemy's anchor to bottom left of enemy
	this.anchor.set(0,1);

	//enable arcaade physics for enemy
	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000;

	//boolean to keep track of whether or not the player has fought this mob
	this.haveFought = false;


	//add animations for each kind of enemy here

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
	//enable collision between enemy mob and the floor
	game.physics.arcade.collide(this, floor);

	//once player has fought this mob, lower the opacity
	if(this.haveFought){
		this.alpha = 0.5;
	}

}

