class SpriteAnimations {
    constructor(spriteAnimations, state) {
        this.spriteAnimations = spriteAnimations;
        this.state = state;
    }

    static create(spriteSheetSettings) {
        const spriteAnimations = {};
        spriteSheetSettings.sprites.forEach(s => {
            const y = spriteSheetSettings.spriteHeight * s.row;
            const locs = []; 
            for (let i = 0; i < s.frames; i++) {
                const x = i * spriteSheetSettings.spriteWidth;
                locs.push({ x: x, y: y });  
            }

            spriteAnimations[s.name] = new SpriteAnimation(
                spriteSheetSettings.img, 
                locs, 
                spriteSheetSettings.spriteWidth, 
                spriteSheetSettings.spriteHeight,
                s.repeat,
                s.flip);
        });

        return new SpriteAnimations(spriteAnimations, spriteSheetSettings.defaultState);
    }

    reset(state) {
        this.spriteAnimations[state].reset();
    }

    setState(state) {
        if (this.state !== state) {
            this.reset(state);
            this.state = state;
        }
    }

    setLocation(x, y) {
        this.spriteAnimations[this.state].setLocation(x, y);
    }

    isLastFrame() {
        return this.spriteAnimations[this.state].isLastFrame();
    }

    isFinished() {
        return this.spriteAnimations[this.state].isFinished();
    }

    update() {
        this.spriteAnimations[this.state].update();
    }

    draw(ctx) {
        this.spriteAnimations[this.state].draw(ctx);
    }
}

class SpriteAnimation {
    constructor(image, locs, width, height, repeat, flip) {
        this.image = image;
        this.locs = locs;
        this.width = width;
        this.height = height;
        this.frame = 0;
        this.repeat = repeat ? repeat : -1;
        this.repeatCounter = this.repeat;
        this.flip = flip;
        this.x = 0;
        this.y = 0;
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    reset() {
        this.frame = 0;
        this.repeatCounter = this.repeat;
    }

    isLastFrame() {
        return this.frame === this.locs.length - 1;
    }

    isFinished() {
        return this.repeatCounter === 0;
    }

    update() {
        if (this.isFinished()) {
            return;
        }

        this.frame = ++this.frame % this.locs.length;

        if (this.repeatCounter > 0 && this.frame === this.locs.length - 1) {
            this.repeatCounter--;
        }
    }

    draw(ctx) {
        const loc = this.locs[this.frame];

        ctx.save();
        if (this.flip) {
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
        }

        ctx.drawImage(this.image, loc.x, loc.y, this.width, this.height, this.flip ? -this.x : this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}