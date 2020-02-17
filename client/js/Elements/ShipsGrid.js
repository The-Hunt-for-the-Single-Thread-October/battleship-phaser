class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.shipOfTwo = new Ship(scene, 40, 40, 'shipOfTwo');
        this.shipOfThree = new Ship(scene, 80, 80, 'shipOfThree');
        this.shipOfFour = new Ship(scene, 120, 120, 'shipOfFour');

        // Array storing all the ships
        this.ships = [this.shipOfTwo, this.shipOfThree, this.shipOfFour];

        this.confirmButton = scene.add.image(300, 550, 'confirmButton');
        this.confirmButton.setInteractive();

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // If you drag ships too fast you get errors of a few pixels,
            // the following formulas make sure the position is always a multiple of this.cellWidth.
            gameObject.x = Math.floor(dragX / this.cellWidth) * this.cellWidth;
            gameObject.y = Math.floor(dragY / this.cellWidth) * this.cellWidth;
        });

        this.confirmButton.on('pointerup', () => {
            let coordinates = [];

            for (let gridY = 0; gridY < this.nbCells; gridY++) {
                for (let gridX = 0; gridX < this.nbCells; gridX++) {
                    let busy = false;
                    for (let ship of this.ships) {
                        if ((gridX * this.cellWidth === ship.x && gridY * this.cellWidth === ship.y) || // Checks if the current cell is the top left cell of the current ship
                            ((gridX * this.cellWidth >= ship.x && gridX * this.cellWidth < ship.x + ship.width) && (gridY * this.cellWidth >= ship.y && gridY * this.cellWidth < ship.y + ship.height))) // Checks if the current cell is any cell of the current ship other than the top left one
                        {
                            busy = true;
                            break;
                        }
                    }
                    coordinates.push({
                        x: gridX * this.cellWidth,
                        y: gridY * this.cellWidth,
                        busy: busy
                    });
                }
            }

            // Indicates the AttackGrid that the ships are ready to be attacked
            scene.events.emit('shipsPlaced', coordinates);
        });
    }
}