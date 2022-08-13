class Skeleton {
    constructor(x, y, speed, left) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = 100;
        this.left = left;
        this.attacking = false;
        this.blockCounter = 0;

        this.animations = SpriteAnimations.create({
            img: loader.loadImage("./assets/skeleton.png"),
            defaultState: this.left ? "idleLeft" : "idleRight",
            spriteWidth: 150,
            spriteHeight: 150,
            sprites: [
                { 
                    name: "attackRight",
                    row: 0,
                    frames: 8,
                    repeat: 1
                },
                { 
                    name: "attackLeft",
                    row: 0,
                    frames: 8,
                    repeat: 1,
                    flip: true
                },
                { 
                    name: "deathRight",
                    row: 1,
                    frames: 4,
                    repeat: 1
                },
                { 
                    name: "deathLeft",
                    row: 1,
                    frames: 4,
                    repeat: 1,
                    flip: true
                },
                { 
                    name: "idleRight",
                    row: 2,
                    frames: 4
                },
                { 
                    name: "idleLeft",
                    row: 2,
                    frames: 4,
                    flip: true
                },
                { 
                    name: "shieldRight",
                    row: 3,
                    frames: 4,
                    repeat: 1
                },
                { 
                    name: "shieldLeft",
                    row: 3,
                    frames: 4,
                    repeat: 1,
                    flip: true
                },
                { 
                    name: "takeHitRight",
                    row: 4,
                    frames: 4,
                    repeat: 1
                },
                { 
                    name: "takeHitLeft",
                    row: 4,
                    frames: 4,
                    repeat: 1,
                    flip: true
                },
                { 
                    name: "walkRight",
                    row: 5,
                    frames: 4
                },
                { 
                    name: "walkLeft",
                    row: 5,
                    frames: 4,
                    flip: true
                }
            ]
        });
        this.state = this.animations.state;
    }

    decreaseHealth(v) {
        this.health -= v;

        if (this.health < 0) {
            this.health = 0;
        }

        if (this.health === 0) {
            this.speed = 0;
            this.animations.setState(this.left ? "deathLeft" : "deathRight");
        }
    }

    walkRight() {
        if (this.health <= 0) {
            return;
        }

        this.left = false;
        this.speed = 1;
        this.animations.setState("walkRight");
    }

    walkLeft() {
        if (this.health <= 0) {
            return;
        }

        this.left = true;
        this.speed = -1;
        this.animations.setState("walkLeft");
    }

    shield() {
        if (this.health <= 0) {
            return;
        }

        this.speed = 0;
        this.animations.setState(this.left ? "shieldLeft" : "shieldRight");
    }

    attack() {
        if (this.health <= 0) {
            return;
        }

        this.speed = 0;
        this.animations.setState(this.left ? "attackLeft" : "attackRight");
        this.block(15);
    }

    takeHit() {
        if (this.health <= 0) {
            return;
        }

        this.animations.setState(this.left ? "takeHitLeft" : "takeHitRight");
        this.block(5);
    }

    block(v) {
        this.blockCounter = v;
    }

    isBlocked() {
        return this.blockCounter > 0;
    }

    updateBlocked() {
        if (this.isBlocked()) {
            this.blockCounter--;

            if (this.blockCounter === 0) {
                this.idle();
            }
        }
    }

    idle() {
        if (this.health <= 0) {
            return;
        }

        this.speed = 0;
        this.animations.setState(this.left ? "idleLeft" : "idleRight");
    }

    checkIsAttacking() {
        return (this.animations.state === "attackLeft" || this.animations.state === "attackRight")
                &&
                this.animations.isLastFrame();
    }

    checkHit(enemy) {
        if (this.attacking) {
            if (this.attackBoundary.x < enemy.objectBoundary.x + enemy.objectBoundary.w &&
                this.attackBoundary.x + this.attackBoundary.w > enemy.objectBoundary.x &&
                this.attackBoundary.y < enemy.objectBoundary.y + enemy.objectBoundary.h &&
                this.attackBoundary.h + this.attackBoundary.y > enemy.objectBoundary.y) {
                
                if ((this.left && enemy.animations.state === "shieldRight") ||
                    (!this.left && enemy.animations.state === "shieldLeft")) {
                    this.idle();
                    this.block(20);

                    if (!enemy.animations.isLastFrame()) {
                        enemy.decreaseHealth(Math.floor(5 * ((this.attackBoundary.w - Math.abs(this.attackBoundary.x - enemy.objectBoundary.x)) / this.attackBoundary.w)));
                    }

                    return;
                }

                enemy.takeHit();
                enemy.decreaseHealth(Math.ceil(10 * ((this.attackBoundary.w - Math.abs(this.attackBoundary.start - enemy.objectBoundary.start)) / this.attackBoundary.w)));

                this.idle();
            } else {
                this.idle();
            }
        }
    }

    update() {
        this.updateBlocked();

        if (this.health > 0) {
            this.x += this.speed;
        }

        this.animations.update();
        this.attacking = this.checkIsAttacking();

        this.objectBoundary = {
            x: this.x + (this.left ? 60 : 70),
            y: this.y + 50,
            w: 20,
            h: 50
        };
        this.objectBoundary.start = this.left ? this.objectBoundary.x : this.objectBoundary.x + this.objectBoundary.w;
        
        this.attackBoundary = {
            x: this.x + (this.left ? 20 : 105),
            y: this.y + 50,
            w: 25,
            h: 20
        };
        this.attackBoundary.start = this.left ? this.attackBoundary.x + this.attackBoundary.w : this.attackBoundary.x;
    }

    draw(ctx) {
        this.animations.setLocation(this.x, this.y);
        this.animations.draw(ctx);

        ctx.save();
        ctx.globalAlpha = 0.75;

        ctx.fillStyle = "green";
        ctx.fillRect(this.x + (this.left ? 48 : 62), this.y + 40, 40 * (this.health / 100), 7);

        ctx.fillStyle = "red";
        ctx.fillRect(this.x + (this.left ? 48 : 62) + 40 * (this.health / 100), this.y + 40, 40 * (1 - (this.health / 100)), 7);
       
        ctx.restore();
    }
}