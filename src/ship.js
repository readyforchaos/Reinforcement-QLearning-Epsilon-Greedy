function Ship() {
    // Constants.
    var SCALE = .7;
    var OFFSET_X = -65;
    var OFFSET_Y = -115;

    // Create object.
    var that = {
        x: 0,
        y: 0,
        _x: 0,
        _y: 0,
        bitmap: undefined,
        circle: undefined
    };

    // Temp.
    that._x = document.body.clientWidth;
    that._y = document.body.clientHeight;

    var initialize = function (stage) {
        // Create assets and objects.
        this.bitmap = new createjs.Bitmap('assets/ship.png');

        if (DEBUG) {
            this.circle = new createjs.Shape();
            this.circle.graphics.beginFill("Blue").drawCircle(0, 0, 10);
        }

        stage.addChild(this.bitmap);

        if (DEBUG) {
            stage.addChild(this.circle);
        }
    }.bind(that);

    var update = function () {
        // Update positions.
        this._x += (this.x - this._x) / 3;
        this._y += (this.y - this._y) / 3;

        // Set positions.
        this.bitmap.x = this._x + OFFSET_X * GLOBAL_SCALE;
        this.bitmap.y = this._y + OFFSET_Y * GLOBAL_SCALE;

        if (DEBUG) {
            this.circle.x = this.x;
            this.circle.y = this.y;
        }

        // Set scale.
        this.bitmap.scaleX = GLOBAL_SCALE * SCALE;
        this.bitmap.scaleY = GLOBAL_SCALE * SCALE;
    }.bind(that);

    // Set functions.
    that.initialize = initialize;
    that.update = update;

    return that;
}