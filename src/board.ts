import { idToString } from "./utils";

export class Board {
    
    static printBoard(rows: number, columns: number) {
		
        for (let i = 0; i < columns; i++) {
            
            for (let j = 0; j< rows; j++) {
                let c = document.createElement('button');
                let id = idToString(i, j);
                c.style.height = '50px';
                c.style.width = '50px';
                c.style.backgroundColor = 'white';
                c.setAttribute("id", id);
                document.body.appendChild(c);
            }
    
            document.write("<br />");
        }
    }

    static reloadBoard(rows: number, columns: number, xSel: number, ySel: number, wasShot: boolean[][]) {
        let idSel = idToString(xSel, ySel);
        let cSel = document.getElementById(idSel);
        for (let i = 0; i < columns; i++) {

            for (let j = 0; j < rows; j++) {
                let id = idToString(i, j);
                let cell = document.getElementById(id);
                if (wasShot[i][j]) {
                    cell.style.backgroundColor = 'blue';
                }
                else {
                    cell.style.backgroundColor = 'white';
                }
            }

        }
        if (!wasShot[xSel][ySel]) { //Si la celda seleccionada no fue disparada se selecciona
            cSel.style.backgroundColor = 'green';
        }
    }

}



/*export class Board {
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

    private print_board() {

        let f = new Form(this.board);
		
        for (let row of this.board) {
            
            for (let cell of row) {
                document.body.appendChild(cell);
            }
    
            document.write("<br />");
        }
		
		f.makeForm();
		
		Object.assign(window, {selectedCoordsByForm: f.selectedCoordsByForm.bind(f)});
		Object.assign(window, {shoot: f.shoot.bind(f)});
		
        document.body.appendChild(f.form);
    }

    startGame() {
        this.make_board();
        this.print_board();
    }
}*/