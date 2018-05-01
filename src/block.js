function Block() {
    // Constants.
    var TILE_BOTTOM_OFFSET = 40;
    var WATER_OFFSET_X = 280;
    var WATER_OFFSET_Y = 85;

    // Create object.
    var that = {
        x: 0,
        y: 0,
        topPosition: { x: 0, y: 0 },
        bottomPosition: { x: 0, y: 0 },
        leftPosition: { x: 0, y: 0 },
        rightPosition: { x: 0, y: 0 },
        waterBitmap: undefined,
        blockBitmap: undefined,
        topCircle: undefined,
        bottomCircle: undefined,
        leftCircle: undefined,
        rightCircle: undefined,
    };

    function createCircle() {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("Red").drawCircle(0, 0, 10);
        return circle;
    }

    var initialize = function (stage) {
        // Create assets and objects.
        this.waterBitmap = new createjs.Bitmap('assets/water.png');
        this.blockBitmap = new createjs.Bitmap('assets/block.png');

        if (DEBUG) {
            this.topCircle = createCircle();
            this.bottomCircle = createCircle();
            this.leftCircle = createCircle();
            this.rightCircle = createCircle();
        }

        stage.addChild(this.blockBitmap);
        stage.addChild(this.waterBitmap);

        if (DEBUG) {
            stage.addChild(this.topCircle);
            stage.addChild(this.bottomCircle);
            stage.addChild(this.leftCircle);
            stage.addChild(this.rightCircle);
        }

        if (DEBUG || GRID) {
            this.lines = new createjs.Shape();
            stage.addChild(this.lines);
        }
    }.bind(that);

    var update = function () {
        // Update positions.
        this.topPosition.x = this.x + this.waterBitmap.image.width * GLOBAL_SCALE / 2 + WATER_OFFSET_X * GLOBAL_SCALE;
        this.topPosition.y = this.y + WATER_OFFSET_Y * GLOBAL_SCALE;
        this.bottomPosition.x = this.x + this.waterBitmap.image.width * GLOBAL_SCALE / 2 + WATER_OFFSET_X * GLOBAL_SCALE;
        this.bottomPosition.y = this.y + (this.waterBitmap.image.height - TILE_BOTTOM_OFFSET) * GLOBAL_SCALE + WATER_OFFSET_Y * GLOBAL_SCALE;
        this.leftPosition.x = this.x + WATER_OFFSET_X * GLOBAL_SCALE;
        this.leftPosition.y = this.y + (this.waterBitmap.image.height - TILE_BOTTOM_OFFSET) * GLOBAL_SCALE / 2 + WATER_OFFSET_Y * GLOBAL_SCALE;
        this.rightPosition.x = this.x + this.waterBitmap.image.width * GLOBAL_SCALE + WATER_OFFSET_X * GLOBAL_SCALE;
        this.rightPosition.y = this.y + (this.waterBitmap.image.height - TILE_BOTTOM_OFFSET) * GLOBAL_SCALE / 2 + WATER_OFFSET_Y * GLOBAL_SCALE;

        // Set positions.
        this.waterBitmap.x = this.x + WATER_OFFSET_X * GLOBAL_SCALE;
        this.waterBitmap.y = this.y + WATER_OFFSET_Y * GLOBAL_SCALE;
        this.blockBitmap.x = this.x;
        this.blockBitmap.y = this.y;

        if (DEBUG) {
            this.topCircle.x = this.topPosition.x;
            this.topCircle.y = this.topPosition.y;
            this.bottomCircle.x = this.bottomPosition.x;
            this.bottomCircle.y = this.bottomPosition.y;
            this.leftCircle.x = this.leftPosition.x;
            this.leftCircle.y = this.leftPosition.y;
            this.rightCircle.x = this.rightPosition.x;
            this.rightCircle.y = this.rightPosition.y;
        }

        // Set scale.
        this.waterBitmap.scaleX = GLOBAL_SCALE;
        this.waterBitmap.scaleY = GLOBAL_SCALE;
        this.blockBitmap.scaleX = GLOBAL_SCALE;
        this.blockBitmap.scaleY = GLOBAL_SCALE;

        if (DEBUG || GRID) {
            // Draw grid.
            this.lines.graphics.clear();
            if (!DEBUG) {
                this.lines.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,.3)");
            }
            else {
                this.lines.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)");
            }

            // Calculate deltas.
            var xDelta = (this.rightPosition.x - this.leftPosition.x) / 2;
            var yDelta = (this.bottomPosition.y - this.topPosition.y) / 2;

            for (var i = 0; i <= TILES; i++) {
                var x = this.topPosition.x + xDelta / TILES * i;
                var y = this.bottomPosition.y - yDelta / TILES * i;
                this.lines.graphics.moveTo(x, y);
                this.lines.graphics.lineTo(x - xDelta, y - yDelta);
            }

            for (var i = 0; i <= TILES; i++) {
                var x = this.leftPosition.x + xDelta / TILES * i;
                var y = this.leftPosition.y + yDelta / TILES * i;
                this.lines.graphics.moveTo(x, y);
                this.lines.graphics.lineTo(x + xDelta, y - yDelta);
            }

            this.lines.graphics.endStroke();
        }
    }.bind(that);

    var getTilePosition = function (i, j) {
        // Calculate deltas.
        var xDelta = (this.rightPosition.x - this.leftPosition.x) / TILES;
        var yDelta = (this.bottomPosition.y - this.topPosition.y) / TILES;

        return {
            x: this.leftPosition.x + (i + j) * xDelta / 2 + xDelta / 2,
            y: this.leftPosition.y + (j - i) * yDelta / 2
        };
    }.bind(that);

    // Set functions.
    that.initialize = initialize;
    that.update = update;
    that.getTilePosition = getTilePosition;

    return that;
}