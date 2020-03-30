class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.shipOfTwo = new Ship(scene, 40, 40, 'shipOfTwo');
        this.shipOfThree = new Ship(scene, 120, 120, 'shipOfThree');
        this.shipOfFour = new Ship(scene, 200, 200, 'shipOfFour');

        // Array storing all the ships
        this.ships = [this.shipOfTwo, this.shipOfThree, this.shipOfFour];

        this.confirmButton = scene.add.image(300, 550, 'confirmButton');
        this.confirmButton.setInteractive();

        scene.input.on('dragstart', (pointer, ship) => {
            ship.previousX = ship.x;
            ship.previousY = ship.y;
        });

        scene.input.on('drag', (pointer, ship, dragX, dragY) => {
            // If you drag ships too fast you get errors of a few pixels,
            // the following formulas make sure the position is always a multiple of this.cellWidth.
            ship.x = ship.body.x = Math.floor(dragX / this.cellWidth) * this.cellWidth;
            ship.y = ship.body.y = Math.floor(dragY / this.cellWidth) * this.cellWidth;
        });

        scene.input.on('dragend', (pointer, ship) => {
            if (ship.x + ship.width > x + this.width || // Checks if the ship goes beyond the right edge of the grid
                ship.y + ship.height > y + this.height || // Checks if the ship goes beyond the bottom edge of the grid
                ship.x < x || // Checks if the ship goes beyond the left edge of the grid
                ship.y < y || // Checks if the ship goes beyond the top edge of the grid
                this.checkOverlap(ship))
            {
                ship.x = ship.previousX;
                ship.y = ship.previousY;
            }
        });

        this.confirmButton.on('pointerup', () => {
            let coordinates = [];

            for (let gridY = 0; gridY < this.nbCells; gridY++) {
                for (let gridX = 0; gridX < this.nbCells; gridX++) {
                    let busy = false;
                    let posX = gridX * this.cellWidth;
                    let posY = gridY * this.cellWidth;
                    for (let ship of this.ships) {
                        if ((posX === ship.x && posY === ship.y) || // Checks if the current cell is the top left cell of the current ship
                            ((posX >= ship.x && posX < ship.x + ship.width) && (posY >= ship.y && posY < ship.y + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            busy = true;
                            break;
                        }
                    }
                    coordinates.push({
                        x: posX,
                        y: posY,
                        busy: busy
                    });
                }
            }

            // Indicates the AttackGrid that the ships are ready to be attacked
            scene.events.emit('shipsPlaced', coordinates);
        });
    }

    checkOverlap(ship) {
        let overlaps = false;
        this.ships.forEach(currentShip => {
            if (ship !== currentShip) {
                if(Phaser.Geom.Intersects.RectangleToRectangle(currentShip.getBounds(), ship.getBounds())) {
                    overlaps = true;
                }
            }
        });

        return overlaps;
    }
}
