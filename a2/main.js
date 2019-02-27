var AM = new AssetManager();

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};


AM.queueDownload("./a2/img/heroIdle.png");
AM.queueDownload("./a2/img/heroWalk.png");
AM.queueDownload("./a2/img/heroJump.png");
AM.queueDownload("./a2/img/think.png");
AM.queueDownload("./a2/img/background.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	
	var spritesheets = [];
	spritesheets.push(AM.getAsset("./a2/img/heroIdle.png"));
	spritesheets.push(AM.getAsset("./a2/img/heroWalk.png"));
	spritesheets.push(AM.getAsset("./a2/img/heroJump.png"));
	spritesheets.push(AM.getAsset("./a2/img/think.png"));
	
	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./a2/img/background.png")));
	
	gameEngine.addEntity(new Warrior(gameEngine, spritesheets));
	
	gameEngine.addEntity(new ThinkingCloud(gameEngine, spritesheets));

    console.log("All Done!");
});