import { gameConfig } from "./gameConfig";
import { randomIntFromInterval } from "./utils";
import { Board } from "./board";
import { Form } from "./form";


export class Game {
    private rows: number;
    private columns: number;
    private ship_x: number;
    private ship_y: number;
    private isShip: boolean[][];
    private wasShot: boolean[][]; //***borrar cell.ts probablemente */
    private wasHit: boolean[][];
    private form: Form;
    private hit: boolean;


    constructor() {
        this.rows = gameConfig.board.x;
        this.columns = gameConfig.board.y;
        this.ship_x = randomIntFromInterval(0, this.columns - 1);
        this.ship_y = randomIntFromInterval(0, this.rows - 1);
    }

    private makeBoard() {
        this.isShip = [];
        this.wasShot = [];
        this.wasHit = [];
        for (let i = 0; i < this.columns; i++) {
            this.isShip.push([]);
            this.wasShot.push([]);
            this.wasHit.push([]);
            for (let j = 0; j < this.rows; j++) {
                if (i === this.ship_x && j === this.ship_y) {
                    this.isShip[i].push(true);
                }
                else {
                    this.isShip[i].push(false);
                }
                this.wasShot[i].push(false);
                this.wasHit[i].push(false);
            }
        }


        //empty board structure creation
        /*let cg: Cell[][] = [];
    
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
    
        this.cellGrid = cg;*/

    }

    startGame() {
        this.makeBoard();
        Board.printBoard(this.rows, this.columns);
        this.form = new Form(this.rows, this.columns, this);
        this.form.makeTriggers();
    }

    refresh(x: number, y: number) {
        Board.reloadBoard(this.rows, this.columns, x, y, this.wasShot, this.wasHit);
    }

    select(x: number, y: number) {
        this.refresh(x, y);
    }

    shoot(x: number, y: number) {
        this.wasShot[x][y] = true;
        this.refresh(x, y);
        if (this.isShip[x][y]) {
            this.wasHit[x][y] = true;
            this.refresh(x, y);
            Board.win();
        }
        
    }
}