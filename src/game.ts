import { randomIntFromInterval } from "./utils";
import {BoardCell } from './boardCell';
import { gameConfig } from "./gameConfig";
import { Board } from "./board";

export class Game {
    private positions: BoardCell[][];
    private shipReferences: Coordinates[][];

    constructor() {
        this.initPositions();

        new Board(this.positions, this.onShoot.bind(this));
    }

    public onShoot(x: number, y: number): boolean {
        let positionShot = this.positions[x][y];

        positionShot.wasShot = true;
        console.log(`shot to ${positionShot.isShip ? 'ship' : 'water'}`);
        return positionShot.isShip;
    }

    private initPositions() {
        this.positions = [];

        for (let x = 0; x < gameConfig.board.columns; x++) {
            this.positions[x] = [];

            for (let y = 0; y < gameConfig.board.rows; y++) {
                this.positions[x][y] = new BoardCell(false);
            }
        }

        this.shipReferences = [];

        gameConfig.shipLengths.forEach((length, index) => {
            let ship: Array<Coordinates>;
            do {
                ship = generateRandomShip(length);

            } while (!this.validateShip(ship));

            this.shipReferences[index] = ship;
            ship.forEach(pos => this.positions[pos.x][pos.y].isShip = true);
        });
    }

    private validateShip(ship: Array<Coordinates>) 
    {
        // 1. check for ship outside boundaries
        // 2. check for ship coliding with other ships
        for (const index in ship) {
            const shipPosition = ship[index];

            if (shipPosition.x >= gameConfig.board.columns ||
                shipPosition.y >= gameConfig.board.rows)
            {
                return false;
            }
    
            if (this.positions[shipPosition.x][shipPosition.y].isShip) {
                return false;
            }
        }

        return true;
    }
}

interface Coordinates {
    x: number,
    y: number
}

function generateRandomShip(length: number) {
    let ship: Array<Coordinates> = [];
    
    let seed = {
        x: randomIntFromInterval(0, gameConfig.board.columns - 1),
        y: randomIntFromInterval(0, gameConfig.board.rows - 1)
    }
    
    // 0: horizonal, 1: vertical
    let direction = randomIntFromInterval(0, 1);

    for (let index = 0; index < length; index++) {
        direction == 0 ? seed.x += 1 : seed.y += 1;

        ship.push({ x: seed.x, y: seed.y });
    }

    return ship;
} 