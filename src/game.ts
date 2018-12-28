import { randomIntFromInterval } from "./utils";
import {Cell } from './boardCell';
import { gameConfig } from "./gameConfig";
import { UserInterface } from "./userInterface";
import { Point } from "./types";

export class Game {
    private positions: Cell[][];
    private shipReferences: Point[][]; // para su uso en el conteo de barcos o cosas por el estilo

    constructor() {
        this.initPositions();

        new UserInterface(this.positions, this.onShoot.bind(this));
    }

    public onShoot(p: Point) {
        let positionShot = this.positions[p.x][p.y];

        positionShot.wasShot = true;

        // hacer algo con la acción
        console.log(`shot to ${positionShot.isShip ? 'ship' : 'water'}`);
    }

    private initPositions() {
        // rellenar posiciones
        this.positions = [];
        
        for (let x = 0; x < gameConfig.board.columns; x++) {
            this.positions[x] = [];

            for (let y = 0; y < gameConfig.board.rows; y++) {
                this.positions[x][y] = new Cell(false);
            }
        }

        // generar barcos y modificar posiciones
        this.shipReferences = [];

        gameConfig.shipLengths.forEach((length, index) => {
            let ship: Array<Point>;
            do {
                ship = this.generateRandomShip(length);

            } while (!this.validateShip(ship));

            this.shipReferences[index] = ship;
            ship.forEach(pos => this.positions[pos.x][pos.y].isShip = true);
        });
    }

    private generateRandomShip(length: number) {
        let ship: Array<Point> = [];
        
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

    private validateShip(ship: Array<Point>) 
    {
        // 1. chequear si el barco se sale de los límites
        // 2. chequear si el barco colisiona con otro
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
