const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 272;
const CANVAS_HEIGHT = canvas.height = 160;

const loader = new Loader(ctx, animate);
const background = new Background(0);
const player = new Skeleton(0, 58, 0);
const enemy = new Skeleton(120, 58, 0, true);
enemy.left =  true;

const gameObjects = [
    background,
    player,
    enemy
];

window.addEventListener("keydown", e => {
    switch (e.code) {
        case "ArrowRight":
            if (!player.isBlocked()) {
                background.setDirection(-1);
                player.walkRight();
            }
            break;
        case "ArrowLeft":
            if (!player.isBlocked()) {
                background.setDirection(1);
                player.walkLeft();
            }
            break;
        case "ArrowUp":
            if (!player.isBlocked()) {
                background.setDirection(0);
                player.shield();
            }
            break;
        case "Space":
            if (!player.isBlocked()) {
                background.setDirection(0);
                player.attack();
            }
            break;
    }
});

window.addEventListener("keyup", e => {
    background.setDirection(0);
    player.idle();
});

const frameRate = 4;
let frameCounter = 0;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (frameCounter % frameRate === 0) {
        gameObjects.forEach(i => i.update());

        player.checkHit(enemy);
        enemy.checkHit(player);

        const attackDistance = calculateAttackDistance(enemy, player);
        if (attackDistance <= -10) {
            if (!enemy.isBlocked()) {
                enemy.attack();
            }
        } else {
            if (enemy.x > player.x) {
                enemy.walkLeft();
            } else {
                enemy.walkRight();
            }
        }
    }

    gameObjects.forEach(i => i.draw(ctx));

    requestAnimationFrame(animate);

    frameCounter++;
}