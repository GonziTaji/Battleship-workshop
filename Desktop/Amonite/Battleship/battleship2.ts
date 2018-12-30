function randomIntFromInterval(min,max) {// min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

class Board {
    rows:number;
    columns:number;
    ship_x:number;
    ship_y:number;
    board:string[][];
    shipfloats:boolean;
    prevTar:string;
    prevTarPos_x:number;
    prevTarPos_y:number;

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.ship_x = randomIntFromInterval(0, columns - 1);
        this.ship_y = randomIntFromInterval(0, rows - 1);
        this.prevTar = 'O ';
        this.prevTarPos_x = 0;
        this.prevTarPos_y = 0;
    }

    make_board() {
        let b:string[][] = [];
    
        for (let i = 0; i < this.rows; i++) {
            b.push([]);
        }
        
        for (let i = 0; i < this.rows; i++) {
            
            for (let j:number = 0; j < this.columns; j++) {
                b[i].push("O ");
            }
        }
    
        this.board = b;
        this.shipfloats = true;
    }

    print_board() {
        for (let r of this.board) {
    
            for (let c of r) {
                document.write(c);
            }
    
            document.write("<br />");
        }
    }

    bomb_position(x:number, y:number) {
        this.board[x-1][y-1] = "X "

        if (x === this.ship_x && y === this.ship_y) {
            document.write("You sunk the ship!");
            this.shipfloats = false;
        }
    }

    target(x:number, y:number) {
        this.board[this.prevTarPos_y][this.prevTarPos_x] = this.prevTar;
        this.prevTar = this.board[y-1][x-1];
        this.prevTarPos_x = x - 1;
        this.prevTarPos_y = y - 1; 
        this.board[y-1][x-1] = "A ";
    }
}

function play(key) {
    document.write(key);
    let x;
    let y;

    if (key === 37) { // LEFT
        document.write("left");
        x = last_x - 1;
        y = last_y;
    } else if (key === 38) { // UP
        document.write("up");
        x = last_x;
        y = last_y - 1;
    } else if (key === 39) { // RIGHT
        document.write("right");
        x = last_x + 1;
        y = last_y;
    } else if (key === 40) { // DOWN
        document.write("down");
        x = last_x;
        y = last_y + 1;
    } else if (key === 13) { // ENTER
        document.write("enter");
        board.bomb_position(Number(x),Number(y)); 
    }

    document.write("<br />");

    last_x = x;
    last_y = y;
    let prevChar = board.target(x, y);
    document.body.innerHTML = '';
    board.print_board();
}

let board = new Board(5, 8);
board.make_board();
let shipfloats = true;
board.print_board();
let last_x = 1;
let last_y = 1;
document.addEventListener('keypress', e => play(e.keyCode));