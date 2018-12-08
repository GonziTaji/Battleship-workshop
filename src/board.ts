import { randomIntFromInterval } from "./utils";
import { Cell } from "./cell";

export class Board {
    rows:number;
    columns:number;
    ship_x:number;
    ship_y:number;
    board:HTMLElement[][];

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.ship_x = randomIntFromInterval(0, columns - 1);
        this.ship_y = randomIntFromInterval(0, rows - 1);
    }

    make_board() {
        //empty board structure creation
        let b:HTMLElement[][] = [];
    
        for (let i = 0; i < this.rows; i++) {
            b.push([]);
        }
        
        //filling board with Cell()'s
        for (let i = 0; i < this.rows; i++) {
        
            for (let j: number = 0; j < this.columns; j++) {
                let x = j;
                let y = i;
                let c;
                
                if (x === this.ship_x && y === this.ship_y) {
                    c = new Cell(true);
                } else {
                    c = new Cell(false);
                }

                b[i].push(c.cell);
            }
        }
    
        this.board = b;
    }

    print_board() {

        for (let row of this.board) {
            
            for (let cell of row) {
                document.body.appendChild(cell);
            }
    
            document.write("<br />");
        }
    }
}