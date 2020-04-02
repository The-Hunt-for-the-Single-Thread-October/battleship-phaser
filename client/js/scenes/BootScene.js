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
            console.log("J'ai rejoint");
        } else {
            this.text.setText("Error in URL");
            //this.scene.start("ShipsScene");
        }

        global.socket.on("roomJoined", updatedRoom => {
            global.room = updatedRoom;
            console.log("Quelqu'un d'autre a rejoint");
            if (updatedRoom.clients === updatedRoom.maxClients) {
                console.log("La game est full");
                this.scene.start("ShipsScene");
            } else {
                console.log("La game n'est pas full");
                this.text.setText("Waiting for the other player...");
            }
        });
    }
}