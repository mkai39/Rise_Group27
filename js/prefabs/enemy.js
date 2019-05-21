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
	game.physics.arcade.collide(this, [floor,platform]);
	//when player overlaps with an enemy, start a battle
	game.physics.arcade.collide(player,this,function(){
		//check if enemy has been fought before
		if(!this.haveFought){
			//if not, game will now be in battle
			inBattle = true;
			this.haveFought = true;
			//create battlescreen
			battlescreen = game.add.sprite(game.width/2,game.camera.y + game.height/2,'battle');
			battlescreen.anchor.setTo(0.5,0.5);
			//create selector (shows player what action is selected)
			selector = game.add.sprite(battlescreen.x - 150, battlescreen.y + 100,'select');
			console.log(battlescreen.y);
		}

	}, null, this);

	//once player has fought this mob
	if(this.haveFought && !inBattle){
		//turn off collision with this mob
		this.body.checkCollision.up = false;
		this.body.checkCollision.right = false;
		this.body.checkCollision.left = false;
		//make mob transparent
		this.alpha = 0.5;
	}
}