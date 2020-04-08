class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        this.text = this.add.text(40, 40, "Loading assets...", {
            fontSize: "2em"
        });
        // Loads all the assets for the game before running.
        this.load.image('emptyGrid', '../assets/emptyGrid.png');
        this.load.image('carrier', '../assets/carrier.png');
        this.load.image('battleship', '../assets/battleship.png');
        this.load.image('cruiser', '../assets/cruiser.png');
        this.load.image('destroyer', '../assets/destroyer.png');
        this.load.image('confirmButton', '../assets/confirmButton.png');
        this.load.image('touchedIcon', '../assets/touchedIcon.png');
        this.load.image('missedIcon', '../assets/missedIcon.png');
    }

    create() {
        let urlParams = new URLSearchParams(window.location.search);
        let room = {
            id: urlParams.get("id"),
            maxClients: urlParams.get("maxClients"),
            clients: urlParams.get("clients")
        };

        if (room.id && room.maxClients && room.clients) {
            global.socket.emit("join", JSON.stringify(room));
            this.text.setText("Waiting for the other player...");
        } else {
            this.text.setText("Error in URL");
        }

        global.socket.on("roomJoined", updatedRoom => {
            global.room = updatedRoom;
        });

        global.socket.on("randomStart", orderArray => {
            global.orderArray = orderArray;
            this.scene.start("ShipsScene");
        });
    }
}