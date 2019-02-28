var AM = new AssetManager();

AM.queueDownload("./img/knight/IDLE.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

	var playButton = document.getElementById("play");
	var pauseButton = document.getElementById("pause");
	var stepButton = document.getElementById("step");
	
    var gameEngine = new GameEngine();
    gameEngine.init(ctx, playButton, pauseButton, stepButton);
    
	var squares = [[]];
	/*
	pushing new squartes into the 2d array 60 * 80
	*/
	for (var i = -1; i < 61; i++) { //-1 cuz it kept crashing
		squares.push([]);
		for (var j = -1; j < 81; j++) {
			squares[i+1].push(new Square(gameEngine, j, i));
		}
	}
	
	/*	
		initializing edges that arent supposed to show to 0
		
		the darker the color the bigger the lvl
	
	for (var i = 0; i < 62; i++) {
		for (var j = 0; j < 82; j++) {
			if (i === 0 || i === 61) {
				squares[i][j].level = 0;
			}
			if (j === 0 || j === 81) {
				squares[i][j].level = 0;
			}
		}
	}
	/*
		adding each of the squares from the 2d array into the game
	*/
	for (var i = 1; i < 61; i++) {
		for (var j = 1; j < 81; j++) {
			console.log(i + ", " + j);
			gameEngine.addEntity(squares[i][j]);
		}
	}
	/*
		each square in the simulation thats shown on the screen *not the ones on the edges, they all have 8 neighours 
		up until point clonining the actual game of life
		setting neighours diagonili as well
	*/
	for (var i = 1; i < 61; i++) {
		for (var j = 1; j < 81; j++) {
			var neighbors =  [];
			neighbors.push(squares[i-1][j-1]);
			neighbors.push(squares[i-1][j]);
			neighbors.push(squares[i-1][j+1]);
			neighbors.push(squares[i][j-1]);
			neighbors.push(squares[i][j+1]);
			neighbors.push(squares[i+1][j-1]);
			neighbors.push(squares[i+1][j]);
			neighbors.push(squares[i+1][j+1]);
			squares[i][j].setNeighbors(neighbors); //array neighbours, pushed all neighours into the array, then call setNeighbors method which sets passed in array as the neighours of that square
		}
	}

	gameEngine.start();
	
    console.log("All Done!");
});