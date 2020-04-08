const config = {
    width: 480,
    height: 800,
    type: Phaser.AUTO,
    parent: 'battleship',
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [BootScene, ShipsScene, AttackScene, EndScene]
};

const global = {
    socket: io("http://51.91.8.97:4002/"),
    room: null,
    coordinates: null,
    totalCellsToHit: null,
    orderArray: null,
    shipsPlaced: false,
    drawSinkLine: (scene, shipInfo, cellWidth) => {
        let startX = shipInfo.orientation === "vertical" ? shipInfo.origin.x + cellWidth / 2 : shipInfo.origin.x;
        let startY = shipInfo.orientation === "vertical" ? shipInfo.origin.y : shipInfo.origin.y - cellWidth / 2;
        let endX = shipInfo.orientation === "vertical" ? shipInfo.origin.x + cellWidth / 2 : shipInfo.origin.x + shipInfo.length;
        let endY = shipInfo.orientation === "vertical" ? shipInfo.origin.y + shipInfo.length : shipInfo.origin.y - cellWidth / 2;

        scene.add.line(0, 0, startX, startY, endX, endY, 0xffca18).setLineWidth(5).setOrigin(0);
    }
};

const game = new Phaser.Game(config);