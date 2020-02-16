class ShipsGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Adds the ships to the scene
        this.shipOfTwo = scene.add.image(40, 40, 'shipOfTwo').setOrigin(0);
        this.shipOfThree = scene.add.image(80, 80, 'shipOfThree').setOrigin(0);
        this.shipOfFour = scene.add.image(120, 120, 'shipOfFour').setOrigin(0);

        // Array storing all the ships
        this.ships = [this.shipOfTwo, this.shipOfThree, this.shipOfFour];
        this.ships.forEach(ship => ship.setInteractive({ draggable: true }));

        this.confirmButton = scene.add.image(300, 550, 'confirmButton');
        this.confirmButton.setInteractive();

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // Moves the object only if the cursor moved to another cell
            if (Math.abs(dragX - gameObject.x) >= this.cellWidth) {
                /*If you move the mouse too fast you get errors of a few pixels,
                 the following formula makes sure the position is always a multiple of this.cellWidth.*/
                gameObject.x = Math.floor(dragX / this.cellWidth) * this.cellWidth;
            }
            if (Math.abs(dragY - gameObject.y) >= this.cellWidth) {
                gameObject.y = Math.floor(dragY / this.cellWidth) * this.cellWidth;
            }
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

            // Indicates the AttackGrid that you ships are ready to be attacked
            scene.events.emit('shipsPlaced', coordinates);
        });
    }

    onClick() {

    }
}