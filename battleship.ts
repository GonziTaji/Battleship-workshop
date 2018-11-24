import { randomIntFromInterval } from './functions';

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

    fill_board() {
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

    check_shot(x:number, y:number) {
        this.board[x-1][y-1] = "X "
        document.write("<br />");

        if (x === this.ship_x && y === this.ship_y) {
            document.write("You sunk the ship!")
            this.shipfloats = false;
        }
    }

    init() {
        this.fill_board();
        this.print_board();
    }
}

let board = new Board(5, 8);
board.init();

while (board.shipfloats) {
    let x = window.prompt("Ingresa coordenada \"x\": ");
    let y = window.prompt("Ingresa coordenada \"y\": ");
    board.check_shot(Number(x),Number(y)); 
    board.print_board();
}