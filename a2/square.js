function Square(game, xPos, yPos) {
	this.game = game;
	this.ctx = game.ctx;
	this.neighbors = [];	
	var rand = Math.random();
	this.level = 0;
	//60% of the time get lvl 0 and so fort
	//10% lvl 1
	//10 lvl 2
	//20 lvl 3
	if (rand < 0.2) { 
		this.level = 0;
	} else if (rand < 0.4) {
		this.level = 1;
	} else if (rand < 0.6) {
		this.level = 2;
	} else {
		this.level = 3;
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
	
	if (this.level === 0 && neighborLevels >= 2) {
		this.level = 1;
	} else if (this.level === 1 && neighborLevels <= 4) {
		this.level = 0;
	} else if (this.level === 1 && neighborLevels >= 8 && neighborLevels <= 15) {
		this.level = 2;
	} else if (this.level === 2 && (neighborLevels < 10 || neighborLevels > 16)) {
		this.level = 0;
	} else if (this.level === 2 && neighborLevels >= 10 && neighborLevels <= 12) {
		this.level = 1;
	} else if (this.level === 2 && neighborLevels >= 14 && neighborLevels <= 16) {
		this.level = 3;
	} else if (this.level === 3 && (neighborLevels < 15 || neighborLevels > 21)) {
		this.level = 0;
	} else if (this.level === 3 && neighborLevels >= 15 && neighborLevels <= 18) {
		this.level = 1;
	} else if (this.level === 3 && neighborLevels >= 19 && neighborLevels <= 21) {
		this.level = 2;
	}
	
}
/*
the darker the color the bigger the lvl
*/

Square.prototype.draw = function() {
	this.ctx.fillStyle = "black";
	this.ctx.strokeRect(this.x, this.y, 10, 10);
	if (this.level === 3) {
		this.ctx.fillStyle = "Orange";
	} else if (this.level === 2) {
		this.ctx.fillStyle = "Blue";
	} else if (this.level === 1) {
		this.ctx.fillStyle = "Red";
	}else {
		this.ctx.fillStyle = "#FFFFFF";
	}
	
	this.ctx.fillRect(this.x, this.y, 10, 10);
}
//
Square.prototype.setNeighbors = function(neighbors) {
	this.neighbors = neighbors;
}