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
        this.load.audio('quackFloo', 'assets/sonidos/flooSound.mp3');

        // fondos
        this.load.image('fondoInicio', 'assets/entorno/fondo7.jpeg');
        this.load.image('fondo2', 'assets/entorno/fondo1.jpeg');
        this.load.image('fondoAlmacen', 'assets/entorno/fondo2.jpeg');
        this.load.image('fondoPlaneta', 'assets/entorno/fondo4.jpeg');
        this.load.image('fondoNave', 'assets/entorno/fondo3.jpeg');

        //personajes
        this.load.image('pato', 'assets/personajes/FlooIA.png');


        //Componentes
        this.load.image('terminal', 'assets/componentes/terminal.png');
        this.load.image('botonOk', 'assets/componentes/clickOk.png');
        this.load.image('botonDelete', 'assets/componentes/clickDelete.png');

        //Recursos
 
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
        this.cameras.main.fadeIn(500, 0, 0, 0);
        
        let fondo = this.add.image(0, 0, 'fondo2');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        // DIÁLOGOS MÁS CONCISOS - Solo 4 en lugar de 8
        this.dialogs = [
            "¡ALERTA! Año 2157. La humanidad agotó los recursos terrestres.\nTu misión: extraer recursos del planeta Kepler-438b.",
            "La base de datos de la nave está corrupta.\nDeberás usar SQL para organizar inventario,\nreparar sistemas y gestionar la extracción.",
            "Soy Floo, tu asistente IA.\nTe guiaré usando comandos SQL para salvar a la humanidad.",
            "¡INICIANDO PROTOCOLO DE DESPERTAR!"
        ];

        this.createDialogBox();
        this.floo = this.add.image(1500, 500, 'pato');
        this.floo.setInteractive({ useHandCursor: true });
        // Floo se aleja del cursor cada vez que el mouse se acerca
        this.flooClickCount = 0;

        // Texto de afecto en la esquina superior izquierda. Por ahora no.
        this.affectionText = this.add.text(60, 60, '', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_AMARILLO
        }).setOrigin(0, 0);

        // Array para corazones
        this.hearts = [];

        // Función para actualizar corazones
        this.updateHearts = () => {
            // Elimina corazones anteriores
            this.hearts.forEach(h => h.destroy());
            this.hearts = [];
            // Solo muestra un corazón después de 20 clicks
            if (this.flooClickCount >= 10) {
            const heart = this.add.text(160, 60, '❤', {
                fontFamily: 'pixelFont',
                fontSize: '22px',
                color: '#ff3366'
            }).setOrigin(0, 0);
            this.hearts.push(heart);
            }
        };

        this.floo.on('pointerdown', () => {
            this.flooClickCount++;
            this.sound.play('quackFloo', { volume: 0.2 });
            this.updateHearts();
        });

        this.input.on('pointermove', (pointer) => {
            const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.floo.x, this.floo.y);
            if (dist < 150 && this.flooClickCount > 10) { // Si el cursor está cerca de Floo
            // Calcula dirección opuesta al cursor
            const angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, this.floo.x, this.floo.y);
            const moveDist = 200;
            const newX = Phaser.Math.Clamp(this.floo.x + Math.cos(angle) * moveDist, 100, this.cameras.main.width - 100);
            const newY = Phaser.Math.Clamp(this.floo.y + Math.sin(angle) * moveDist, 100, this.cameras.main.height - 100);
            this.tweens.add({
                targets: this.floo,
                x: newX,
                y: newY,
                duration: 400,
                ease: 'Power2'
            });
            }
        });

        // Inicializa corazones
        this.updateHearts();
        this.floo.setScale(0.5);
        
        this.floatTween = this.tweens.add({
            targets: this.floo,
            y: 520,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        // Texto más grande para más contenido
        this.dialogText = this.add.text(700, 470, '', {
            fontFamily: 'pixelFont',
            fontSize: '18px', // Reducido un poco para que quepa más texto
            color: COLOR_BLANCO,
            align: 'center',
            wordWrap: { width: 900 }, // Más ancho
            lineSpacing: 10
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

        // VELOCIDAD AUMENTADA - delay reducido a 25ms
        this.typewriterTimer = this.time.addEvent({
            delay: 25, // Más rápido (antes era 35)
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

//----------------- Escenas post desafios -----------------
// Nivel 1: Organizar Inventario
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
// Nivel 1: Organizar Inventario
class Level2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Scene' });
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
        
        this.add.text(600, 500, 'Nivel: 2 ', {
            fontFamily: 'pixelFont',
            fontSize: '20px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);

        this.add.text(990, 650, '<Sincronización>\nLa Máquina Recuerda lo que la Humanidad Olvida', {
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
                this.scene.start('Desafio2Scene');
            });
        });
    }
}

// ------------------------- DESAFÍOS -------------------------
class Desafio1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Desafio1Scene' });
    }

    init() {
        // Reinicializar todas las variables cada vez que se inicia la escena
        // Variables para el diálogo inicial
        this.dialogIndex = 0;
        this.isTyping = false;
        this.currentText = '';
        this.targetText = '';
        this.charIndex = 0;
        this.typewriterTimer = null;
        this.dialogCompleted = false;
        
        // Variables para los consejos de Floo
        this.helpBoxVisible = false;
        this.currentTip = 0;

        // Progreso
        this.progressBar = null;
        this.progressFill = null;
        this.progressText = null;

        // Intentos - REINICIALIZAR AQUÍ
        this.maxAttempts = 10;
        this.attemptsLeft = this.maxAttempts;  // Resetear a valor máximo
        this.attemptBar = null;
        this.attemptFill = null;
        this.attemptText = null;

        // Otras variables que podrían necesitar reinicio
        this.correctAssignments = 0;
        this.totalCorrect = 6; // Número total de elementos
    }

    create() {
        let fondo = this.add.image(0, 0, 'fondoAlmacen');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.startFlooDialog();
    }

    startFlooDialog() {
        this.dialogs = [
            "¡Bienvenido al almacén de la nave!\nLos recursos están desordenados por el viaje.",
            "Necesitamos organizar todo según las casillas correctas.\nEl orden nace del caos.",
            "Arrastra cada recurso a su categoría correcta.\nLas sopas van con sopas, los enlatados con enlatados.",
            "Recuerda: ¡Puedes clickearme cuando necesites ayuda!"
        ];

        this.createDialogBox();
        
        this.floo = this.add.image(1500, 500, 'pato');
        this.floo.setInteractive({ useHandCursor: true });
        this.floo.on('pointerdown', () => {
            this.sound.play('quackFloo', { volume: 0.2 });
        });
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
            fontSize: '18px',
            color: COLOR_BLANCO,
            align: 'center',
            wordWrap: { width: 900 },
            lineSpacing: 10
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
            this.endDialog();
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
        this.dialogGraphics = this.add.graphics();
        
        this.dialogGraphics.lineStyle(3, 0x00ffff, 0.8);
        this.dialogGraphics.strokeRoundedRect(200, 350, 1000, 280, 20);
    
        this.dialogGraphics.lineStyle(2, 0xffffff, 0.5);
        this.dialogGraphics.strokeRoundedRect(205, 355, 990, 270, 18);

        this.dialogGraphics.fillStyle(0x000033, 0.7);
        this.dialogGraphics.fillRoundedRect(205, 355, 990, 270, 18);
 
        this.dialogTitle = this.add.text(700, 375, 'FLOO - ASISTENTE IA', {
            fontFamily: 'pixelFont',
            fontSize: '15px',
            color: COLOR_CELESTE
        }).setOrigin(0.5);
        
        this.dialogGraphics.lineStyle(1, 0x00ffff, 0.5);
        this.dialogGraphics.lineBetween(220, 390, 1180, 390);
    }

    showNextDialog() {
        if (this.dialogIndex >= this.dialogs.length) {
            this.endDialog();
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

        this.typewriterTimer = this.time.addEvent({
            delay: 25,
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

    endDialog() {
        if (this.typewriterTimer) this.typewriterTimer.destroy();
        if (this.floatTween) this.floatTween.stop();
        if (this.continueTween) this.continueTween.stop();
        
        if (this.dialogGraphics) this.dialogGraphics.destroy();
        if (this.dialogTitle) this.dialogTitle.destroy();
        if (this.dialogText) this.dialogText.destroy();
        if (this.continueText) this.continueText.destroy();
        if (this.skipButton) this.skipButton.destroy();
        if (this.clickZone) this.clickZone.destroy();
        if (this.floo) this.floo.destroy();
        
        this.dialogCompleted = true;
        
        this.startChallenge();
    }

    startChallenge() {
        // CREAR FLOO PERMANENTE EN LA ESQUINA
        this.createPermanentFloo();

        this.input.setTopOnly(true);

        // Centrado horizontal dinámico
        const centerX = this.cameras.main.centerX;
        const topY = 150;
        const spacing = 200;

        // Datos inventados para cada recurso
        const recursoDatos = {
            'sopa': {
            nombre: 'Sopa de Verduras',
            temperatura: '5°C',
            fechaCaducidad: '2157-09-12',
            peso: '350g',
            categoria: 'Sopa'
            },
            'sopa2': {
            nombre: 'Sopa de Pollo',
            temperatura: '4°C',
            fechaCaducidad: '2157-10-01',
            peso: '340g',
            categoria: 'Sopa'
            },
            'sopa3': {
            nombre: 'Sopa de Tomate',
            temperatura: '6°C',
            fechaCaducidad: '2157-08-25',
            peso: '360g',
            categoria: 'Sopa'
            },
            'enlatado': {
            nombre: 'Enlatado de Atún',
            temperatura: 'Ambiente',
            fechaCaducidad: '2158-01-15',
            peso: '200g',
            categoria: 'Enlatado'
            },
            'nuggets': {
            nombre: 'Nuggets Espaciales',
            temperatura: '-18°C',
            fechaCaducidad: '2157-12-30',
            peso: '400g',
            categoria: 'Otros'
            },
            'oxigeno': {
            nombre: 'Tanque de Oxígeno',
            temperatura: 'Presurizado',
            fechaCaducidad: '2160-05-01',
            peso: '5kg',
            categoria: 'Oxígeno'
            }
        };

        // Tooltip visual
        let tooltip = this.add.text(0, 0, '', {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO,
            backgroundColor: '#222244',
            padding: { left: 12, right: 12, top: 8, bottom: 8 },
            align: 'left',
            wordWrap: { width: 260 }
        }).setVisible(false).setDepth(1000);

        this.comidas = [
            this.add.image(centerX - spacing * 2, topY, 'sopa').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(centerX - spacing, topY, 'sopa2').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(centerX, topY, 'sopa3').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(centerX + spacing, topY, 'enlatado').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(centerX + spacing * 2, topY, 'nuggets').setScale(0.4).setInteractive({ draggable: true }),
            this.add.image(centerX + spacing * 3, topY, 'oxigeno').setScale(0.4).setInteractive({ draggable: true })
        ];

        // Mostrar tooltip al pasar el mouse por encima
        this.comidas.forEach(img => {
            img.on('pointerover', (pointer) => {
            const datos = recursoDatos[img.texture.key];
            if (datos) {
                tooltip.setText(
                `Nombre: ${datos.nombre}\n` +
                `Temperatura: ${datos.temperatura}\n` +
                `Caducidad: ${datos.fechaCaducidad}\n` +
                `Peso: ${datos.peso}\n` +
                `Categoría: ${datos.categoria}`
                );
                tooltip.setPosition(pointer.x + 20, pointer.y + 20);
                tooltip.setVisible(true);
            }
            });
            img.on('pointerout', () => {
            tooltip.setVisible(false);
            });
            img.on('pointermove', (pointer) => {
            if (tooltip.visible) {
                tooltip.setPosition(pointer.x + 20, pointer.y + 20);
            }
            });
        });

        this.add.text(centerX, this.cameras.main.height - 60, 'Arrastra los recursos a su casilla correcta\npara completar la gestión de recursos', {
            fontFamily: 'pixelFont',
            fontSize: '25px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);

        // Centrado horizontal de almacenes
        const almacenY = 400;
        const almacenSpacing = 200;
        this.almacenAlimento = this.add.rectangle(centerX, almacenY, 250, 150, 0x444444, 0.3).setStrokeStyle(2, 0xffffff);
        this.add.text(centerX, almacenY - 20, "Alimento", { fontFamily: 'pixelFont', fontSize: '18px', color: COLOR_AMARILLO }).setOrigin(0.5);

        const almacenBottomY = 650;
        this.almacenSopas = this.add.rectangle(centerX - almacenSpacing, almacenBottomY, 200, 120, 0x00ff00, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(centerX - almacenSpacing, almacenBottomY - 10, "Sopas", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        this.almacenEnlatados = this.add.rectangle(centerX, almacenBottomY, 200, 120, 0xffa500, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(centerX, almacenBottomY - 10, "Enlatados", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        this.almacenOtros = this.add.rectangle(centerX + almacenSpacing, almacenBottomY, 200, 120, 0x0000ff, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(centerX + almacenSpacing, almacenBottomY - 10, "Otros", { fontFamily: 'pixelFont', fontSize: '16px', color: COLOR_BLANCO }).setOrigin(0.5);

        // Oxígeno a la derecha, pero centrado verticalmente respecto a los almacenes
        const oxigenoX = centerX + almacenSpacing * 2;
        const oxigenoY = 500;
        this.almacenOxigeno = this.add.rectangle(oxigenoX, oxigenoY, 250, 150, 0xff0000, 0.2).setStrokeStyle(2, 0xffffff);
        this.add.text(oxigenoX, oxigenoY - 20, "Oxígeno", { fontFamily: 'pixelFont', fontSize: '18px', color: COLOR_BLANCO }).setOrigin(0.5);

        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 0.7);
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenSopas.x, this.almacenSopas.y - 60));
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenEnlatados.x, this.almacenEnlatados.y - 60));
        graphics.strokeLineShape(new Phaser.Geom.Line(this.almacenAlimento.x, this.almacenAlimento.y + 80, this.almacenOtros.x, this.almacenOtros.y - 60));

        // Asegurar que correctAssignments esté inicializado en 0
        this.correctAssignments = 0;
        this.totalCorrect = this.comidas.length;

        // Barra de progreso en la esquina inferior derecha
        this.createProgressBar();

        // Barra de intentos en la esquina inferior izquierda
        this.createAttemptBar();

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            if (this.checkDrop(gameObject)) {
                this.correctAssignments++;
                gameObject.disableInteractive();
                this.updateProgressBar();
                if (this.correctAssignments === this.totalCorrect) {
                    this.showWinMessage();
                }
            } else {
                this.attemptsLeft--;
                this.updateAttemptBar();
                if (this.attemptsLeft <= 0) {
                    this.showLoseMessage();
                }
            }
        });
    }

    createProgressBar() {
        // Tamaño y posición
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = this.cameras.main.width - barWidth / 2 - margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        // Fondo de la barra
        this.progressBar = this.add.graphics();
        this.progressBar.fillStyle(0x222222, 0.8);
        this.progressBar.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);
        this.progressBar.lineStyle(3, 0x00ffff, 0.9);
        this.progressBar.strokeRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);

        // Barra de progreso (relleno)
        this.progressFill = this.add.graphics();
        this.updateProgressBar();

        // Texto de progreso
        this.progressText = this.add.text(x, y, `Progreso: 0/${this.totalCorrect}`, {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
    }

    updateProgressBar() {
        if (!this.progressFill) return;
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = this.cameras.main.width - barWidth / 2 - margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        // Limpiar el gráfico anterior
        this.progressFill.clear();

        // Calcular el ancho del relleno
        const percent = this.correctAssignments / this.totalCorrect;
        const fillWidth = Math.floor(barWidth * percent);

        // Color de relleno (verde si está completo, celeste si no)
        const fillColor = percent === 1 ? 0x59ff00 : 0x00eeff;

        this.progressFill.fillStyle(fillColor, 0.85);
        this.progressFill.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, fillWidth, barHeight, 12);

        // Actualizar texto
        if (this.progressText) {
            this.progressText.setText(`Progreso: ${this.correctAssignments}/${this.totalCorrect}`);
        }
    }

    createAttemptBar() {
        // Tamaño y posición
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = barWidth / 2 + margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        // Fondo de la barra
        this.attemptBar = this.add.graphics();
        this.attemptBar.fillStyle(0x222222, 0.8);
        this.attemptBar.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);
        this.attemptBar.lineStyle(3, 0xff3366, 0.9);
        this.attemptBar.strokeRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);

        // Barra de intentos (relleno)
        this.attemptFill = this.add.graphics();
        this.updateAttemptBar();

        // Texto de intentos
        this.attemptText = this.add.text(x, y, `Intentos: ${this.attemptsLeft}/${this.maxAttempts}`, {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
    }

    updateAttemptBar() {
        if (!this.attemptFill) return;
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = barWidth / 2 + margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        // Limpiar el gráfico anterior
        this.attemptFill.clear();

        // Calcular el ancho del relleno
        const percent = this.attemptsLeft / this.maxAttempts;
        const fillWidth = Math.floor(barWidth * percent);

        // Color de relleno (rojo si quedan pocos, rosa si no)
        const fillColor = percent <= 0.3 ? 0xff0000 : 0xff3366;

        this.attemptFill.fillStyle(fillColor, 0.85);
        this.attemptFill.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, fillWidth, barHeight, 12);

        // Actualizar texto
        if (this.attemptText) {
            this.attemptText.setText(`Intentos: ${this.attemptsLeft}/${this.maxAttempts}`);
        }
    }

    createPermanentFloo() {
        // Floo en la esquina superior derecha
        this.flooHelper = this.add.image(this.cameras.main.width - 100, 100, 'pato');
        this.flooHelper.setScale(0.25);
        this.flooHelper.setInteractive({ useHandCursor: true });
        
        // Animación de flotación
        this.tweens.add({
            targets: this.flooHelper,
            y: 120,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        // Efecto de brillo cuando el mouse está encima
        this.flooHelper.on('pointerover', () => {
            // Puedes agregar un efecto visual aquí si lo deseas
        });
        
        this.flooHelper.on('pointerout', () => {
            this.flooHelper.clearTint();
        });
        
        // Click para mostrar consejos
        this.flooHelper.on('pointerdown', () => {
            this.toggleHelpBox();
        });
        
        // Array de consejos
        this.tips = [
            "Recuerda: Las sopas tienen\nlíquido, todas van juntas.",
            "El oxígeno no es comida,\ntiene su propia categoría.",
            "Los nuggets van en 'Otros'\nporque son comida procesada.",
            "En SQL, esto sería:\nSELECT * FROM alimentos\nWHERE tipo = 'sopa'",
            "¡Mira las líneas!\nMuestran la relación\nentre las entidades."
        ];
        this.tipTimer = null;
    }
    
    toggleHelpBox() {
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        } else {
            this.showHelpBox();
        }
    }
    
    showHelpBox() {
        this.sound.play('quackFloo', { volume: 0.1 });
        this.helpBoxVisible = true;
        
        // Crear caja de ayuda
        this.helpGraphics = this.add.graphics();
        this.helpGraphics.fillStyle(0x000033, 0.5);
        this.helpGraphics.fillRoundedRect(
            this.cameras.main.width - 520, 
            50, 
            350, 
            150, 
            10
        );
        this.helpGraphics.lineStyle(2, 0x00ffff, 1);
        this.helpGraphics.strokeRoundedRect(
            this.cameras.main.width - 520, 
            50, 
            350, 
            150, 
            10
        );
        
        // Título
        this.helpTitle = this.add.text(
            this.cameras.main.width - 345, 
            70, 
            'CONSEJO DE FLOO', 
            {
                fontFamily: 'pixelFont',
                fontSize: '14px',
                color: COLOR_CELESTE
            }
        ).setOrigin(0.5);
        
        // Texto del consejo
        this.helpText = this.add.text(
            this.cameras.main.width - 345, 
            120, 
            this.tips[this.currentTip], 
            {
                fontFamily: 'pixelFont',
                fontSize: '12px',
                color: COLOR_BLANCO,
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5);
        
        // Botón de cerrar
        this.closeHelp = this.add.text(
            this.cameras.main.width - 190, 
            65, 
            'x', 
            {
                fontFamily: 'pixelFont',
                fontSize: '14px',
                color: '#ff0000'
            }
        ).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.hideHelpBox();
        });
        
        // Cambiar al siguiente consejo para la próxima vez
        this.currentTip = (this.currentTip + 1) % this.tips.length;

        // Iniciar timer para cambiar tip automáticamente cada 6 segundos
        if (this.tipTimer) {
            this.tipTimer.remove();
        }
        this.tipTimer = this.time.addEvent({
            delay: 6000,
            loop: true,
            callback: () => {
                if (this.helpBoxVisible) {
                    // Actualiza el texto del tip
                    this.helpText.setText(this.tips[this.currentTip]);
                    this.currentTip = (this.currentTip + 1) % this.tips.length;
                }
            }
        });
    }
    
    hideHelpBox() {
        this.helpBoxVisible = false;
        if (this.helpGraphics) this.helpGraphics.destroy();
        if (this.helpTitle) this.helpTitle.destroy();
        if (this.helpText) this.helpText.destroy();
        if (this.closeHelp) this.closeHelp.destroy();
        if (this.tipTimer) {
            this.tipTimer.remove();
            this.tipTimer = null;
        }
    }

    checkDrop(gameObject) {
        if (gameObject.texture.key.includes("sopa") && Phaser.Geom.Rectangle.Contains(this.almacenSopas.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenSopas.x;
            gameObject.y = this.almacenSopas.y;
            this.sound.play('acierto', { volume: 0.2 });
            return true;
        }
        if (gameObject.texture.key.includes("enlatado") && Phaser.Geom.Rectangle.Contains(this.almacenEnlatados.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenEnlatados.x;
            gameObject.y = this.almacenEnlatados.y;
            this.sound.play('acierto', { volume: 0.2 });
            return true;
        }
        if (gameObject.texture.key.includes("nuggets") && Phaser.Geom.Rectangle.Contains(this.almacenOtros.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenOtros.x;
            gameObject.y = this.almacenOtros.y;
            this.sound.play('acierto', { volume: 0.2 });
            return true;
        }
        if (gameObject.texture.key.includes("oxigeno") && Phaser.Geom.Rectangle.Contains(this.almacenOxigeno.getBounds(), gameObject.x, gameObject.y)) {
            gameObject.x = this.almacenOxigeno.x;
            gameObject.y = this.almacenOxigeno.y;
            this.sound.play('acierto', { volume: 0.2 });
            return true;
        }
        this.sound.play('error', { volume: 0.2 });

        // Mostrar sugerencia de ayuda si quedan 5 intentos
        if (this.attemptsLeft === 5) {
            if (!this.flooHelpHint) {
            // Fondo azul oscuro con borde celeste, centrado
            const boxWidth = 500;
            const boxHeight = 80;
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            this.flooHelpHintBg = this.add.graphics();
            this.flooHelpHintBg.fillStyle(0x000033, 0.85);
            this.flooHelpHintBg.fillRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 16);
            this.flooHelpHintBg.lineStyle(2, 0x00ffff, 1);
            this.flooHelpHintBg.strokeRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 16);

            this.flooHelpHint = this.add.text(
                centerX, centerY,
                "Siempre puedes pedir la ayuda de Floo",
                {
                fontFamily: 'pixelFont',
                fontSize: '18px',
                color: COLOR_BLANCO,
                align: 'center',
                wordWrap: { width: boxWidth - 40 }
                }
            ).setOrigin(0.5).setDepth(1000);

            // Desvanecer el texto y fondo después de 4 segundos
            this.time.delayedCall(4000, () => {
                if (this.flooHelpHint) {
                this.flooHelpHint.destroy();
                this.flooHelpHint = null;
                }
                if (this.flooHelpHintBg) {
                this.flooHelpHintBg.destroy();
                this.flooHelpHintBg = null;
                }
            });
            }
        }

        return false;
    }

    showWinMessage() {
        // Ocultar la caja de ayuda si está visible
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        }
        
        this.sound.play('w', { volume: 0.3 });
        
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

        let winText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, 
            "¡MISIÓN COMPLETADA!\nInventario organizado correctamente", {
            fontFamily: 'pixelFont',
            fontSize: '24px',
            color: COLOR_VERDE,
            align: 'center'
        }).setOrigin(0.5);

        let continueText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 
            "[Continuar al siguiente nivel]", {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_AMARILLO,
            align: 'center'
        }).setOrigin(0.5);
    
        [overlay, messageBox, winText, continueText].forEach(element => {
            element.setAlpha(0);
        });

        this.tweens.add({
            targets: [overlay, messageBox, winText, continueText],
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.scene.start('Level2Scene');
                });
            }
        });
    }

    showLoseMessage() {
        // Ocultar la caja de ayuda si está visible
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        }

        this.sound.play('error', { volume: 0.4 });

        let overlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.5
        );

        let messageBox = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            950, 
            320, 
            0x330000, 
            0.95
        ).setStrokeStyle(2, 0xff3366); 

        let loseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, 
            "¡MISIÓN FALLIDA!\nSe han agotado los intentos", {
            fontFamily: 'pixelFont',
            fontSize: '24px',
            color: '#ff3366',
            align: 'center'
        }).setOrigin(0.5);

        let retryText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 
            "[Reintentar desafío]", {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO,
            align: 'center'
        }).setOrigin(0.5);

        [overlay, messageBox, loseText, retryText].forEach(element => {
            element.setAlpha(0);
        });

        this.tweens.add({
            targets: [overlay, messageBox, loseText, retryText],
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                retryText.setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        this.scene.restart();
                    });
            }
        });
    }
}
//desafio 2
class Desafio2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Desafio2Scene' });
    }

    preload() {
        this.load.font('pixelFont', 'assets/fonts/PressStart2P-Regular.ttf', 'truetype');
    }

    init() {
        // Variables para la terminal SQL
        this.currentInput = '';
        this.commandHistory = [];
        this.currentStep = 0;
        this.isTyping = false;
        this.cursor = '|';
        this.cursorVisible = true;
        
        // Variables para los consejos de Floo
        this.helpBoxVisible = false;
        this.currentTip = 0;

        // Límite de errores
        this.maxAttempts = 10;
        this.attemptsLeft = this.maxAttempts;

        // Pasos del desafío SQL
        this.sqlSteps = [
            {
                instruction: "Instruccion:\nCrea la base de datos principal con:\nCREATE DATABASE MisionAlfaCentauri;",
                expectedCommand: "CREATE DATABASE MisionAlfaCentauri;",
                successMessage: "¡Base de datos creada correctamente!",
                hint: "Recuerda usar mayúsculas para los comandos SQL"
            },
            {
                instruction: "Instruccion:\nAhora usa la base de datos:\nUSE MisionAlfaCentauri;",
                expectedCommand: "USE MisionAlfaCentauri;",
                successMessage: "¡Conectado a la base de datos!",
                hint: "No olvides el punto y coma al final"
            },
            {
                instruction: "Instruccion:\nCrea la tabla de recursos:\nCREATE TABLE Recursos \n(id INT, nombre VARCHAR(50), \ntipo VARCHAR(30));",
                expectedCommand: "CREATE TABLE Recursos (id INT, nombre VARCHAR(50), tipo VARCHAR(30));",
                successMessage: "¡Tabla de recursos creada!",
                hint: "Verifica la sintaxis de CREATE TABLE"
            }
        ];
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let fondo = this.add.image(0, 0, 'fondoPlaneta');
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.startFlooDialog();
    }

    startFlooDialog() {
    this.dialogs = [
        "¡Ahora necesitamos restaurar la base de datos!\nLa terminal está lista para recibir comandos SQL.",
        "Sigue las instrucciones paso a paso.\nCada comando debe terminar con punto y coma (;)",
        "Usa el botón EJECUTAR (verde) para enviar tu comando\ny el botón BORRAR (rojo) para limpiar el texto.",
        "¡Recuerda que puedes clickearme si necesitas ayuda!"
    ];
    
    // resto del código igual...


        this.dialogIndex = 0;
        this.createDialogBox();
        
        this.floo = this.add.image(1500, 500, 'pato');
        this.floo.setScale(0.5);
        this.floo.setInteractive({ useHandCursor: true });
        this.floo.on('pointerdown', () => {
            this.sound.play('quackFloo', { volume: 0.2 });
        });
        
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
            fontSize: '18px',
            color: COLOR_BLANCO,
            align: 'center',
            wordWrap: { width: 900 },
            lineSpacing: 10
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
            this.endDialog();
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
        this.dialogGraphics = this.add.graphics();
        
        this.dialogGraphics.lineStyle(3, 0x00ffff, 0.8);
        this.dialogGraphics.strokeRoundedRect(200, 350, 1000, 280, 20);
    
        this.dialogGraphics.lineStyle(2, 0xffffff, 0.5);
        this.dialogGraphics.strokeRoundedRect(205, 355, 990, 270, 18);

        this.dialogGraphics.fillStyle(0x000033, 0.7);
        this.dialogGraphics.fillRoundedRect(205, 355, 990, 270, 18);
 
        this.dialogTitle = this.add.text(700, 375, 'FLOO - ASISTENTE IA', {
            fontFamily: 'pixelFont',
            fontSize: '15px',
            color: COLOR_CELESTE
        }).setOrigin(0.5);
        
        this.dialogGraphics.lineStyle(1, 0x00ffff, 0.5);
        this.dialogGraphics.lineBetween(220, 390, 1180, 390);
    }

    showNextDialog() {
        if (this.dialogIndex >= this.dialogs.length) {
            this.endDialog();
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

        this.typewriterTimer = this.time.addEvent({
            delay: 25,
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

    endDialog() {
        if (this.typewriterTimer) this.typewriterTimer.destroy();
        if (this.floatTween) this.floatTween.stop();
        if (this.continueTween) this.continueTween.stop();
        
        if (this.dialogGraphics) this.dialogGraphics.destroy();
        if (this.dialogTitle) this.dialogTitle.destroy();
        if (this.dialogText) this.dialogText.destroy();
        if (this.continueText) this.continueText.destroy();
        if (this.skipButton) this.skipButton.destroy();
        if (this.clickZone) this.clickZone.destroy();
        if (this.floo) this.floo.destroy();

        this.startTerminalChallenge();
    }

    startTerminalChallenge() {
        this.createPermanentFloo();
        this.createTerminalInterface();
        this.setupKeyboardInput();
        this.showCurrentInstruction();
        this.createProgressBar();
        this.createAttemptBar();
    }

    createPermanentFloo() {
        this.flooHelper = this.add.image(this.cameras.main.width - 100, 100, 'pato');
        this.flooHelper.setScale(0.25);
        this.flooHelper.setInteractive({ useHandCursor: true });
        
        this.tweens.add({
            targets: this.flooHelper,
            y: 120,
            duration: 2000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        this.flooHelper.on('pointerdown', () => {
            this.toggleHelpBox();
        });

        // Consejos actualizados para SQL
        this.tips = [
            "CREATE DATABASE es el primer\npaso para organizar datos.",
            "USE selecciona la base de datos\nen la que trabajarás.",
            "CREATE TABLE define la\nestructura de tus datos.",
            "Los comandos SQL siempre\nterminan con punto y coma (;)",
            "VARCHAR(50) significa texto\nde máximo 50 caracteres.",
            "INT es para números enteros\ncomo IDs o cantidades."
        ];
        this.tipTimer = null;
    }

    toggleHelpBox() {
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        } else {
            this.showHelpBox();
        }
    }

    showHelpBox() {
        this.sound.play('quackFloo', { volume: 0.1 });
        this.helpBoxVisible = true;

        this.helpGraphics = this.add.graphics();
        this.helpGraphics.fillStyle(0x000033, 0.5);
        this.helpGraphics.fillRoundedRect(
            this.cameras.main.width - 520,
            50,
            350,
            150,
            10
        );
        this.helpGraphics.lineStyle(2, 0x00ffff, 1);
        this.helpGraphics.strokeRoundedRect(
            this.cameras.main.width - 520,
            50,
            350,
            150,
            10
        );

        this.helpTitle = this.add.text(
            this.cameras.main.width - 345,
            70,
            'CONSEJO DE FLOO',
            {
                fontFamily: 'pixelFont',
                fontSize: '14px',
                color: COLOR_CELESTE
            }
        ).setOrigin(0.5);

        this.helpText = this.add.text(
            this.cameras.main.width - 345,
            120,
            this.tips[this.currentTip],
            {
                fontFamily: 'pixelFont',
                fontSize: '12px',
                color: COLOR_BLANCO,
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5);

        this.closeHelp = this.add.text(
            this.cameras.main.width - 190,
            65,
            'x',
            {
                fontFamily: 'pixelFont',
                fontSize: '14px',
                color: '#ff0000'
            }
        ).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.hideHelpBox();
            });

        this.currentTip = (this.currentTip + 1) % this.tips.length;

        if (this.tipTimer) {
            this.tipTimer.remove();
        }
        this.tipTimer = this.time.addEvent({
            delay: 6000,
            loop: true,
            callback: () => {
                if (this.helpBoxVisible) {
                    this.helpText.setText(this.tips[this.currentTip]);
                    this.currentTip = (this.currentTip + 1) % this.tips.length;
                }
            }
        });
    }

    hideHelpBox() {
        this.helpBoxVisible = false;
        if (this.helpGraphics) this.helpGraphics.destroy();
        if (this.helpTitle) this.helpTitle.destroy();
        if (this.helpText) this.helpText.destroy();
        if (this.closeHelp) this.closeHelp.destroy();
        if (this.tipTimer) {
            this.tipTimer.remove();
            this.tipTimer = null;
        }
    }

    createTerminalInterface() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.terminal = this.add.image(centerX, centerY - 50, 'terminal');
        this.terminal.setScale(3);

        this.promptText = this.add.text(centerX - 165, centerY - 350, 'SQL> ', {
            fontFamily: 'pixelFont',
            fontSize: '14px',
            color: COLOR_VERDE
        });

        this.commandText = this.add.text(centerX - 105, centerY - 352, '', {
            fontFamily: 'pixelFont',
            fontSize: '18px',
            color: '#000000',
            wordWrap: { width: 200 }
        });

        this.cursorText = this.add.text(centerX - 105, centerY - 352, this.cursor, {
            fontFamily: 'pixelFont',
            fontSize: '18px',
            color: '#000000'
        });

        this.historyText = this.add.text(centerX - 160, centerY - 100, '', {
            fontFamily: 'pixelFont',
            fontSize: '10px',
            color: COLOR_VERDE,
            wordWrap: { width: 200 },
            lineSpacing: 5
        });

        this.createButtons();
        this.createInstructionArea();

        this.cursorTimer = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.cursorVisible = !this.cursorVisible;
                this.cursorText.setText(this.cursorVisible ? this.cursor : ' ');
            }
        });
    }

    createButtons() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Botón OK
    this.okButton = this.add.image(centerX + 120, centerY + 125, 'botonOk');
    this.okButton.setScale(0.6);
    this.okButton.setInteractive({ useHandCursor: true });
    this.okButton.on('pointerdown', () => {
        this.executeCommand();
    });

    this.okButton.on('pointerover', () => {
        this.okButton.setScale(0.7);
    });

    this.okButton.on('pointerout', () => {
        this.okButton.setScale(0.6);
    });

    // AGREGAR ETIQUETA OK
    this.add.text(centerX + 120, centerY + 200, 'EJECUTAR', {
        fontFamily: 'pixelFont',
        fontSize: '12px',
        color: COLOR_VERDE
    }).setOrigin(0.5);

    // Botón DELETE
    this.deleteButton = this.add.image(centerX - 120, centerY + 125, 'botonDelete');
    this.deleteButton.setScale(0.6);
    this.deleteButton.setInteractive({ useHandCursor: true });
    this.deleteButton.on('pointerdown', () => {
        this.clearCommand();
    });

    this.deleteButton.on('pointerover', () => {
        this.deleteButton.setScale(0.7);
    }); 

    this.deleteButton.on('pointerout', () => {
        this.deleteButton.setScale(0.6);
    });

    // AGREGAR ETIQUETA DELETE
    this.add.text(centerX - 120, centerY + 170, 'BORRAR', {
        fontFamily: 'pixelFont',
        fontSize: '12px',
        color: '#000000ff'
    }).setOrigin(0.5);
}

    createInstructionArea() {
        const centerX = this.cameras.main.centerX;
        const topY = 150;

        const instructionBg = this.add.graphics();
        instructionBg.fillStyle(0x000033, 0.7);
        instructionBg.fillRoundedRect(40, topY - 40, 500, 310, 20);
        instructionBg.lineStyle(2, 0x00ffff, 0.8);
        instructionBg.strokeRoundedRect(40, topY - 40, 500, 310, 20);

        this.instructionText = this.add.text(80, topY, '', {
            fontFamily: 'pixelFont',
            fontSize: '22px',
            color: COLOR_BLANCO,
            wordWrap: { width: 390 },
            lineSpacing: 8
        }).setOrigin(0, 0);
    }

    createProgressBar() {
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = this.cameras.main.width - barWidth / 2 - margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        this.progressBar = this.add.graphics();
        this.progressBar.fillStyle(0x222222, 0.8);
        this.progressBar.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);
        this.progressBar.lineStyle(3, 0x00ffff, 0.9);
        this.progressBar.strokeRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);

        this.progressFill = this.add.graphics();
        this.updateProgressBar();

        this.progressText = this.add.text(x, y, `Progreso: 0/${this.sqlSteps.length}`, {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
    }

    updateProgressBar() {
        if (!this.progressFill) return;
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = this.cameras.main.width - barWidth / 2 - margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        this.progressFill.clear();

        const percent = this.currentStep / this.sqlSteps.length;
        const fillWidth = Math.floor(barWidth * percent);

        const fillColor = percent === 1 ? 0x59ff00 : 0x00eeff;

        this.progressFill.fillStyle(fillColor, 0.85);
        this.progressFill.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, fillWidth, barHeight, 12);

        if (this.progressText) {
            this.progressText.setText(`Progreso: ${this.currentStep}/${this.sqlSteps.length}`);
        }
    }

    createAttemptBar() {
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = barWidth / 2 + margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        this.attemptBar = this.add.graphics();
        this.attemptBar.fillStyle(0x222222, 0.8);
        this.attemptBar.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);
        this.attemptBar.lineStyle(3, 0xff3366, 0.9);
        this.attemptBar.strokeRoundedRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, 12);

        this.attemptFill = this.add.graphics();
        this.updateAttemptBar();

        this.attemptText = this.add.text(x, y, `Intentos: ${this.attemptsLeft}/${this.maxAttempts}`, {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO
        }).setOrigin(0.5);
    }

    updateAttemptBar() {
        if (!this.attemptFill) return;
        const barWidth = 320;
        const barHeight = 28;
        const margin = 40;
        const x = barWidth / 2 + margin;
        const y = this.cameras.main.height - barHeight / 2 - margin;

        this.attemptFill.clear();

        const percent = this.attemptsLeft / this.maxAttempts;
        const fillWidth = Math.floor(barWidth * percent);

        const fillColor = percent <= 0.3 ? 0xff0000 : 0xff3366;

        this.attemptFill.fillStyle(fillColor, 0.85);
        this.attemptFill.fillRoundedRect(x - barWidth / 2, y - barHeight / 2, fillWidth, barHeight, 12);

        if (this.attemptText) {
            this.attemptText.setText(`Intentos: ${this.attemptsLeft}/${this.maxAttempts}`);
        }
    }

    setupKeyboardInput() {
        // Solo capturar entrada para escribir, NO para ejecutar
        this.input.keyboard.on('keydown', (event) => {
            const key = event.key;
            event.preventDefault();

            if (key === 'Backspace') {
                if (this.currentInput.length > 0) {
        // Si el último carácter es un salto de línea, eliminarlo
        if (this.currentInput[this.currentInput.length - 1] === '\n') {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateCommandDisplay();
    }
            } else if (key.length === 1) {
                // Calcular cuántos caracteres hay en la línea actual
                const lines = this.currentInput.split('\n');
                const currentLine = lines[lines.length - 1] || '';

                if (currentLine.length >= 14) {
                    // Si la línea actual tiene 14 caracteres, agregar salto de línea
                    this.currentInput += '\n' + key;
                } else {
                    this.currentInput += key;
    }
                this.updateCommandDisplay();
            }
            // NO procesar Enter aquí
        });

        this.input.keyboard.enabled = true;
        this.game.canvas.focus();
    }

    updateCommandDisplay() {
        this.commandText.setText(this.currentInput);

    // Calcular posición del cursor
    const lines = this.currentInput.split('\n');
    const lastLine = lines[lines.length - 1] || '';
    const lineHeight = 22; // Ajusta según tu fuente

    this.cursorText.setPosition(
        this.commandText.x + (lastLine.length * 12), // 12 píxeles por carácter aprox
        this.commandText.y + ((lines.length - 1) * lineHeight)
    );
}

    executeCommand() {
        if (this.currentInput.trim() === '') return;

        this.sound.play('clickSound', { volume: 0.2 });

        const command = this.currentInput.trim();
        const currentStep = this.sqlSteps[this.currentStep];
        
        // Limpiar historial cada vez
        this.historyText.setText('');

        if (this.isCommandCorrect(command, currentStep.expectedCommand)) {
            this.sound.play('acierto', { volume: 0.2 });
            this.historyText.setText(`> ${currentStep.successMessage}`);
            
            this.currentStep++;
            this.updateProgressBar();
            
            if (this.currentStep >= this.sqlSteps.length) {
                this.showCompletionMessage();
            } else {
                this.showCurrentInstruction();
            }
        } else {
            this.sound.play('error', { volume: 0.2 });
            this.historyText.setText(`> Error: Comando incorrecto`);

            this.attemptsLeft--;
            this.updateAttemptBar();

            if (this.attemptsLeft <= 0) {
                this.showLoseMessage();
            }

            // Mostrar hint si quedan 5 intentos
            if (this.attemptsLeft === 5) {
                this.showFlooHint();
            }
        }

        this.currentInput = '';
        this.updateCommandDisplay();
    }

    showFlooHint() {
        if (!this.flooHelpHint) {
            const boxWidth = 500;
            const boxHeight = 80;
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            this.flooHelpHintBg = this.add.graphics();
            this.flooHelpHintBg.fillStyle(0x000033, 0.85);
            this.flooHelpHintBg.fillRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 16);
            this.flooHelpHintBg.lineStyle(2, 0x00ffff, 1);
            this.flooHelpHintBg.strokeRoundedRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 16);

            this.flooHelpHint = this.add.text(
                centerX, centerY,
                "Siempre puedes pedir la ayuda de Floo",
                {
                    fontFamily: 'pixelFont',
                    fontSize: '18px',
                    color: COLOR_BLANCO,
                    align: 'center',
                    wordWrap: { width: boxWidth - 40 }
                }
            ).setOrigin(0.5).setDepth(1000);

            this.time.delayedCall(4000, () => {
                if (this.flooHelpHint) {
                    this.flooHelpHint.destroy();
                    this.flooHelpHint = null;
                }
                if (this.flooHelpHintBg) {
                    this.flooHelpHintBg.destroy();
                    this.flooHelpHintBg = null;
                }
            });
        }
    }
