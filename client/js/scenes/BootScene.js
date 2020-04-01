class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.add.text(400, 20, "Loading...", {
            fontSize: "5em"
        });
        // Loads all the assets for the game before running.
        this.load.image('emptyGrid', '../assets/emptyGrid.png');
        this.load.image('shipOfTwo', '../assets/shipOfTwo.png');
        this.load.image('shipOfThree', '../assets/shipOfThree.png');
        this.load.image('shipOfFour', '../assets/shipOfFour.png');
        this.load.image('confirmButton', '../assets/confirmButton.png');
    }

    create() {
        this.scene.start("ShipsScene");
    }
}