const IDLE_RIGHT = 0;
const IDLE_LEFT = 1;
const WALK_RIGHT = 2;
const WALK_LEFT = 3;
const ATTACK_RIGHT = 4;
const ATTACK_LEFT = 5;
const JUMP_RIGHT = 6;
const JUMP_LEFT = 7;
const IDLE = 0;
const WALK = 1;
const ATTACK = 2;
const JUMP = 3;



function ThinkingCloud(game, spritesheets) {
	this.spritesheets = spritesheets;
	this.animation = new Animation(spritesheets[3], 1152, 648, 1, 0.2, 1, true, 0.3, false);
	this.ctx = game.ctx;
	this.pressed = false;
	Entity.call(this, game, 600,350);

}

ThinkingCloud.prototype = new Entity();
ThinkingCloud.prototype.constructor = ThinkingCloud;

ThinkingCloud.prototype.draw = function() {
	
	if((this.game.entities[3].x >= 450 && this.game.entities[3].x <= 550)){
		this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
		Entity.prototype.draw.call(this);
		
	}
	if( (this.game.entities[3].x >= 350 && this.game.entities[3].x <= 380)) {
		this.animation.drawFrame(this.game.clockTick, this.ctx, 350, this.y); //FIX THE NUMBERS
		Entity.prototype.draw.call(this);	
	}

}

ThinkingCloud.prototype.update = function () {
	var ThinkingCloud = this;
	this.ctx.canvas.addEventListener("keydown", function (e) { //get pressing to work
		if (e.code === "keyY") {
			console.log("clicked y");
		} 		
    }, false);
	if((this.game.entities[1].x >= 450 && this.game.entities[1].x <= 475)) {
		console.log("I should click Y");
	}

}

function FatGuy(game, spritesheets) {
	this.spritesheets = spritesheets;
	this.animation = new Animation(spritesheets[4], 300, 418, 1, 0.5, 1, true, 0.85, false);
	this.state = IDLE_RIGHT;
	this.speed = 0;
	this.ySpeed = 0;
	this.ctx = game.ctx;
	this.pressed = false;
	Entity.call(this, game, 400, 530);
}

FatGuy.prototype = new Entity();
FatGuy.prototype.constructor = FatGuy;

FatGuy.prototype.update = function () {
	var FatGuy = this;
	this.ctx.canvas.addEventListener("keydown", function (e) {
		if (e.code === "ArrowRight" && FatGuy.state !== WALK_RIGHT && 
		    (FatGuy.state !== JUMP_RIGHT && FatGuy.state !== JUMP_LEFT)) {
			FatGuy.pressed = true;
			FatGuy.setState(WALK_RIGHT);
		} 
		if (e.code === "ArrowLeft" && FatGuy.state !== WALK_LEFT && 
		           (FatGuy.state !== JUMP_RIGHT && FatGuy.state !== JUMP_LEFT)) {
			FatGuy.pressed = true;
			FatGuy.setState(WALK_LEFT);
		}	
	}, false);
	this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.code === "ArrowRight" && 
		    FatGuy.state !== IDLE_RIGHT && 
			FatGuy.state !== JUMP_RIGHT && 
			FatGuy.state !== JUMP_LEFT &&		
			FatGuy.state !== ATTACK_RIGHT && 
			FatGuy.state !== ATTACK_LEFT) {
			FatGuy.pressed = false;
			FatGuy.setState(IDLE_RIGHT);
		}
		if (e.code === "ArrowLeft" && 
		    FatGuy.state !== IDLE_LEFT && 
			FatGuy.state !== JUMP_RIGHT && 
			FatGuy.state !== JUMP_LEFT &&
			FatGuy.state !== ATTACK_RIGHT && 
			FatGuy.state !== ATTACK_LEFT) {
			FatGuy.pressed = false;	
			FatGuy.setState(IDLE_LEFT);
		}
    }, false);
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);

}
FatGuy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



function Warrior(game, spritesheets) {
	this.spritesheets = spritesheets;
    this.animation = new Animation(spritesheets[IDLE], 768, 768, 12, 0.1, 12, true, 0.5, false);
	this.state = IDLE_RIGHT;
    this.speed = 0;
	this.ySpeed = 0 ;
    this.ctx = game.ctx;
	this.pressed = false;
    Entity.call(this, game, 400, 500);
}

Warrior.prototype = new Entity();
Warrior.prototype.constructor = Warrior;

