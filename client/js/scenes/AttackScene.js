class AttackScene extends Phaser.Scene {
    constructor() {
        super("AttackScene");
    }

    create() {
        this.add.text(240, 80, "AttackGrid", {
            fontSize: "5em"
        }).setOrigin(0.5);

        this.attackGrid = new AttackGrid(this, 40, 200, 'emptyGrid');

        this.text = this.add.text(240, 700, "", {
            fontSize: "3em"
        }).setOrigin(0.5);
    }
}