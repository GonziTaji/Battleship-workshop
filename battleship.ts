interface GameConfig {
    board: {x: number, y: number};
    ships: Array<number>;
};

const defaultGameConfig: GameConfig = {
    board: {x: 10, y: 10},
    ships: [5, 4, 4, 3, 3, 3, 2,]
};

function randomIntFromInterval(min,max) {// min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

class Board {
    get rows(): number {
        return this.config.board.x;
    };
    get columns(): number {
        return this.config.board.y;
    };
    ship_x:number;
    ship_y:number;
    board:string[][];
    shipfloats:boolean;
    shipPositions: Array<Array<number>> = [];
    config: GameConfig

    constructor(config: GameConfig = defaultGameConfig) {
        this.config = config;
        this.ship_x = randomIntFromInterval(0, this.columns - 1);
        this.ship_y = randomIntFromInterval(0, this.rows - 1);
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

    generateShip(length: number) {
        // obtener seed
        let x = randomIntFromInterval(0, this.rows);
        let y = randomIntFromInterval(0, this.columns);

        // obtener orientación
        let axis = randomIntFromInterval(0, 1) == 0 ? x : y;
        
        // construir
        let positions: Array<Array<Number>> = [];
        for (let i = 0; i < length; i++) {
            axis++;
            positions.push([x, y])
        }

        // detectar colisión
        console.log(this.shipPositions);
        let hasCollision = this.shipPositions
            .map(p => {
                console.log(p);
                return positions
                    .map(sp => {
                        console.log(sp);
                        console.log(p);
                        return sp[0] == p[0] && sp[1] == p[1];
                    })
                    .reduce((prev, curr) => prev = curr || prev), false
            })
            .reduce((prev, curr) => prev = curr || prev, false);

        // reaccionar a colisión
        if (hasCollision) {
            return this.generateShip(length);
        }
    }

    generateAllShips() {
        for (const length of this.config.ships) {
            this.shipPositions.push(this.generateShip(length));
        }
    }

    check_shot(x:number, y:number) {
        if(x && y) {
            this.board[x-1][y-1] = "X "
            document.write("<br />");
            
            if (x === this.ship_x && y === this.ship_y) {
                document.write("You sunk the ship!")
                this.shipfloats = false;
            }
        }
    }

    init() {
        this.fill_board();
        this.generateAllShips();
        this.print_board();
    }
}

let board = new Board();
board.init();
console.log(board);

// while (board.shipfloats) {
//     let coorx = (<HTMLInputElement>document.getElementById("coox")).value;
//     let coory = (<HTMLInputElement>document.getElementById("cooy")).value;

//     //coorx = window.prompt("Ingresa coordenada \"x\": ");
//     //coory = window.prompt("Ingresa coordenada \"y\": ");

//     console.log("x :",coorx);
//     console.log("y :",coory);

//     board.check_shot(Number(coorx),Number(coory)); 
//     board.print_board();
//     console.log("a");
// }