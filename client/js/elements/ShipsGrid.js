class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.x = x;
        this.y = y;

        this.shipOfTwo = new Ship(scene, this.x + 40, this.y + 40, 'shipOfTwo');
        this.shipOfThree = new Ship(scene, this.x + 120, this.y + 120, 'shipOfThree');
        this.shipOfFour = new Ship(scene, this.x + 200, this.y + 200, 'shipOfFour');

        // Array storing all the ships
        this.ships = [this.shipOfTwo, this.shipOfThree, this.shipOfFour];

        this.ships.forEach(ship => {
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

        global.socket.on("shipsPlaced", () => {
            // Prevent the player from moving the ships after the confirm button was clicked
            this.ships.forEach(ship => ship.removeInteractive());
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