isCommandCorrect(input, expected) {
    // Eliminar todos los espacios y comparar solo la estructura
    const normalize = (cmd) => {
        return cmd.toUpperCase()
                 .replace(/\s+/g, '')  // Eliminar TODOS los espacios
                 .trim();
    };
    
    return normalize(input) === normalize(expected);
}
    clearCommand() {
        this.sound.play('clickSound', { volume: 0.1 });
        this.currentInput = '';
        this.updateCommandDisplay();
    }

    showCurrentInstruction() {
        const currentStep = this.sqlSteps[this.currentStep];
        this.instructionText.setText(currentStep.instruction);
    }

    showCompletionMessage() {
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        }

        this.sound.play('w', { volume: 0.3 });
        
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

        let winText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, 
            "¡MISIÓN COMPLETADA!\nBase de datos restaurada exitosamente", {
            fontFamily: 'pixelFont',
            fontSize: '24px',
            color: COLOR_VERDE,
            align: 'center'
        }).setOrigin(0.5);

        let continueText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 
            "[Continuar al siguiente nivel]", {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_AMARILLO,
            align: 'center'
        }).setOrigin(0.5);
    
        [overlay, messageBox, winText, continueText].forEach(element => {
            element.setAlpha(0);
        });

        this.tweens.add({
            targets: [overlay, messageBox, winText, continueText],
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(3000, () => {
                    this.scene.start('MenuScene');
                });
            }
        });
    }

    showLoseMessage() {
        if (this.helpBoxVisible) {
            this.hideHelpBox();
        }

        this.sound.play('error', { volume: 0.4 });

        let overlay = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        );

        let messageBox = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            950,
            320,
            0x330000,
            0.95
        ).setStrokeStyle(2, 0xff3366);

        let loseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30,
            "¡MISIÓN FALLIDA!\nSe han agotado los intentos", {
            fontFamily: 'pixelFont',
            fontSize: '24px',
            color: '#ff3366',
            align: 'center'
        }).setOrigin(0.5);

        let retryText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50,
            "[Reintentar desafío]", {
            fontFamily: 'pixelFont',
            fontSize: '16px',
            color: COLOR_BLANCO,
            align: 'center'
        }).setOrigin(0.5);

        [overlay, messageBox, loseText, retryText].forEach(element => {
            element.setAlpha(0);
        });

        this.tweens.add({
            targets: [overlay, messageBox, loseText, retryText],
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                retryText.setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        this.scene.restart();
                    });
            }
        });
    }

    shutdown() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
        }
        if (this.cursorTimer) {
            this.cursorTimer.destroy();
        }
        if (this.tipTimer) {
            this.tipTimer.remove();
        }

        this.input.keyboard.removeAllListeners();
    }
}
// Configuración del juego

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#0a0a0a',
    parent: "game",
    scene: [
        BootScene, 
        MenuScene,
        IntroductionScene, 
        AboutScene, 
        Level1Scene, 
        Desafio1Scene, 
        Level2Scene,
        Desafio2Scene],
    audio: {
        disableWebAudio: false
    }
};

new Phaser.Game(config);