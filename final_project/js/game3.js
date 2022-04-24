const canvas = document.getElementById("game");
const context = canvas.getContext("2d")
context.scale(20,20)
function arenaReset(){
    let rowCount = 1;
    outer: for(let y = arena.lenth -1; y>0; --y){
        for(let x = 0; x<arena[y].lenth; ++x){
            if (arena[y][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(y,1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.scores += rowCount *10;
        rowCount *=2;
    }
}
function hit(arena, player){
    const a = player.matrix; 
    const b = player.pos;
    for(let y = 0; y<a.length; ++y){
        for(let x=0; x<a[y].length; ++x){
            if(a[y][x] !==0 &&
                (arena[y + b.y] &&
                arena[y + b.y][x + b.x]) !==0){
                    return true;
                }
        }
    }
    return false;
}

function createMatrix(c,d){
    const matrix = [];
    while(d--){
       matrix.push(new Array(c).fill(0)); 
    }
    return matrix;
}

function gamePiece(type){
    if(type === 'T'){
        return [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ];
    }else if (type==='0'){
        return [
            [2,2],
            [2,2],
        ];
    }else if (type==='L'){
        return [
            [0,3,0],
            [0,3,0],
            [0,3,3],
        ];
    }else if (type ==='J'){
        return [
            [0,4,0],
            [0,4,0],
            [4,4,0],
        ];
    }else if(type ==='I'){
        return [
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
        ];
    }else if(type ==='S'){
        return [
            [0,6,6],
            [6,6,0],
            [0,0,0],
        ];
    }else if(type ==='Z'){
        return [
            [7,7,0],
            [0,7,7],
            [0,0,0],
        ];
    }
}

function color(){
    context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width, canvas.height)

    drawMatrix(arena, {x:0, y:0});
    drawMatrix(player.matrix, player.pos)
}

function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                y + offset.y,
                                1,1);
            }   
    
        });
        
    });
}

function merge(arena, player){
    player.matrix.forEach((row,y) =>{
        row.forEach((value, x) =>{
            if(value !== 0){
                arena[y + player.pos.y][x + player.pos.x] = value;

            }
        });
    });
}

function playerDone(){
    player.pos.y++;
    if(hit(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaReset();
        updateScores();
    }
    dropCounter = 0;
}

function playerTurn(dir){
    player.pos.x += dir;
    if(hit(arena, player)){
        player.pos.x -= dir;
    }
}

function playerReset(){
    const blocks = 'ILJOTSZ';
    player.matrix =  gamePiece(blocks[blocks.length  * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
        (player.matrix[0].length / 2 | 0);

    if(hit(arena, player)){
        arena.forEach(row => row.fill(0));
        player.scores = 0;
        updateScores();
    }
}

function playerMove(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while(hit(arena, player)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1: -1));
        if (offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir){
    for(let y = 0; y<matrix.length; ++y){
        for(let x = 0; x<y; ++x){
            [
                matrix[x][y],
                matrix[y][x],
            ] =[
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if(dir>0){
        matrix.forEach(row => row.reverse());
    }else{
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval =  1000;
let lastTime = 0;

function upDateTime(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if(dropCounter > dropInterval){
        /*player.pos.y++;
        dropCounter = 0;*/
        playerDone()
    }
    
    color();
    requestAnimationFrame(upDateTime);
}

function updateScores(){
    document.getElementById("scores").innerText = player.scores;
}

const colors = [
    null,
    'blue',
    'green',
    'red',
    'pink',
    'purple',
    'yellow',
    'oeange',
];

const arena = createMatrix(10, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    scores: 0,
}
function movedown() {
    gamePiece.speedY = 1; 
}

document.addEventListener("keydown", KeyboardEvent =>{
    if(KeyboardEvent.keyCode === 37){
        playerTurn(-1)
    }
    else if(KeyboardEvent.keyCode === 39){
        playerTurn(+1)
    }
    else if(KeyboardEvent.keyCode === 40){
        playerDone()
    }
    else if(KeyboardEvent.keyCode ===38){
        playerMove(-1);
    }
    else if(KeyboardEvent.keyCode ===87){
        playerMove(1);
    }
})

playerReset();
updateScores();
upDateTime();
