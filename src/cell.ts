export class Cell {
    cell: HTMLElement;
    isShip: boolean;
    wasClicked: boolean;
    shipfloats: boolean;

    constructor(isShip:boolean) {
        this.isShip = isShip;
        this.wasClicked = false;
        this.cell = document.createElement('button');
        this.cell.style.height = '50px';
        this.cell.style.width = '50px';
        this.cell.onmouseover = () => this.mouseover();
        this.cell.onmouseout = () => this.mouseout();
        this.cell.onclick = () => this.mouseclick();
        this.cell.style.backgroundColor = 'white';

        if (isShip) {
            this.shipfloats = true;
        }
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