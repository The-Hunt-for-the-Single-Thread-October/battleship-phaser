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

        this.setOrigin(0);

        this.on('pointerup', this.onClick);
    }

    onClick() {
        let coordinates = [];

        for (let gridY = 0; gridY < this.grid.nbCells; gridY++) {
            for (let gridX = 0; gridX < this.grid.nbCells; gridX++) {
                let busy = false;
                let posX = this.grid.x + gridX * this.grid.cellWidth;
                let posY = this.grid.y + gridY * this.grid.cellWidth;
                for (let ship of this.grid.ships) {
                    if (!ship.isRotated) {
                        if ((posX === ship.x && posY === ship.y) || // Checks if the current cell is the top left cell of the current ship
                            ((posX >= ship.x && posX < ship.x + ship.width) && (posY >= ship.y && posY < ship.y + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            busy = true;
                            break;
                        }
                    } else {
                        if ((posX === ship.x && posY === ship.y - this.grid.cellWidth) || // Checks if the current cell is the top left cell of the current ship
                            ((posX >= ship.x && posX < ship.x + ship.width) && (posY >= ship.y - this.grid.cellWidth && posY < ship.y - this.grid.cellWidth + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            busy = true;
                            break;
                        }
                    }
                }
                coordinates.push({
                    x: posX,
                    y: posY,
                    busy: busy
                });
            }
        }

        // Indicates the server that the ships are ready to be attacked
        global.socket.emit("shipsPlaced", global.room.id, coordinates);
        this.scene.scene.start("AttackScene");
    }
}