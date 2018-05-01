// Settings.
var GLOBAL_SCALE = .7;
var DEBUG = false;
var GRID = true;
var BACKGROUND_WIDTH = 1440;
var BACKGROUND_HEIGHT = 900;
var TILES = 5;

// Positions for the movable objects. Coordinates 
// should be within the range of tiles.
var POSITIONS = {
    ship: {
        x: 0,
        y: 4
    },
    chest: {
        x: TILES - 1,
        y: TILES - 1
    },
    bomb: {
        x: 2,
        y: 3
    }
};

(function () {
    'use strict';

    // Get canvas element.
    var canvasElement = document.getElementById('game-canvas');
    canvasElement.width = document.body.clientWidth;
    canvasElement.height = canvasElement.width / BACKGROUND_WIDTH * BACKGROUND_HEIGHT;

    window.addEventListener('resize', function () {
        canvasElement.width = document.body.clientWidth;
        canvasElement.height = canvasElement.width / BACKGROUND_WIDTH * BACKGROUND_HEIGHT;

        // Set global scale.
        GLOBAL_SCALE = canvasElement.width / BACKGROUND_WIDTH;
    });

    // Set global scale.
    GLOBAL_SCALE = canvasElement.width / BACKGROUND_WIDTH;

    // Create stage.
    var stage = new createjs.Stage("game-canvas");

    // Create assets.
    var backgroundBitmap = new createjs.Bitmap('assets/background.png');
    var block = new Block();
    var chest = new Chest();
    var bomb = new Bomb();
    var ship = new Ship();
    var cloud1 = new Cloud(1);
    var cloud2 = new Cloud(2);
    var cloud3 = new Cloud(2);
    var cloud4 = new Cloud(3);
    var cloud5 = new Cloud(3);

    stage.addChild(backgroundBitmap);

    block.initialize(stage);
    chest.initialize(stage);
    bomb.initialize(stage);
    ship.initialize(stage);
    cloud1.initialize(stage);
    cloud2.initialize(stage);
    cloud3.initialize(stage);
    cloud4.initialize(stage);
    cloud5.initialize(stage);

    createjs.Ticker.framerate = 60;

    // Register tick event handler.
    createjs.Ticker.addEventListener('tick', function () {
        // Get positions.
        var chestPosition = block.getTilePosition(POSITIONS.chest.x, POSITIONS.chest.y);
        var bombPosition = block.getTilePosition(POSITIONS.bomb.x, POSITIONS.bomb.y);
        var shipPosition = block.getTilePosition(POSITIONS.ship.x, POSITIONS.ship.y);

        // Set positions.
        block.x = 0;
        block.y = 0;
        
        chest.x = chestPosition.x;
        chest.y = chestPosition.y;
        bomb.x = bombPosition.x;
        bomb.y = bombPosition.y;
        ship.x = shipPosition.x;
        ship.y = shipPosition.y;

        // Set scale.
        backgroundBitmap.scaleX = GLOBAL_SCALE;
        backgroundBitmap.scaleY = GLOBAL_SCALE;

        block.update();
        chest.update();
        bomb.update();
        ship.update();
        cloud1.update();
        cloud2.update();
        cloud3.update();
        cloud4.update();
        cloud5.update();

        stage.update();
    });

    // Start reinforcement learning.
    startRl();
})();
