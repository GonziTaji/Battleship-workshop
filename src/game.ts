import { Form } from "./form";
import { Board } from "./board";
import { gameConfig } from './gameConfig';

export class Game {
    private form: Form;
    private board: Board;
    // private state: 

    constructor() {
        this.form = new Form(null);
        this.board = new Board(
            gameConfig.board.x, 
            gameConfig.board.y);
    }

    start() {
        this.board.startGame();
        this.form.makeForm();
    }
}

interface GameState {
    board: BoardCell[][];
    // ships: 
}

interface BoardCell {
    isShip: boolean;
    isSelected: boolean;
    wasShot: boolean;
}