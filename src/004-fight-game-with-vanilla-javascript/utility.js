function calculateAttackDistance(player, enemy) {
    if (player.x > enemy.x) {
        return (player.attackBoundary.x - player.attackBoundary.w) - enemy.objectBoundary.x;
    } else {
        return enemy.objectBoundary.x - (player.attackBoundary.x + player.attackBoundary.w);
    }
}