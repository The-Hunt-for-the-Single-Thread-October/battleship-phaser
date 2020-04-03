class AttackGrid extends Grid {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        // Makes the grid clickable.
        this.setInteractive();
        this.on('pointerup', this.onClick);
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

            // Busy tells if a ship is on the cell.
            if (global.coordinates[indexInCoordinates].busy) {
                console.log("You touched a ship! at the coordinates "+indexInCoordinates);
                this.scene.text.setText("You touched!");
            } else {
                console.log("You missed at the coordinates "+indexInCoordinates);
                this.scene.text.setText("You missed...");
            }
        } else {
            console.log("Wait...");
            this.scene.text.setText("Wait...");
        }
    }
}