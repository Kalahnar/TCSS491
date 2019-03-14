window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.isPaused = true;
	this.ticked = false;
	this.isStepping = true;
	this.play = null;
	this.pause = null;//this
	this.step = null;//this
	this.load = null;
	this.save = null;
	this.squares = [];
}

GameEngine.prototype.init = function (ctx, play, pause, step) {
	this.socket = io.connect("http://24.16.255.56:8888");
    this.ctx = ctx;
	this.play = play;
	this.pause = pause;//this
	this.step = step;//this
	this.load = load;//add
	this.save = save;//add
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    this.startInput();
	
	this.socket.on("connect", function () {//add
        console.log("Socket connected.")//add
    });
	
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
	(function gameLoop() {
		that.loop();
		requestAnimFrame(gameLoop, that.ctx.canvas);
	})();
}

GameEngine.prototype.setSquares = function(squares) {//add this method
	this.squares = [];
	for (var i = 0; i < 62; i++) {
		this.squares.push([]);
		for (var j = 0; j < 82; j++) {
			this.squares[i].push(squares[i][j].level);
		}
	}
	this.draw();
}


GameEngine.prototype.pauseGame = function() {
	console.log("pausing game");
	this.isPaused = true;
}

GameEngine.prototype.resumeGame = function() {
	console.log("resuming game");
	this.isPaused = false;
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
	
	

    var that = this;

    // event listeners are added here

	this.play.addEventListener("click", function (e) {
		that.resumeGame();
    }, false);
	
	this.pause.addEventListener("click", function (e) {
		that.pauseGame();
    }, false);
	
	this.step.addEventListener("click", function (e) {
		that.isStepping = true;
    }, false);
	
	this.load.addEventListener("click", function (e) {//
		that.socket.emit('load', { studentname: "Luka Gajic", statename: "save"});//add
    }, false);//add
	

    console.log('Input started');
}

GameEngine.prototype.saveGame = function() {//add
	this.socket.emit('save', { studentname: "Luka Gajic", statename: "save", state: this.squares });//add
}//add

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
}

GameEngine.prototype.loop = function () {
	if (this.isStepping) {
		this.update();
		this.draw();
		this.isStepping = false;
	}
	if (!this.isPaused) {
		this.clockTick = this.timer.tick();
		if (this.timer.gameTime % 0.3 > 0.15 && !this.ticked) {
			this.update();
			this.draw();
			this.ticked = true;
			//console.log("tick");
		} else if (this.timer.gameTime % 0.3 <= 0.15 && this.ticked){
			this.ticked = false;
			//console.log("tock");
		}
	}
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}