class ShipsScene extends Phaser.Scene {
    constructor() {
        super("ShipsScene");
    }

    create() {
        this.add.text(config.width / 2, 80, "ShipsGrid", {
            fontSize: "5em"
        }).setOrigin(0.5);

        this.shipsGrid = new ShipsGrid(this, 40, 200, 'emptyGrid');

        this.confirmButton = new ConfirmButton(this, config.width / 2, 700, 'confirmButton');

        // Fetches the coordinates of the other player's ships
        global.socket.on("shipsPlaced", coordinates => {
            global.coordinates = coordinates;
            if (global.shipsPlaced && global.orderArray[0] === global.socket.id) {
                this.scene.sleep("ShipsScene");
                this.scene.run("AttackScene");
            }
        });

        global.socket.on("touched", coordinates => {
            this.add.sprite(coordinates.x, coordinates.y, "touchedIcon").setOrigin(0);
        });

        global.socket.on("missed", coordinates => {
            this.add.sprite(coordinates.x, coordinates.y, "missedIcon").setOrigin(0);
            setTimeout(() => {
                this.scene.sleep("ShipsScene");
                this.scene.run("AttackScene");
            }, 1000);
        });

        global.socket.on("sink", shipInfo => {
            global.drawSinkLine(this, shipInfo, this.shipsGrid.cellWidth);
        });

        global.socket.on("win", () => {
            window.nsWebViewInterface.emit("gameEnded", "Défaite...");
        });
    }
}