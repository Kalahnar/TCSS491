function Square(game, xPos, yPos) {
	this.game = game;
	this.ctx = game.ctx;
	this.neighbors = [];	
	var rand = Math.random();
	this.level = 0;
	//20% of the time get lvl 0 and so fort
	//20% lvl 1
	//20% lvl 2
	//20% lvl 3
	//20% lvl 4
	if (rand < 0.2) { 
		this.level = 0;
	} else if (rand < 0.4) {
		this.level = 1;
	} else if (rand < 0.6) {
		this.level = 2;
	} else if (rand < 0.8) {
		this.level = 3;
	} else {
		this.level = 4;
		}
	//this.alive = Math.random() > .90 ? true : false;
	Entity.call(this, game, xPos * 10, yPos * 10);//x and y cor of each of the square (starting position) each square 10x10
}

Square.prototype = new Entity();
Square.prototype.constructor = Square;

Square.prototype.update = function() {
	var neighborLevels = 0;
	
	for (var i = 0; i < 8; i++) {
		neighborLevels += this.neighbors[i].level;
	}
	//Interaction
	if (this.level === 0 && neighborLevels <= 10){
		this.level = 1;
	} else if (this.level === 0 && neighborLevels <= 15){
		this.level = 2;
	} else if (this.level === 0 && neighborLevels <= 20){
		this.level = 3;
	} else if (this.level === 0 && neighborLevels > 20){
		this.level = 4; //--------------------------------Done with lvl 0 Interaction
	} else if (this.level === 1 && neighborLevels <= 5){
		this.level = 4;
	} else if (this.level === 1 && neighborLevels <= 15){
		this.level = 3;
	} else if (this.level === 1 && neighborLevels <= 20){
		this.level = 2;
	} else if (this.level === 1 && neighborLevels > 20){
		this.level = 0; //--------------------------------Done with lvl 1 Interaction
	} else if (this.level === 2 && neighborLevels <= 5){
		this.level = 0;
	} else if (this.level === 2 && neighborLevels <= 10){
		this.level = 1;
	} else if (this.level === 2 && neighborLevels <= 20){
		this.level = 3;
	} else if (this.level === 2 && neighborLevels > 20){
		this.level = 4; //--------------------------------Done with lvl 2 Interaction
	} else if (this.level === 3 && neighborLevels <= 5){
		this.level = 1;
	} else if (this.level === 3 && neighborLevels <= 15){
		this.level = 4;
	} else if (this.level === 3 && neighborLevels <= 20){
		this.level = 2;
	} else if (this.level === 3 && neighborLevels > 20){
		this.level = 0; //--------------------------------Done with lvl 3 Interaction
	} else if (this.level === 4 && neighborLevels <= 5){
		this.level = 3;
	} else if (this.level === 4 && neighborLevels <= 10){
		this.level = 0;
	} else if (this.level === 4 && neighborLevels <= 20){
		this.level = 2;
	} else if (this.level === 4 && neighborLevels > 20){
		this.level = 1; //--------------------------------Done with lvl 4 Interaction
	}
}

Square.prototype.draw = function() {
	this.ctx.fillStyle = "black";
	this.ctx.strokeRect(this.x, this.y, 10, 10);
	if (this.level === 0) {
		this.ctx.fillStyle = "Black";
	} else if (this.level === 1) {
		this.ctx.fillStyle = "White";
	} else if (this.level === 2) {
		this.ctx.fillStyle = "Red";
	} else if (this.level === 3) {
		this.ctx.fillStyle = "Yellow";
	} else {
		this.ctx.fillStyle = "Grey";
	}
	
	this.ctx.fillRect(this.x, this.y, 10, 10);
}

Square.prototype.setNeighbors = function(neighbors) {
	this.neighbors = neighbors;
}