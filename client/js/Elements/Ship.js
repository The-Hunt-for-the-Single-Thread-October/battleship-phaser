class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Enables collisions for the ships and adds them to the scene
        // The collision is set after 1ms because otherwise scene has not finished loading and collisionObj isn't defined
        setInterval(() => scene.collisionObj.add(this, true), 1);

        this.setInteractive({ draggable: true });

        // Puts the origin of the ship in its top left corner (makes the placement on the grid easier)
        this.setOrigin(0);
    }
}