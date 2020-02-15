class Grid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Adds the scene to the object properties so it's available from outside the constructor.
        this.scene = scene;

        this.nbCells = 10;
        this.cellWidth = 40;

        // Adds the grid to the world and enables physics for it.
        scene.physics.add.existing(this, true);
        scene.add.existing(this);

        // Makes the grid clickable.
        this.setInteractive();
        this.on('pointerup', this.onClick, this);
    }
}