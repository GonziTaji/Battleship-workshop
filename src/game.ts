import { gameConfig } from "./gameConfig";
import { randomIntFromInterval } from "./utils";
import { Cell } from "./cell";


class Game {
    private rows: number;
    private columns: number;
    private ship_x: number;
    private ship_y: number;
    private cellGrid: Cell[][];

    constructor() {
        this.rows = gameConfig.board.x;
        this.columns = gameConfig.board.y;
        this.ship_x = randomIntFromInterval(0, this.columns - 1);
        this.ship_y = randomIntFromInterval(0, this.rows - 1);
    }

    private make_board() {
        //empty board structure creation
        let cg: Cell[][] = [];
    
        for (let i = 0; i < this.rows; i++) {
            cg.push([]);
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

                cg[i].push(c);
            }
        }
    
        this.cellGrid = cg;
    }

    startGame() {
        this.make_board();
    }
}