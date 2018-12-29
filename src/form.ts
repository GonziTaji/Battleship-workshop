import { idToString } from "./utils";
import { Game } from "./game";


export class Form {

    private x: number;  //coordenadas seleccionadas
    private y: number;
    private rows: number;
    private columns: number;
    private game: Game;

    constructor(rows: number, columns: number, game: Game) {
        this.rows = rows;
        this.columns = columns;
        this.game = game;
    }

    makeTriggers() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                let id = idToString(i, j);
                document.getElementById(id).onmouseover = () => this.select(i, j);
                document.getElementById(id).onclick = () => this.shoot();
            }
        }
    }

    private select(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.game.select(x, y);
    }

    private shoot() {
        this.game.shoot(this.x, this.y);
    }

    /*form : HTMLElement;
    private x: number;
    private y: number;
    private board: HTMLElement[][];

    constructor(b: HTMLElement[][]) {
        this.form = document.createElement("div");
        this.x = 1;
        this.y = 1;
        this.board = b;
    }

    makeForm() {
        this.form.innerHTML = 
            '<form>'+
                '<fieldset>'+
                    'X: <input type="text" id="xFormInput" value="1" oninput="selectedCoordsByForm()">'+
                    'Y: <input type="text" id="yFormInput" value="1" oninput="selectedCoordsByForm()">'+
                    '<input id="botonDisparo" type="button" value="Shoot!" onclick="shoot()">'+
                '</fieldset>'+
            '</form>';
    }

    selectedCoordsByForm() {
        this.x = Number((<HTMLInputElement>document.getElementById("xFormInput")).value);
        this.y = Number((<HTMLInputElement>document.getElementById("yFormInput")).value);
		
        return [this.x, this.y];
    }

    shoot() {
        this.board[this.x][this.y].click();
    }*/
}