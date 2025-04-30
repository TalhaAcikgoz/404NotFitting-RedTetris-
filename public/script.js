const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(30, 30);

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    return m.some((row, y) =>
        row.some((value, x) => value !== 0 &&
            (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0));
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function update(time = 0) {
    dropCounter += (time - lastTime);
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    lastTime = time;
    draw();
    dropInterval -= dInterval;
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    }
});

const arena = createMatrix(12, 20);
const player = {
    pos: {x: 5, y: 0},
    matrix: [[1, 1], [1, 1]]
};

let dropCounter = 0;
let dropInterval = 700;
let dInterval = 0.08;// 0.1 - 0.05
let lastTime = 0;

update();
