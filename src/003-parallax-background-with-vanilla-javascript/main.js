const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 272;
const CANVAS_HEIGHT = canvas.height = 160;

class ParallaxImage {
    constructor(image, x, y, width, height, speed, direction) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
    }

    update() {
        this.x += this.speed * this.direction;

        if (this.x % this.width === 0) {
            this.x = 0;
        }
    }

    draw(ctx) {
        if (this.x <= 0) {
            ctx.drawImage(this.image, Math.abs(this.x), 0, this.width + this.x, this.height, 0, this.y, this.width + this.x, this.height);
        } else {
            ctx.drawImage(this.image, 0, 0, this.width - this.x, this.height, this.x, this.y, this.width - this.x, this.height);
        }

        if (this.x <= 0) {
            ctx.drawImage(this.image, 0, 0, Math.abs(this.x), this.height, this.width + this.x, this.y, Math.abs(this.x), this.height);
        } else {
            ctx.drawImage(this.image, this.width - this.x, 0, this.x, this.height, 0, this.y, this.x, this.height);
        }
    }
}

function createImage(path) {
    const image = new Image();
    image.src = path;
    return image;    
}

const direction = -1;
const images = [
    new ParallaxImage(createImage("assets/bg.png"), 0, 0, 272, 160, 0, direction),
    new ParallaxImage(createImage("assets/far-buildings.png"), 0, 18, 272, 142, 1, direction),
    new ParallaxImage(createImage("assets/buildings.png"), 0, 10, 272, 150, 2, direction),
    new ParallaxImage(createImage("assets/skill-foreground.png"), 0, 56, 272, 104, 4, direction)
];

const frameRate = 5;
let frameCounter = 0;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    images.forEach(i => i.draw(ctx));

    if (frameCounter % frameRate === 0) {
        images.forEach(i => i.update());
    }

    requestAnimationFrame(animate);

    frameCounter++;
}

animate();