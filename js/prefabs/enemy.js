//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Enemy Prefab
//Also covers part of battle sequence stuffs
function Enemy (game, x, y, key){

	//boolean to keep track of whether or not the player has fought this mob
	this.haveFought = false;
	//later, have a picker that will spawn different kind of enemy

	//call enemy as a sprite
	Phaser.Sprite.call(this, game, x, y, key, 0);
	//set enemy's anchor to bottom left of enemy
	this.anchor.set(0,1);
	//enable arcaade physics for enemy
	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000;
	
	// var battleAction = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	// battleAction.onDown.add(function(){
	// 	if(inBattle && turn == 0){
	// 		if(selector.x == battlescreen.x-150){
	// 			console.log(this.health)
	// 			console.log('fight');
	// 		}
	// 	}
	// },this);



	//add animations for each kind of enemy here
	//imp
	this.animations.add('baddie1', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1,0], 5, true);
	//snek
	this.animations.add('baddie2', [0,1], 5, true);

	this.animations.add('baddie3', [0,1,2,3,4,3,2,1,0], 5, true);

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
	if(this.key == 'imp'){
		this.animations.play('baddie1');
	}
	else if(this.key == 'snek'){
		this.animations.play('baddie2');
	}
	else if(this.key == 'wike mazowski'){
		this.animations.play('baddie3');
	}
	//enable collision between enemy mob and the floor
	game.physics.arcade.collide(this, mapLayer);
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
			this.battlePlayer = new InBattleSprite(game, 'player', this.key);
			game.add.existing(this.battlePlayer);
			this.battleEnemy = new InBattleSprite(game, 'monster', this.key);
			game.add.existing(this.battleEnemy);
			//create selector (shows player what action is selected)
			selector = game.add.sprite(battlescreen.x - 150, battlescreen.y + 100,'select');
		}

	}, null, this);

	//once player has fought this mob
	if(this.haveFought && !inBattle){
		//turn off collision with this mob
		this.body.checkCollision.up = false;
		this.body.checkCollision.right = false;
		this.body.checkCollision.left = false;
		//make mob transparent
		//this.alpha = 0.5;
		game.add.tween(this).to({alpha:0.5}, 500, Phaser.Easing.Linear.None, true);
		this.battlePlayer.destroy();
		this.battleEnemy.destroy();
		selector.destroy();
	}

}