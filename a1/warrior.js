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

function Warrior(game, spritesheets) {
	this.spritesheets = spritesheets;
    this.animation = new Animation(spritesheets[IDLE], 130, 160, 6, 0.14, 6, true, 1, false);
	this.state = IDLE_RIGHT;
    this.speed = 0;
	this.ySpeed = 0 ;
	this.isJumping = false;
	this.isAttacking = false;
    this.ctx = game.ctx;
	this.pressed = false;
    Entity.call(this, game, 300, 150);
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
		if (e.code === "ArrowUp") {
			if((Warrior.state === WALK_RIGHT || Warrior.state === IDLE_RIGHT) && 
			   Warrior.state !== JUMP_RIGHT) {
				Warrior.setState(JUMP_RIGHT);
			} else if ((Warrior.state === WALK_LEFT || Warrior.state === IDLE_LEFT) && 
			           Warrior.state !== JUMP_LEFT) {
				Warrior.setState(JUMP_LEFT);
			}	
		}
		if (e.code === "ArrowDown") {
			if((Warrior.state === WALK_RIGHT || Warrior.state === IDLE_RIGHT) && 
			   Warrior.state !== JUMP_RIGHT) {
				Warrior.setState(ATTACK_RIGHT);
			} else if ((Warrior.state === WALK_LEFT || Warrior.state === IDLE_LEFT) && 
			           Warrior.state !== JUMP_LEFT) {
				Warrior.setState(ATTACK_LEFT);
			}	
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
   
    if (this.x > 800) this.x = -230;
	
    Entity.prototype.update.call(this);
}

Warrior.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Warrior.prototype.setState = function(state) {
	if (state === IDLE_RIGHT) {
		this.speed = 0;
		this.state = IDLE_RIGHT;
		this.animation = new Animation(this.spritesheets[IDLE], 130, 160, 6, 0.14, 6, true, 1, false);
	} else if (state === IDLE_LEFT) {
		this.speed = 0;
		this.state = IDLE_LEFT;
		this.animation = new Animation(this.spritesheets[IDLE], 130, 160, 6, 0.14, 6, true, 1, true);
	} else if (state === WALK_RIGHT) {
		this.speed = 50;
		this.state = WALK_RIGHT;
		this.animation = new Animation(this.spritesheets[WALK], 130, 160, 6, 0.14, 6, true, 1, false);
	} else if (state === WALK_LEFT) {
		this.speed = -50;
		this.state = WALK_LEFT;
		this.animation = new Animation(this.spritesheets[WALK], 130, 160, 6, 0.14, 6, true, 1, true);
	}
	else if (state === JUMP_RIGHT) {
		this.isJumping = true;
		this.ySpeed = 50;
		this.state = JUMP_RIGHT;
		this.animation = new Animation(this.spritesheets[JUMP], 130, 160, 6, 0.14, 6, true, 1, false);
	} else if (state === JUMP_LEFT) {
		this.isJumping = true;
		this.ySpeed = 50;
		this.state = JUMP_LEFT;
		this.animation = new Animation(this.spritesheets[JUMP], 130, 160, 6, 0.14, 6, true, 1, true);
	} else if (state === ATTACK_RIGHT) {
		this.speed = 0;
		this.isAttacking = true;
		this.state = ATTACK_RIGHT;
		this.animation = new Animation(this.spritesheets[ATTACK], 230, 160, 6, 0.14, 6, true, 1, false);
	} else if (state === ATTACK_LEFT) {
		this.speed = 0;
		this.isAttacking = true;
		this.state = ATTACK_LEFT;
		this.animation = new Animation(this.spritesheets[ATTACK], 230, 160, 6, 0.14, 6, true, 1, true);
	}
}