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

    generateShip(length: number) {
        // obtener seed
        let x = randomIntFromInterval(0, this.rows);
        let y = randomIntFromInterval(0, this.columns);

        // obtener orientaciÃ³n
        let axis = randomIntFromInterval(0, 1) == 0 ? x : y;
        
        // construir
        let positions: Array<Array<Number>> = [];
        for (let i = 0; i < length; i++) {
            axis++;
            positions.push([x, y])
        }

        // detectar colision
        // FIXME: no funciona
        let hasCollision = this.shipPositions
            .map(p => 
                positions
                    .map(sp => sp[0] == p[0] && sp[1] == p[1])
                    .reduce((prev, curr) => prev = curr || prev), false)
            .reduce((prev, curr) => prev = curr || prev, false);

        // reaccionar a colision
        if (hasCollision) {
            return this.generateShip(length);
        } else {
            return positions;
        }
    }

    generateAllShips() {
        for (const length of this.config.ships) {
            this.shipPositions.push(this.generateShip(length));
        }
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

let board = new Board();
board.init();