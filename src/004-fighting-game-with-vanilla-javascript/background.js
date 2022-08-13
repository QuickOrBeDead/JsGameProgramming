class ParallaxImage {
    constructor(image, x, y, width, height, speed, direction, alpha) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
        this.alpha = alpha;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update() {
        this.x += this.speed * this.direction;

        if (this.x % this.width === 0) {
            this.x = 0;
        }
    }

    draw(ctx) {

        ctx.save();
        ctx.globalAlpha = this.alpha;

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

        ctx.restore();
    }
}

function createImage(path) {
    const image = new Image();
    image.src = path;
    return image;    
}

class Background {
    constructor(direction) {
        this.direction = direction === undefined ? -1 : direction ? 1 : -1;
        this.images = [
            new ParallaxImage(createImage("assets/bg.png"), 0, 0, 272, 160, 0, direction, 0.8),
            new ParallaxImage(createImage("assets/far-buildings.png"), 0, 18, 272, 142, 1, direction, 0.9),
            new ParallaxImage(createImage("assets/buildings.png"), 0, 10, 272, 150, 2, direction, 0.8),
            new ParallaxImage(createImage("assets/skill-foreground.png"), 0, 56, 272, 104, 4, direction, 0.9)
        ];
    }

    setDirection(direction) {
        this.direction = direction;
        this.images.forEach(i => i.setDirection(direction));
    }

    update() {
        this.images.forEach(i => i.update());
    }

    draw(ctx) {
        this.images.forEach(i => i.draw(ctx));
    }
}