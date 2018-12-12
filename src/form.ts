import { Board } from "./board";

export class Form {
    form: HTMLElement;
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
    }
    
}