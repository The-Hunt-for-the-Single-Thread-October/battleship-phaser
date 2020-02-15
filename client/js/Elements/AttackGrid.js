class AttackGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Creates a table of the grid cells' coordinates.
        this.coordinates = [];
        this.createGridCoordinates();
    }

    onClick() {
        // Coordinates of the click relative to the grid and not the world
        let clickY = Math.floor(this.scene.input.activePointer.worldY / this.cellWidth);
        let clickX = Math.floor((this.scene.input.activePointer.worldX - this.getBounds().x) / this.cellWidth);

        /* Example:
            clickY = 1, clickY = 2
            indexInCoordinates = 1 * 10 + 2
                               = 10 + 2
                               = 12
            The clicked cell has the coordinates (1,2) so the object representing this cell is in this.coordinates[12].
        */
        let indexInCoordinates = (Math.floor(clickY) * 10) + Math.floor(clickX);

        // Busy tells if a ship is on the cell.
        if (this.coordinates[indexInCoordinates].busy) {
            console.log("You touched a ship!");
        } else {
            console.log("You missed...");
        }
    }

    createGridCoordinates() {
        for (let i = 0; i < this.nbCells; i++) {
            for (let j = 0; j < this.nbCells; j++) {
                this.coordinates.push({ x: i * this.cellWidth, y: j * this.cellWidth, busy: Math.random() < 0.5 }); // Busy is set randomly for the moment.
            }
        }
    }
}