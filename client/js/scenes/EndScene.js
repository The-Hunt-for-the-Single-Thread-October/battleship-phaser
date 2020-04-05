class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene");
        this.text = null;
    }

    init(data) {
        this.text = data.text;
    }

    create() {
        this.add.text(config.width / 2, config.height / 2, this.text, {
            fontSize: "5em"
        }).setOrigin(0.5);
    }
}