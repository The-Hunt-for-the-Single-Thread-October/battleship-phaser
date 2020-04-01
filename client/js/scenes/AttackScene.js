class AttackScene extends Phaser.Scene {
    constructor() {
        super("AttackScene");
    }

    create() {
        this.add.text(110, 50, "AttackGrid", {
            fontSize: "5em"
        });

        this.attackGrid = new AttackGrid(this, 40, 200, 'emptyGrid');

        // TODO: Fetch the coordinates from the server
        this.events.on('shipsPlaced', coordinates => this.attackGrid.coordinates = coordinates);
    }
}