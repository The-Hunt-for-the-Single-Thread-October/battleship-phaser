class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Adds the ship to the scene
        this.ship = scene.add.image(40, 40, 'testShip').setOrigin(0);

        // Puts the ship above the grid so it's not hidden by the grid
        this.ship.depth = 1;

        this.ship.setInteractive({ draggable: true });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // Move the object only if the cursor moved to another cell
            if (Math.abs(dragX - gameObject.x) >= this.cellWidth) {
                gameObject.x = dragX;
            }
            if (Math.abs(dragY - gameObject.y) >= this.cellWidth) {
                gameObject.y = dragY;
            }
        });
    }

    onClick() {

    }
}