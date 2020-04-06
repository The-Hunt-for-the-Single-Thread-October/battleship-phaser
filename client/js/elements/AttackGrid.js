class AttackGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Makes the grid clickable.
        this.setInteractive();
        this.on('pointerup', this.onClick);

        this.cellsHit = 0;

        // Object that represents the amount of times each ship has been hit
        this.shipsHit = {
            shipOfTwo: 0,
            shipOfThree: 0,
            shipOfFour: 0
        }
    }

    onClick() {
        if (global.coordinates) {
            // Coordinates of the click relative to the grid and not the world
            let clickY = Math.floor((this.scene.input.activePointer.worldY - this.getBounds().y) / this.cellWidth);
            let clickX = Math.floor((this.scene.input.activePointer.worldX - this.getBounds().x) / this.cellWidth);

            /* Example:
                clickY = 1, clickY = 2
                indexInCoordinates = 1 * 10 + 2
                                   = 10 + 2
                                   = 12
                The clicked cell has the coordinates (1,2) so the object representing this cell is in this.coordinates[12].
            */
            let indexInCoordinates = clickY * 10 + clickX;
            let coordinates = global.coordinates[indexInCoordinates];

            // Busy tells if a ship is on the cell.
            if (coordinates.busy) {
                this.cellsHit++;
                this.shipsHit[coordinates.shipName]++;
                this.scene.add.sprite(coordinates.x, coordinates.y, "touchedIcon").setOrigin(0);
                global.socket.emit("touched", global.room.id, coordinates);
                this.scene.text.setText("You touched!");

                if (this.shipsHit[coordinates.shipName] >= coordinates.shipLength / this.cellWidth) {
                    let shipInfo = {
                        origin: coordinates.shipOrigin,
                        length: coordinates.shipLength,
                        orientation: coordinates.shipOrientation
                    };

                    global.drawSinkLine(this.scene, shipInfo, this.cellWidth);

                    global.socket.emit("sink", global.room.id, shipInfo);
                    this.scene.text.setText("You sank");
                }

                if (this.cellsHit >= global.totalCellsToHit) {
                    setTimeout(() => {
                        global.socket.emit("win", global.room.id);
                        this.scene.scene.start("EndScene", {text: "Win!"});
                    }, 1000);
                }
            } else {
                this.disableInteractive();
                this.scene.add.sprite(coordinates.x, coordinates.y, "missedIcon").setOrigin(0);
                global.socket.emit("missed", global.room.id, coordinates);
                setTimeout(() => {
                    this.setInteractive();
                    this.scene.scene.sleep("AttackScene");
                    this.scene.scene.run("ShipsScene");
                }, 1000);
            }
        }
    }
}