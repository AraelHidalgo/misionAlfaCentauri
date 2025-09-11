// Colores reutilizables para textos
const COLOR_BLANCO = '#ffffff';
const COLOR_AMARILLO = '#fbff00ff';
const COLOR_VERDE = '#59ff00ff';
const COLOR_CELESTE = '#00eeffff';


class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    preload() {
        this.load.image('fondoInicio', 'assets/entorno/fondo7.jpeg');
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    create() {
        let fondo = this.add.image(0, 0, 'fondoInicio');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(130,190, "MISION ALFA \n CENTAURI", { fontFamily: 'pixelFont', fontSize: '65px', color: COLOR_BLANCO })
            .setOrigin(0, 0);
        this.add.text(200,370, "> SQL EN EL ESPACIO", { fontFamily: 'pixelFont', fontSize: '30px', color: COLOR_AMARILLO })
            .setOrigin(0, 0);

        let startText = this.add.text(300,690, "<START>", { fontFamily: 'pixelFont', fontSize: '45px', color: COLOR_VERDE })
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('GameScene'));

        let aboutText = this.add.text(330,790, "<ABOUT>", { fontFamily: 'pixelFont', fontSize: '35px', color: COLOR_CELESTE })
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('AboutScene'));
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        this.load.image('fondo2', 'assets/fondo2.jpeg');
        this.load.image('pato', 'assets/pato1.png');
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    create() {
        let fondo = this.add.image(0, 0, 'fondo2');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.add.text(100,100, "¡Bienvenido al juego!", { fontFamily: 'pixelFont', fontSize: '40px', color: COLOR_BLANCO });
        // Puedes agregar aquí la lógica del juego
        let backText = this.add.text(100, 600, "<VOLVER AL MENÚ>", { fontFamily: 'pixelFont', fontSize: '30px', color: COLOR_CELESTE })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}

class AboutScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutScene' });
    }
    preload() {
        this.load.image('fondoInicio', 'assets/entorno/fondo7.jpeg');
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    create() {
        let fondo = this.add.image(0, 0, 'fondoInicio');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.add.text(100,100, "Acerca del juego\nHecho por Arael Hidalgo", { fontFamily: 'pixelFont', fontSize: '35px', color: COLOR_BLANCO });
        let backText = this.add.text(100, 600, "<VOLVER AL MENÚ>", { fontFamily: 'pixelFont', fontSize: '30px', color: COLOR_VERDE })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#3498db',
    parent: "game",
    scene: [MenuScene, GameScene, AboutScene]
};

new Phaser.Game(config);