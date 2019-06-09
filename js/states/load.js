//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Load State


"use strict";

//note to self: go over nathan's paddle pong code later on
//to figure out loading screen stuffs



var Load = function(game) {};
Load.prototype = {
	preload: function(){
		console.log('Load preload');

		//set background color to dark gray
		game.stage.backgroundColor = "#383838";
		//create load bar and set it at center of the screen
		//based off Nathan's Paddle Parkour
		var loadBar = game.add.sprite(game.width/2, game.height/2, 'load');
		loadBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadBar);

		//preload assets
		//art
		//bg
		game.load.image('sky','assets/img/sky_complete.png');
		game.load.image('overlay','assets/img/overlay.png');
		//UI
		game.load.image('menuArrow','assets/img/menu_arrow.png');
		game.load.image('fightArrow', 'assets/img/fightarrow.png');
		game.load.image('cantRun', 'assets/img/cantrun_large_center.png');
		game.load.atlas('cantFight', 'assets/img/cantfight.png', 'assets/img/json/cantfight.json');
		game.load.image('hp','assets/img/hp_darkred.png');
		game.load.image('hpTop', 'assets/img/hp_red.png');
		game.load.image('miss','assets/img/miss.png');

		//controls tutorial
		game.load.atlas('space', 'assets/img/space.png', 'assets/img/json/space.json');
		game.load.atlas('upKey', 'assets/img/arrows3.png', 'assets/img/json/arrows3.json');
		game.load.atlas('arrowKeys', 'assets/img/arrows2.png', 'assets/img/json/arrows2.json');

		//menu/credits
		game.load.image('startCredits', 'assets/img/start_credits.png');
		game.load.image('menu','assets/img/menu.png');
		//the battle screen
		game.load.atlas('fightScreen', 'assets/img/fightscreen_all.png', 'assets/img/json/fightscreen_all.json');

		//texture atlas of diff expressioned player character walking animations
		game.load.atlas('protag','assets/img/protag_all.png','assets/img/json/protag_all.json');
		game.load.atlas('protagFight', 'assets/img/protag_fight_all.png', 'assets/img/json/protag_fight_all.json');
		game.load.atlas('headshot', 'assets/img/headshot_all.png', 'assets/img/json/headshot_all.json');

		//same but for mobs
		game.load.atlas('imp', 'assets/img/baddie01.png', 'assets/img/json/baddie01.json');
		game.load.atlas('snek','assets/img/baddie02.png', 'assets/img/json/baddie02.json');
		game.load.atlas('wike mazowski','assets/img/baddie03.png', 'assets/img/json/baddie03.json');
		game.load.atlas('chatter','assets/img/baddie04.png', 'assets/img/json/baddie04.json');
		game.load.atlas('boss', 'assets/img/boss.png', 'assets/img/json/boss.json');
		//large battlesprites for mobs
		game.load.atlas('impBig', 'assets/img/baddie01_large.png', 'assets/img/json/baddie01_large.json');
        game.load.atlas('snekBig', 'assets/img/baddie02_large.png', 'assets/img/json/baddie02_large.json');
        game.load.atlas('wike mazowskiBig', 'assets/img/baddie03_large.png', 'assets/img/json/baddie03_large.json');
        game.load.atlas('chatterBig', 'assets/img/baddie04_large.png', 'assets/img/json/baddie04_large.json');


		//background tilemap data, spritesheet
		game.load.tilemap('gamestage', 'assets/img/json/tile_map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet','assets/img/final_final_final_bg.png',32,32);



		//narration images
		game.load.image('narrateBG', 'assets/img/open/narration_bg.png');
		game.load.image('pg1','assets/img/open/1.png');
		game.load.image('pg2', 'assets/img/open/2.png');


		//audio
		//sfx
		game.load.audio('selected', 'assets/audio/select.mp3');
		game.load.audio('changeSelection','assets/audio/select2.mp3');
		game.load.audio('step1', 'assets/audio/footsteps.mp3');
		game.load.audio('step2', 'assets/audio/footsteps_louder.mp3');
		game.load.audio('shing', 'assets/audio/attack.wav');

		//bgms
		game.load.audio('battleBGM', 'assets/audio/BATTLE_PerituneMaterial_Rapid2.mp3');
		game.load.audio('bossbattleBGM', 'assets/audio/BOSSBATTLE_PerituneMaterial_Ametsuchi.mp3');
		game.load.audio('creditsBGM', 'assets/audio/CREDITS_PerituneMaterial_Holy_Place2.mp3');
		game.load.audio('getupBGM', 'assets/audio/GETUP_PerituneMaterial_Memories3.mp3');
		game.load.audio('menuBGM', 'assets/audio/MENU_PerituneMaterial_Wish4.mp3');
		game.load.audio('platformingBGM', 'assets/audio/PLATFORMING_PerituneMaterial_OverWorld.mp3');
		game.load.audio('resolutionBGM', 'assets/audio/RESOLUTION_PerituneMaterial_GentleTheme_Piano.mp3');



	},
	update: function(){
			//go to next state: menu
			game.state.start('MainMenu');
	}
}