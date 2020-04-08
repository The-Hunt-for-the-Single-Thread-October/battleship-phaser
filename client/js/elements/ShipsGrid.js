class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.x = x;
        this.y = y;

        this.carrier = new Ship(scene, this.x + this.cellWidth, this.y + this.cellWidth, 'carrier');
        this.battleship = new Ship(scene, this.x + this.cellWidth * 3, this.y + this.cellWidth * 3, 'battleship');
        this.cruiser = new Ship(scene, this.x + this.cellWidth * 5, this.y + this.cellWidth * 5, 'cruiser');
        this.cruiser2 = new Ship(scene, this.x + this.cellWidth * 7, this.y + this.cellWidth * 5, 'cruiser');
        this.destroyer = new Ship(scene, this.x + this.cellWidth * 9, this.y + this.cellWidth * 7, 'destroyer');

        // Array storing all the ships
        this.ships = [this.carrier, this.battleship, this.cruiser, this.cruiser2, this.destroyer];

        this.ships.forEach(ship => {
            // Calculates the total number of cells to hit to win the game
            global.totalCellsToHit += ship.length / this.cellWidth;

            ship.on('dragstart', (pointer, draX, dragY) => {
                ship.previousX = ship.x;
                ship.previousY = ship.y;
            });

            ship.on('drag', (pointer, dragX, dragY) => {
                // If you drag ships too fast you get errors of a few pixels,
                // the following formulas make sure the position is always a multiple of this.cellWidth.
                ship.x = Math.floor(dragX / this.cellWidth) * this.cellWidth;
                ship.y = Math.floor(dragY / this.cellWidth) * this.cellWidth;
            });

            ship.on('dragend', (pointer, dragX, dragY) => {
                if (this.goesOutOfBounds(ship) || this.overlaps(ship)) {
                    ship.x = ship.previousX;
                    ship.y = ship.previousY;
                }
            });

            ship.on('doubleClick', () => {
                ship.rotate(this.cellWidth);

                if (this.goesOutOfBounds(ship) || this.overlaps(ship)) {
                    // If the ship is not at a valid position, we rotate it back
                    ship.rotate(this.cellWidth);
                }
            });
        });
    }

    overlaps(ship) {
        let overlaps = false;
        for (let currentShip of this.ships) {
            if (ship !== currentShip) {
                if(Phaser.Geom.Intersects.RectangleToRectangle(currentShip.getBounds(), ship.getBounds())) {
                    overlaps = true;
                    break;
                }
            }
        }

        return overlaps;
    }

    goesOutOfBounds(ship) {
        let isBeyondRightEdge = ship.x + ship.width > this.x + this.width;
        let isBeyondLeftEdge = ship.x < this.x;
        let isBeyondTopEdge = ship.isRotated ? ship.y <= this.y : ship.y < this.y;
        let isBeyondBottomEdge = ship.isRotated ? ship.y - ship.height >= this.y + this.height : ship.y + ship.height > this.y + this.height;

        return isBeyondRightEdge || isBeyondLeftEdge || isBeyondTopEdge || isBeyondBottomEdge;
    }
}
