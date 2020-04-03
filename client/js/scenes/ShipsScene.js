class ShipsScene extends Phaser.Scene {
    constructor() {
        super("ShipsScene");
    }

    create() {
        this.add.text(240, 80, "ShipsGrid", {
            fontSize: "5em"
        }).setOrigin(0.5);

        this.shipsGrid = new ShipsGrid(this, 40, 200, 'emptyGrid');

        this.confirmButton = new ConfirmButton(this, 240, 700, 'confirmButton');

        // Fetches the coordinates of the other player's ships
        global.socket.on('shipsPlaced', coordinates => {
            console.log("L'autre joueur a placé ses bateaux.");
            global.coordinates = coordinates;
        });
    }
}