Warrior.prototype.update = function () {
	var Warrior = this;
	this.ctx.canvas.addEventListener("keydown", function (e) {
		if (e.code === "ArrowRight" && Warrior.state !== WALK_RIGHT && 
		    (Warrior.state !== JUMP_RIGHT && Warrior.state !== JUMP_LEFT)) {
			Warrior.pressed = true;
			Warrior.setState(WALK_RIGHT);
		} 
		if (e.code === "ArrowLeft" && Warrior.state !== WALK_LEFT && 
		           (Warrior.state !== JUMP_RIGHT && Warrior.state !== JUMP_LEFT)) {
			Warrior.pressed = true;
			Warrior.setState(WALK_LEFT);
		}
		
    }, false);
	
	this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.code === "ArrowRight" && 
		    Warrior.state !== IDLE_RIGHT && 
			Warrior.state !== JUMP_RIGHT && 
			Warrior.state !== JUMP_LEFT &&		
			Warrior.state !== ATTACK_RIGHT && 
			Warrior.state !== ATTACK_LEFT) {
			Warrior.pressed = false;
			Warrior.setState(IDLE_RIGHT);
		}
		if (e.code === "ArrowLeft" && 
		    Warrior.state !== IDLE_LEFT && 
			Warrior.state !== JUMP_RIGHT && 
			Warrior.state !== JUMP_LEFT &&
			Warrior.state !== ATTACK_RIGHT && 
			Warrior.state !== ATTACK_LEFT) {
			Warrior.pressed = false;	
			Warrior.setState(IDLE_LEFT);
		}
    }, false);
	
	this.x += this.game.clockTick * this.speed;

	if (this.state === JUMP_RIGHT || this.state === JUMP_LEFT) {
		this.y -= this.game.clockTick * this.ySpeed;
		this.ySpeed -= 50 * this.game.clockTick;
	}
	if (this.y > 150 && (this.state === JUMP_LEFT || this.state === JUMP_RIGHT)) {
		if (this.state === JUMP_LEFT) {
			if (this.pressed)
				this.setState(WALK_LEFT);
			else
				this.setState(IDLE_LEFT);
		} else {
			if (this.pressed)
				this.setState(WALK_RIGHT);
			else
				this.setState(IDLE_RIGHT);
		}
		this.y = 150;
		this.isJumping = false;
		this.ySpeed = 0;
	}
	//condtional statements can go here
	
    Entity.prototype.update.call(this);
}

Warrior.prototype.draw = function () {
	if(this.game.entities[3].x > 800) {
		console.log("fat guy walking");
		console.log(this.game.entities[3].x);
	 //get the first entitiy to remove and 2nd one to show
	}
  /*  this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);*/
}

Warrior.prototype.setState = function(state) {
	if (state === IDLE_RIGHT) {
		this.speed = 0;
		this.state = IDLE_RIGHT;
		this.animation = new Animation(this.spritesheets[IDLE], 768, 768, 12, 0.14, 6, true, 0.5, false);
	} else if (state === IDLE_LEFT) {
		this.speed = 0;
		this.state = IDLE_LEFT;
		this.animation = new Animation(this.spritesheets[IDLE], 768, 768, 12, 0.14, 6, true, 0.5, true);
	} else if (state === WALK_RIGHT) {
		this.speed = 50;
		this.state = WALK_RIGHT;
		this.animation = new Animation(this.spritesheets[WALK], 768, 768, 6, 0.14, 6, true, 0.5, false);
	} else if (state === WALK_LEFT) {
		this.speed = -50;
		this.state = WALK_LEFT;
		this.animation = new Animation(this.spritesheets[WALK], 768, 768, 6, 0.14, 6, true, 0.5, true);
	}
	else if (state === JUMP_RIGHT) {
		this.isJumping = true;
		this.ySpeed = 50;
		this.state = JUMP_RIGHT;
		this.animation = new Animation(this.spritesheets[JUMP], 768, 768, 6, 0.14, 6, true, 0.5, false);
	} else if (state === JUMP_LEFT) {
		this.isJumping = true;
		this.ySpeed = 50;
		this.state = JUMP_LEFT;
		this.animation = new Animation(this.spritesheets[JUMP], 768, 768, 6, 0.14, 6, true, 0.5, true);
	} else if (state === ATTACK_RIGHT) {
		this.speed = 0;
		this.isAttacking = true;
		this.state = ATTACK_RIGHT;
		this.animation = new Animation(this.spritesheets[ATTACK], 230, 768, 6, 0.14, 6, true, 0.5, false);
	} else if (state === ATTACK_LEFT) {
		this.speed = 0;
		this.isAttacking = true;
		this.state = ATTACK_LEFT;
		this.animation = new Animation(this.spritesheets[ATTACK], 230, 768, 6, 0.14, 6, true, 0.5, true);
	}
}

FatGuy.prototype.setState = function(state) {
	if (state === IDLE_RIGHT) {
		this.speed = 0;
		this.state = IDLE_RIGHT;
		this.animation = new Animation(this.spritesheets[4], 300, 418, 1, 0.5, 1, true, 0.85, false);
	} else if (state === IDLE_LEFT) {
		this.speed = 0;
		this.state = IDLE_LEFT;
		this.animation = new Animation(this.spritesheets[4], 300, 418, 1, 0.5, 1, true, 0.85, true);
	} else if (state === WALK_RIGHT) {
		this.speed = 50;
		this.state = WALK_RIGHT;
		this.animation = new Animation(this.spritesheets[5], 300, 418, 4, 0.5, 4, true, 0.85, false);
	} else if (state === WALK_LEFT) {
		this.speed = -50;
		this.state = WALK_LEFT;
		this.animation = new Animation(this.spritesheets[5], 300, 418, 4, 0.5, 4, true, 0.85, true);
	}

}