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

            spriteAnimations[s.name] = new SpriteAnimation(spriteSheetSettings.img, locs, spriteSheetSettings.spriteWidth, spriteSheetSettings.spriteHeight);
        });

        return new SpriteAnimations(spriteAnimations, spriteSheetSettings.defaultState);
    }

    setState(state) {
        this.state = state;
    }

    update() {
        this.spriteAnimations[this.state].update();
    }

    draw(ctx) {
        this.spriteAnimations[this.state].draw(ctx);
    }
}

class SpriteAnimation {
    constructor(image, locs, width, height) {
        this.image = image;
        this.locs = locs;
        this.width = width;
        this.height = height;
        this.frame = 0;
    }

    update() {
        this.frame = ++this.frame % this.locs.length;
    }

    draw(ctx) {
        const loc = this.locs[this.frame];
        ctx.drawImage(this.image, loc.x, loc.y, this.width, this.height, 0, 0, this.width, this.height);
    }
}