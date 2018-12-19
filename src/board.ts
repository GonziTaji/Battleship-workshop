import { randomIntFromInterval } from "./utils";
import { Cell } from "./cell";
import { gameConfig } from './gameConfig';
import { Form } from "./form";

export class Board {
    private rows:number;
    private columns:number;
    private ship_x:number;
    private ship_y:number;
    private board:HTMLElement[][];

    constructor() {
        this.rows = gameConfig.board.x;
        this.columns = gameConfig.board.y;
        this.ship_x = randomIntFromInterval(0, this.columns - 1);
        this.ship_y = randomIntFromInterval(0, this.rows - 1);
    }

    private make_board() {
        //empty board creation
        let b:HTMLElement[][] = [];
        //turning board into matrix
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

    private print_board() {
		
        for (let row of this.board) {
            
            for (let cell of row) {
                document.body.appendChild(cell);
            }
    
            document.write("<br />");
        }
        
        let f = new Form(this.board);
		f.makeForm();
		Object.assign(window, {selectedCoordsByForm: f.selectedCoordsByForm.bind(f)});
		Object.assign(window, {shoot: f.shoot.bind(f)});
        document.body.appendChild(f.form);
    }

    startGame() {
        this.make_board();
        this.print_board();
    }
}