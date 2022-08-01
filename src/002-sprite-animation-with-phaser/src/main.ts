import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    skeleton: Phaser.GameObjects.Sprite | null = null;

    constructor() {
        super({key: "Main"});
    }

    preload() {
        this.load.spritesheet("skeleton", "./src/assets/skeleton.png", { frameWidth: 150, frameHeight: 150 });
    }

    create() {
        this.anims.create({
            key: "attack",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({
            key: "attackBlocked",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 0, end: 3 }),
            repeat: -1
        });

        this.anims.create({
            key: "death",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 8, end: 11 }),
            repeat: 0
        });

        this.anims.create({
            key: "idle",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 16, end: 19 }),
            repeat: -1
        });

        this.anims.create({
            key: "shield",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 24, end: 27 }),
            repeat: -1
        });

        this.anims.create({
            key: "takeHit",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 32, end: 35 }),
            repeat: -1
        });

        this.anims.create({
            key: "walk",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers("skeleton", { start: 40, end: 43 }),
            repeat: -1
        });

        this.skeleton = this.add.sprite(75, 75, "skeleton");

        const selectAnimation: HTMLElement = document.getElementById("selectAnimation") as HTMLElement;
        selectAnimation.addEventListener("change", e => {
            let val = (e.target as HTMLSelectElement).value; 
            let flip = null;
            if (val) {
                const valParts = val.split("-");
                if (valParts && valParts.length > 1) {
                    val = valParts[0];
                    flip = valParts[1];
                }
            }
            this.play(val, flip === "1");
        });
    
        this.play("idle");
    }

    play(value: string, flip: boolean | undefined = undefined) {
        if (this.skeleton) {
            this.skeleton.flipX = !!flip;
            this.skeleton.play(value);
        }
    }
}

const scene = new MainScene();
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 150,
    height: 150,
    backgroundColor: "#C0C0C0",
    scene: [ scene ]
};
new Phaser.Game(config);
