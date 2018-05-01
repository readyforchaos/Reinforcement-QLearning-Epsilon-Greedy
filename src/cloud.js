function Cloud(index) {
    // Constants.
    var SCALE = .7;

    // Create object.
    var that = {
        x: 1000 * Math.random(),
        y: 600 * Math.random(),
        trajectory: 1 * Math.random() + 0.05,
        bitmap: undefined,
        circle: undefined
    };

    var initialize = function (stage) {
        // Create assets and objects.
        this.bitmap = new createjs.Bitmap('assets/cloud' + index + '.png');

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
        // Update position.
        this.x = this.x - this.trajectory;

        if (this.x < -this.bitmap.image.width * GLOBAL_SCALE)
        {
            this.x = window.innerWidth + this.bitmap.image.width * GLOBAL_SCALE;
            this.y = 600 * Math.random();
        }

        // Set positions.
        this.bitmap.x = this.x - this.bitmap.image.width / 2 * GLOBAL_SCALE;
        this.bitmap.y = this.y - this.bitmap.image.height / 2 * GLOBAL_SCALE;

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