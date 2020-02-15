class Scene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    preload() {
        // Loads all the assets for the game before running.
        this.load.image('emptyGrid', '../assets/emptyGrid.png');
        this.load.image('testShip', '../assets/testShip.png');
    }

    create() {
        // Creates both grids, each on one side of the screen.
        new AttackGrid(this, 800, 200, 'emptyGrid');
        new ShipsGrid(this, 200, 200, 'emptyGrid');
    }
}