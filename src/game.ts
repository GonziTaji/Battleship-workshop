import { gameConfig } from "./gameConfig";
import { randomIntFromInterval } from "./utils";


class Game {
    private rows: number;
    private columns: number;
    private ship_x: number;
    private ship_y: number;

    constructor() {
        this.rows = gameConfig.board.x;
        this.columns = gameConfig.board.y;
        this.ship_x = randomIntFromInterval(0, this.columns - 1);
        this.ship_y = randomIntFromInterval(0, this.rows - 1);
    }
}