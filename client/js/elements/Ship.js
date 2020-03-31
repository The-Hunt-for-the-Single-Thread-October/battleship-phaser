class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Enables collisions for the ships and adds them to the scene
        // The collision is set after 1ms because otherwise scene has not finished loading and collisionObj isn't defined
        setInterval(() => scene.collisionObj.add(this, true), 1);

        this.setInteractive({ draggable: true });

        // Puts the origin of the ship in its top left corner (makes the placement on the grid easier)
        this.setOrigin(0);

        // Bool that indicates if the ship has been rotated rotated or not
        this.isRotated = false;

        this.lastTime = 0;
        this.on("pointerdown", () => {
            let clickDelay = scene.time.now - this.lastTime;
            this.lastTime = scene.time.now;
            if (clickDelay < 350) {
                this.emit("doubleClick");
            }
        });
    }

    rotate(offset) {
        if (!this.isRotated) {
            this.angle -= 90;
            this.y += offset;
        } else {
            this.y -= offset;
            this.angle = 0;
        }

        this.isRotated = !this.isRotated;

        // The width and height are not recalculated when we change the angle so we have to do it manually
        let tmp = this.width;
        this.width = this.height;
        this.height = tmp;
    }
}