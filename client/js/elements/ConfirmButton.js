class ConfirmButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Adds the button to the world.
        scene.add.existing(this);

        // Makes the scene accessible from outside the constructor
        this.scene = scene;

        // Fetches the grid
        this.grid = scene.shipsGrid;

        // Makes the button clickable
        this.setInteractive();

        this.on('pointerup', this.onClick);
    }

    onClick() {
        let coordinates = [];

        for (let gridY = 0; gridY < this.grid.nbCells; gridY++) {
            for (let gridX = 0; gridX < this.grid.nbCells; gridX++) {
                let busy = false;
                let shipName = null;
                let shipOrigin = null;
                let shipOrientation = null;
                let shipLength = null;
                let posX = this.grid.x + gridX * this.grid.cellWidth;
                let posY = this.grid.y + gridY * this.grid.cellWidth;
                for (let ship of this.grid.ships) {
                    if (!ship.isRotated) {
                        if ((posX === ship.x && posY === ship.y) || // Checks if the current cell is the top left cell of the current ship
                            ((posX >= ship.x && posX < ship.x + ship.width) && (posY >= ship.y && posY < ship.y + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            shipName = ship.name;
                            shipOrigin = {x: ship.x, y: ship.y};
                            shipOrientation = "vertical";
                            shipLength = ship.length;
                            busy = true;
                            break;
                        }
                    } else {
                        if ((posX === ship.x && posY === ship.y - this.grid.cellWidth) || // Checks if the current cell is the top left cell of the current ship
                            ((posX >= ship.x && posX < ship.x + ship.width) && (posY >= ship.y - this.grid.cellWidth && posY < ship.y - this.grid.cellWidth + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            shipName = ship.name;
                            shipOrigin = {x: ship.x, y: ship.y};
                            shipOrientation = "horizontal";
                            shipLength = ship.length;
                            busy = true;
                            break;
                        }
                    }
                }
                coordinates.push({
                    shipName: shipName,
                    shipOrigin: shipOrigin,
                    shipOrientation: shipOrientation,
                    shipLength: shipLength,
                    x: posX,
                    y: posY,
                    busy: busy
                });
            }
        }

        // Prevents the player from moving the ships after the confirm button was clicked
        this.grid.ships.forEach(ship => ship.removeInteractive());

        // Prevents the player from clicking the confirm button more than once
        this.removeInteractive();

        // Makes the confirm button disappear after clicking it
        this.visible = false;

        // Indicates the server that the ships are ready to be attacked
        global.socket.emit("shipsPlaced", global.room.id, coordinates);
        global.shipsPlaced = true;
        if (global.orderArray[0] === global.socket.id) {
            if (global.coordinates) {
                this.scene.scene.sleep("ShipsScene");
                this.scene.scene.run("AttackScene");
            } else {
                this.scene.text = this.scene.add.text(config.width / 2, 700, "Waiting for the other player...", {
                    fontSize: "2em"
                }).setOrigin(0.5);
            }
        } else {
            this.scene.text = this.scene.add.text(config.width / 2, 700, "The other player start", {
                fontSize: "2em"
            }).setOrigin(0.5);
        }
    }
}