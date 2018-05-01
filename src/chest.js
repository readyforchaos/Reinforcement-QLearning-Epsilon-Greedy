function Chest() {
    // Constants.
    var SCALE = .6;
    var OFFSET_X = -85;
    var OFFSET_Y = -125;

    // Create object.
    var that = {
        x: 0,
        y: 0,
        bitmap: undefined,
        circle: undefined
    };

    var initialize = function (stage) {
        // Create assets and objects.
        this.bitmap = new createjs.Bitmap('assets/chest.png');

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
        // Set positions.
        this.bitmap.x = this.x + OFFSET_X * GLOBAL_SCALE;
        this.bitmap.y = this.y + OFFSET_Y * GLOBAL_SCALE;

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