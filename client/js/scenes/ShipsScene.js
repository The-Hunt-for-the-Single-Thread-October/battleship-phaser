class ShipsScene extends Phaser.Scene {
    constructor() {
        super("ShipsScene");
    }

    create() {
        this.add.text(115, 50, "ShipsGrid", {
            fontSize: "5em"
        });

        this.shipsGrid = new ShipsGrid(this, 40, 200, 'emptyGrid');

        this.confirmButton = new ConfirmButton(this, 140, 650, 'confirmButton');
    }
}