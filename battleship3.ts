//=====Functions=====
function randomIntFromInterval(min,max) {// min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}
//=====Classes=====
class Cell {
    cell: HTMLElement;
    isShip: boolean;
    wasClicked: boolean;
    shipfloats: boolean;

    constructor() {
        this.isShip = false;
        this.wasClicked = false;
        this.cell = document.createElement('button');
        this.cell.style.height = '50';
        this.cell.style.width = '50';
        this.cell.onmouseover = () => this.mouseover();
        this.cell.onmouseout = () => this.mouseout();
        this.cell.onclick = () => this.mouseclick();
        this.cell.style.backgroundColor = 'white';
    }

    mouseover() {
        if (!this.wasClicked) {
            this.cell.style.backgroundColor = 'green';
        }
    }

    mouseout() {
        if (!this.wasClicked) {
            this.cell.style.backgroundColor = 'white';
        }
    }

    mouseclick() {
        this.wasClicked = true;

        if (this.isShip) {
            this.cell.style.backgroundColor = 'grey';
            this.shipfloats = false;
            document.write("WINNER, WINNER, CHICKEN DINNER!<br />You sunk the ship!");
        } else {
            this.cell.style.backgroundColor = 'blue';
        }
    }
}

class Board {
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
                let c = new Cell;
                b[i].push(c.cell);
                let x = j;
                let y = i;

                if (x === this.ship_x && y === this.ship_y) {
                    c.isShip = true;
                    c.shipfloats = true;
                }
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
//=====MAIN=====
let board = new Board(5, 5);
board.make_board();
board.print_board();