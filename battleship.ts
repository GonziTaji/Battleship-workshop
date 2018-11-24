// let width = 8;
// let height = 6;
// let board:string = '';

// for(let i: number = 0; i < height; i++) {

//     for(let j: number = 0; j < width; j++) {
//         board += " O";
//     }

//     board += "<br />";
// }

// document.write(board);
// ========================================================
// let s:string[] = [];
// s.push("Xdd");
// s.push("asd");
// for (let e of s) {
//     document.write(e);
// }
// ========================================================
// let width = 8;
// let height = 6;
// let board:string[][] = [];

// for (let i = 0; i < height; i++) {
//     board.push([]);
// }

// for (let i:number = 0; i < height; i++) {
    
//     for (let j:number = 0; j < width; j++) {
//         board[i].push("O ");
//     }
// }

// for (let i:number = 0; i < height; i++) {

//     for (let j:number = 0; j < width; j++) {
//         document.write(board[i][j]);
//     }
//     document.write("<br />");
// }
// ========================================================
// function make_board(rows:number, columns:number) {
//     let board:string[][] = [];

//     for (let i = 0; i < rows; i++) {
//         board.push([]);
//     }
    
//     for (let i = 0; i < rows; i++) {
        
//         for (let j:number = 0; j < columns; j++) {
//             board[i].push("O ");
//         }
//     }

//     return board;
// }

// function print_board(board:string[][]) {
//     for (let r of board) {

//         for (let c of r) {
//             document.write(c);
//         }

//         document.write("<br />");
//     }
// }

// let b = make_board(5, 8);
// print_board(b);
// ========================================================
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

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.ship_x = randomIntFromInterval(0, columns - 1);
        this.ship_y = randomIntFromInterval(0, rows - 1);
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
        document.write("<br />");

        if (x === this.ship_x && y === this.ship_y) {
            document.write("You sunk the ship!")
            this.shipfloats = false;
        }
    }
}

let board = new Board(5, 8);
board.make_board();
let shipfloats = true;
board.print_board();

while (board.shipfloats) {
    let x = window.prompt("Ingresa coordenada \"x\": ");
    let y = window.prompt("Ingresa coordenada \"y\": ");
    board.bomb_position(Number(x),Number(y)); 
    board.print_board();
}