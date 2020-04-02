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
        this.load.image('shipOfTwo', '../assets/shipOfTwo.png');
        this.load.image('shipOfThree', '../assets/shipOfThree.png');
        this.load.image('shipOfFour', '../assets/shipOfFour.png');
        this.load.image('confirmButton', '../assets/confirmButton.png');
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
            this.scene.start("ShipsScene");
        }

        global.socket.on("roomJoined", updatedRoom => {
            global.room = updatedRoom;
            if (updatedRoom.clients == updatedRoom.maxClients) {
                this.scene.start("ShipsScene");
            }
        });
    }
}