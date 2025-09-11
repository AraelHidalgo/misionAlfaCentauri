const COLOR_BLANCO = '#ffffff';
const COLOR_AMARILLO = '#fbff00ff';
const COLOR_VERDE = '#59ff00ff';
const COLOR_CELESTE = '#00eeffff';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'CARGANDO...\nMaximiza tu pantalla\ny refresca la página', {
            fontSize: '30px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
        
      
        this.load.audio('menuMusic', 'assets/sonidos/sonidoFondo.mp3');
        this.load.audio('transicionAmbiental', 'assets/sonidos/transicionAmbiental.mp3');
        this.load.audio('acierto', 'assets/sonidos/acierto.mp3');
        this.load.audio('error', 'assets/sonidos/error.mp3');
        this.load.audio('w', 'assets/sonidos/weirdo.mp3');
        this.load.audio('clickSound', 'assets/sonidos/click.mp3');

        // otros recursos
        this.load.image('fondoInicio', 'assets/entorno/fondo7.jpeg');
        this.load.image('fondo2', 'assets/entorno/fondo1.jpeg');
        this.load.image('pato', 'assets/personajes/FlooIA.png');

        //Nivel1 recursos
        this.load.image('fondoAlmacen', 'assets/entorno/fondo2.jpeg');
        this.load.image('oxigeno', 'assets/recursosNave/oxigeno.png');
        this.load.image('alVacio', 'assets/recursosNave/comida1.png');
        this.load.image('sopa', 'assets/recursosNave/comida2.png');
        this.load.image('enlatado', 'assets/recursosNave/comida3.png');
        this.load.image('postrePasta', 'assets/recursosNave/comida4.png');
        this.load.image('comidaCompleta', 'assets/recursosNave/comida5.png');
        this.load.image('alVacio2', 'assets/recursosNave/comida6.png');
        this.load.image('nuggets', 'assets/recursosNave/comida7.png');
        this.load.image('sopa2', 'assets/recursosNave/comida8.png');
        this.load.image('sopa3', 'assets/recursosNave/comida9.png');
    }
    
    create() {

        this.menuMusic = this.sound.add('menuMusic', {
            volume: 0.07,
            loop: true 
        });
        this.menuMusic.play();
        

        this.sound.pauseOnBlur = false; 
        

        this.registry.set('bgMusic', this.menuMusic);
        

        this.scene.start('MenuScene');
    }
}

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    
    preload() {
        
        if (!this.cache.audio.exists('clickSound')) {
            this.load.audio('clickSound', 'assets/sonidos/click.mp3');
        }
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    
    create() {
        // Fade in al entrar
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        let fondo = this.add.image(0, 0, 'fondoInicio');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        this.add.text(130, 190, "MISION ALFA \n CENTAURI", {
            fontFamily: 'pixelFont',
            fontSize: '65px',
            color: COLOR_BLANCO
        }).setOrigin(0, 0);
        
        this.add.text(200, 370, "> SQL EN EL ESPACIO", {
            fontFamily: 'pixelFont',
            fontSize: '30px',
            color: COLOR_AMARILLO
        }).setOrigin(0, 0);
        
        let startText = this.add.text(300, 690, "<START>", {
            fontFamily: 'pixelFont',
            fontSize: '45px',
            color: COLOR_VERDE
        })
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            startText.setScale(1.05);
        })
        .on('pointerout', () => {
            startText.setScale(1);
        })
        .on('pointerdown', () => {
            this.sound.play('clickSound', { volume: 0.2 });
            
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('IntroductionScene');
            });
        });
        
        let aboutText = this.add.text(330, 790, "<ABOUT>", {
            fontFamily: 'pixelFont',
            fontSize: '35px',
            color: COLOR_CELESTE
        })
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            aboutText.setScale(1.05);
        })
        .on('pointerout', () => {
            aboutText.setScale(1);
        })
        .on('pointerdown', () => {
            this.sound.play('clickSound', { volume: 0.1 });
            
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('AboutScene');
            });
        });
        
        // Botón de mute para la música
        this.muteButton = this.add.text(50, 50, '<Silencio>', {
            fontSize: '20px'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            if (this.sound.mute) {
                this.sound.setMute(false);
                this.muteButton.setText('<Silencio>');
            } else {
                this.sound.setMute(true);
                this.muteButton.setText('<Sonido>');
            }
        });
    }
}

class IntroductionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroductionScene' });
    }
    
    init() {
        // Reiniciar variables cuando la escena se inicia
        this.dialogIndex = 0;
        this.isTyping = false;
        this.currentText = '';
        this.targetText = '';
        this.charIndex = 0;
        this.typewriterTimer = null;
    }
    
    preload() {
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    
    create() {
        // Fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        // Fondo
        let fondo = this.add.image(0, 0, 'fondo2');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        this.dialogs = [
            "¡ALERTA! SISTEMA DE\nEMERGENCIA ACTIVADO",
            "Año 2157.\nLa humanidad ha agotado\nlos recursos de la Tierra.",
            "Tu misión: Viajar al\nsistema Alfa Centauri\ny extraer recursos del\nplaneta Kepler-438b",
            "Pero hay un problema...\nLa base de datos de\nla nave está corrupta.",
            "Deberás usar SQL para:\n• Organizar inventario\n• Reparar sistemas\n• Gestionar extracción",
            "Tu asistente IA, Floo,\nte guiará en esta\npeligrosa misión.",
            "¿Estás listo para\nsalvar a la humanidad\ncon el poder de SQL?",
            "¡INICIANDO PROTOCOLO\nDE DESPERTAR!"
        ];

        this.createDialogBox();

        this.floo = this.add.image(1500, 500, 'pato');
        this.floo.setScale(0.5);
        
        this.floatTween = this.tweens.add({
            targets: this.floo,
            y: 520,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        this.dialogText = this.add.text(700, 470, '', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_BLANCO,
            align: 'center',
            wordWrap: { width: 850 },
            lineSpacing: 8
        }).setOrigin(0.5, 0.5);

        this.continueText = this.add.text(700, 590, '[CLICK para continuar]', {
            fontFamily: 'pixelFont',
            fontSize: '14px',
            color: COLOR_AMARILLO
        }).setOrigin(0.5).setVisible(false);
        
        this.continueTween = this.tweens.add({
            targets: this.continueText,
            alpha: 0.3,
            duration: 500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        this.skipButton = this.add.text(this.cameras.main.width - 200, 50, '[SKIP >>]', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_CELESTE
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.cleanupAndStart();
        });
    
        this.showNextDialog();
        
        this.clickZone = this.add.rectangle(700, 470, 900, 250, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (!this.isTyping && this.dialogIndex > 0) {
                    this.sound.play('clickSound', { volume: 0.2 });
                    this.showNextDialog();
                } else if (this.isTyping) {
                    this.completeText();
                }
            });
    }
    
    createDialogBox() {

        const graphics = this.add.graphics();
        
        graphics.lineStyle(3, 0x00ffff, 0.8);
        graphics.strokeRoundedRect(200, 350, 1000, 280, 20);
    
        graphics.lineStyle(2, 0xffffff, 0.5);
        graphics.strokeRoundedRect(205, 355, 990, 270, 18);

        graphics.fillStyle(0x000033, 0.7);
        graphics.fillRoundedRect(205, 355, 990, 270, 18);
 
        this.add.text(700, 375, 'FLOO - ASISTENTE IA', {
            fontFamily: 'pixelFont',
            fontSize: '15px',
            color: COLOR_CELESTE
        }).setOrigin(0.5);
        
        graphics.lineStyle(1, 0x00ffff, 0.5);
        graphics.lineBetween(220, 390, 1180, 390);
    }
    
    showNextDialog() {
        if (this.dialogIndex >= this.dialogs.length) {
            this.cleanupAndStart();
            return;
        }
        
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
        }
        
        this.targetText = this.dialogs[this.dialogIndex];
        this.currentText = '';
        this.charIndex = 0;
        this.isTyping = true;
        this.continueText.setVisible(false);

        //animacion de escritura
        this.typewriterTimer = this.time.addEvent({
            delay: 35,
            callback: () => {
                this.typeWriter();
            },
            callbackScope: this,
            repeat: this.targetText.length
        });
        
        this.dialogIndex++;
    }
    
    typeWriter() {
        if (this.charIndex < this.targetText.length) {
            this.currentText = this.targetText.substring(0, this.charIndex + 1);
            this.dialogText.setText(this.currentText);
            this.charIndex++;
        }
        
        if (this.charIndex >= this.targetText.length) {
            this.isTyping = false;
            this.continueText.setVisible(true);
            if (this.typewriterTimer) {
                this.typewriterTimer.destroy();
                this.typewriterTimer = null;
            }
        }
    }
    
    completeText() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null;
        }
        this.currentText = this.targetText;
        this.dialogText.setText(this.currentText);
        this.charIndex = this.targetText.length;
        this.isTyping = false;
        this.continueText.setVisible(true);
    }
    
    cleanupAndStart() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
        }
        if (this.floatTween) {
            this.floatTween.stop();
        }
        if (this.continueTween) {
            this.continueTween.stop();
        }

        this.sound.play('transicionAmbiental', { volume: 0.6 });

        const bgMusic = this.registry.get('bgMusic');
        if (bgMusic) {
            this.tweens.add({
                targets: bgMusic,
                volume: 0,
                duration: 1500,
                onComplete: () => {
                    bgMusic.stop();
                }
            });
        }
        
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('Level1Scene');
        });
    }
    
    shutdown() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
        }
    }
}

class AboutScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AboutScene' });
    }
    
    preload() {
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }
    
    create() {
        //fade in
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        let fondo = this.add.image(0, 0, 'fondoInicio');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000033, 0.8);
        graphics.fillRoundedRect(200, 150, 800, 700, 20);
        graphics.lineStyle(2, 0x00ffff, 1);
        graphics.strokeRoundedRect(200, 150, 800, 700, 20);
        
        this.add.text(600, 200, "ACERCA DEL JUEGO", { 
            fontFamily: 'pixelFont', 
            fontSize: '30px', 
            color: COLOR_AMARILLO 
        }).setOrigin(0.5);
        
        const aboutContent = `Desarrollado por:\nVelvet Crew\n\nMISION ALFA CENTAURI\nes un juego educativo\nque enseña SQL a través\nde una aventura espacial.\n\nAprende bases de datos\nmientras salvas a\nla humanidad.\n\nVersión: 1.0 Beta`;
        
        this.add.text(600, 480, aboutContent, { 
            fontFamily: 'pixelFont', 
            fontSize: '20px', 
            color: COLOR_BLANCO,
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);
        
        let backText = this.add.text(600, 780, "<VOLVER AL MENÚ>", { 
            fontFamily: 'pixelFont', 
            fontSize: '20px', 
            color: COLOR_VERDE 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.sound.play('clickSound', { volume: 0.1 });
            
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('MenuScene');
            });
        });
    }
}

