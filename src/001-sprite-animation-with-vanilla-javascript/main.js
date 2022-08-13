const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 150;
const CANVAS_HEIGHT = canvas.height = 150;

const loader = new Loader(ctx, animate);
const animations = SpriteAnimations.create({
    img: loader.loadImage("./assets/skeleton.png"),
    defaultState: "idle",
    spriteWidth: 150,
    spriteHeight: 150,
    sprites: [
        { 
            name: "attack",
            row: 0,
            frames: 8
        },
        { 
            name: "attackBlocked",
            row: 0,
            frames: 4
        },
        { 
            name: "death",
            row: 1,
            frames: 4,
            repeat: 1
        },
        { 
            name: "idle",
            row: 2,
            frames: 4
        },
        { 
            name: "shield",
            row: 3,
            frames: 4
        },
        { 
            name: "takeHit",
            row: 4,
            frames: 4
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

const selectAnimation = document.getElementById("selectAnimation");
selectAnimation.addEventListener("change", e => {
    animations.setState(e.target.value);
});

let animationFrame = 0;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();

    animations.draw(ctx);

    if (animationFrame % 5 === 0) {
        animations.update();
    }

    animationFrame++;
    requestAnimationFrame(animate);
}