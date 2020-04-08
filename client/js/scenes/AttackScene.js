class AttackScene extends Phaser.Scene {
    constructor() {
        super("AttackScene");
    }

    create() {
        this.add.text(config.width / 2, 80, "AttackGrid", {
            fontSize: "5em"
        }).setOrigin(0.5);

        this.attackGrid = new AttackGrid(this, 40, 200, 'emptyGrid');

        this.text = this.add.text(config.width / 2, 700, "Ready to attack!", {
            fontSize: "3em"
        }).setOrigin(0.5);

        global.socket.on("shipsPlaced", () => {
            this.text.setText("Ready to attack!");
        });
    }
}