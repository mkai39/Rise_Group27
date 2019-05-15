//Group 27
//Kaizena Ma
//Holly Cheng
//Linda Xieu

//Boot

var Boot = function(game) {};
Boot.prototype = {
	preload: function(){
		//set background color to dark gray
		game.stage.backgroundColor = "#383838";
		//load loading bar asset so it can be used in loading state
		game.load.image('load', 'assets/img/loadingbar.png');
	},
	create: function(){
		//start load state
		game.state.start('Load');
	}
};