class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
    }
    
    preload() {

    }
    
    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        
        
        this.add.text(700, 400, 'MISION \nALFA CENTAURI', {
            fontFamily: 'pixelFont',
            fontSize: '45px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
        
        this.add.text(600, 500, 'Nivel: 1 ', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);

        this.add.text(700, 600, '<Organizar Inventario>\nEl Orden Nace del Caos', {
            fontFamily: 'pixelFont',
            fontSize: '25px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);

        this.add.text(500, 800, '<Continuar>', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_VERDE
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.sound.play('clickSound', { volume: 0.1 });
            

            const menuMusic = this.sound.add('menuMusic', {
                volume: 0.3,
                loop: true
            });
            menuMusic.play();
            this.registry.set('bgMusic', menuMusic);
            
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('Desafio1Scene');
            });
        });
    }
}
class Desafio1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Desafio1Scene' });
    }

    create() {
        let fondo = this.add.image(0, 0, 'fondoAlmacen');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.input.setTopOnly(true);

        this.comidas = [
            this.add.image(200, 150, 'sopa').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(400, 150, 'sopa2').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(600, 150, 'sopa3').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(800, 150, 'enlatado').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(1000, 150, 'nuggets').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(1200, 150, 'oxigeno').setScale(0.4).setInteractive({ draggable: true })
        ];

        this.add.text(700, 50, 'Arrastra los recursos a su entidad correcta (Modelo ER)', {
            fontFamily: 'pixelFont',
            fontSize: '25px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);

        this.almacenAlimento = this.add.rectangle(600, 400, 250, 150, 0x444444, 0.3).setStrokeStyle(2, 0xffffff);
        this.add.text(600, 380, "Alimento", { fontFamily: 'pixelFont', fontSize: '18px', color: COLOR_AMARILLO }).setOrigin(0.5);

        this.almacenSopas = this.add.rectangle(400, 650, 200, 120, 0x00ff00, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(400, 640, "Sopas", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        this.almacenEnlatados = this.add.rectangle(600, 650, 200, 120, 0xffa500, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(600, 640, "Enlatados", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        this.almacenOtros = this.add.rectangle(800, 650, 200, 120, 0x0000ff, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(800, 640, "Otros", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        this.almacenOxigeno = this.add.rectangle(1200, 500, 250, 150, 0xff0000, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(1200, 480, "Oxígeno", { fontFamily: 'pixelFont', fontSize: '18px', color: COLOR_BLANCO }).setOrigin(0.5);

        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 0.7);
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenSopas.x, this.almacenSopas.y - 60));
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenEnlatados.x, this.almacenEnlatados.y - 60));
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenOtros.x, this.almacenOtros.y - 60));

        this.correctAssignments = 0;
        this.totalCorrect = this.comidas.length;

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            if (this.checkDrop(gameObject)) {
                this.correctAssignments++;
                gameObject.disableInteractive();
                if (this.correctAssignments === this.totalCorrect) {
                    this.showWinMessage();
                }
            }
        });
    }

    checkDrop(gameObject) {
        if (gameObject.texture.key.includes("sopa") && Phaser.Geom.Rectangle.Contains(this.almacenSopas.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenSopas.x;
            gameObject.y = this.almacenSopas.y;
            return true;
        }
        if (gameObject.texture.key.includes("enlatado") && Phaser.Geom.Rectangle.Contains(this.almacenEnlatados.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenEnlatados.x;
            gameObject.y = this.almacenEnlatados.y;
            return true;
        }
        if (gameObject.texture.key.includes("nuggets") && Phaser.Geom.Rectangle.Contains(this.almacenOtros.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenOtros.x;
            gameObject.y = this.almacenOtros.y;
            return true;
        }
        if (gameObject.texture.key.includes("oxigeno") && Phaser.Geom.Rectangle.Contains(this.almacenOxigeno.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenOxigeno.x;
            gameObject.y = this.almacenOxigeno.y;
            return true;
        }
        return false;
    }

    showWinMessage() {
        let overlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.4
        );

        let messageBox = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            950, 
            320, 
            0x000033, 
            0.9
        ).setStrokeStyle(2, 0x00ffff); 

        let winText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
            "¡Inventario organizado correctamente!", {
            fontFamily: 'pixelFont',
            fontSize: '24px',
            color: COLOR_BLANCO,
            align: 'center'
        }).setOrigin(0.5);

    
        [overlay, messageBox, winText].forEach(element => {
            element.setAlpha(0);
        });

        this.tweens.add({
            targets: [overlay, messageBox, winText],
            alpha: 1,
            duration: 400,
            ease: 'Power2'
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#0a0a0a',
    parent: "game",
    scene: [BootScene, MenuScene, IntroductionScene, AboutScene, Level1Scene, Desafio1Scene],
    audio: {
        disableWebAudio: false
    }
};

new Phaser.Game(config);