import { BoardCell } from "./boardCell";

export class UserInterface {
    private positionsContainer: HTMLDivElement;
    private boardPositions: BoardCell[][];
    private selectedRow: number = 0;
    private selectedColumn: number = 0;
    private shootHandler: (x: number, y: number) => any;

    constructor(positions: BoardCell[][], shotCallback: (x: number, y: number) => any) {
        this.positionsContainer = document.createElement('div');
        document.body.append(this.positionsContainer);
              
        this.shootHandler = shotCallback;
        this.boardPositions = positions;

        this.renderBoard(positions, shotCallback);
        this.renderForm();
    }

    private renderBoard(positions: BoardCell[][], shotCallback: (x: number, y: number) => any) {
        this.positionsContainer.innerHTML = "";

        positions.map((row, x) => 
            row.map((cell, y) => 
                boardCellElement(cell, () => shotCallback(x, y))
            )
        )
        .forEach(row => {
            const rowContainer = document.createElement('div');
            rowContainer.style.height = row[0].style.height;
            rowContainer.append(...row);
            this.positionsContainer.appendChild(rowContainer);
        });
    }   

    private renderForm() {
        const rowSelectionInput = document.createElement('input');
        const columnselectionInput = document.createElement('input');

        rowSelectionInput.oninput = e => 
            this.selectedRow = parseInt((e.target as HTMLInputElement).value);

        columnselectionInput.oninput = e => 
            this.selectedRow = parseInt((e.target as HTMLInputElement).value);

        const shootButton = document.createElement('button');
        shootButton.innerText = "Dispara!"
        shootButton.onclick = () => {
            this.shootHandler(this.selectedColumn, this.selectedRow);
            this.renderBoard(this.boardPositions, this.shootHandler);
        }

        document.body.append(
            'X:', 
            columnselectionInput, 
            'Y:', 
            rowSelectionInput,
            shootButton)
    }
}

function boardCellElement(cell: BoardCell, onClick: () => void) {
    const cellWidth = "30px";
    const cellHeight = "30px";
    const defaultBg = "white";
    const selectedBg = "yellow";
    const shotBg = cell.isShip ? "red" : "blue";

    const element = document.createElement('div');

    element.style.display = "inline-block";
    element.style.height = cellHeight;
    element.style.width = cellWidth;
    element.style.border = "1px solid gray";
    element.style.backgroundColor = cell.wasShot ? shotBg : defaultBg;

    // no se puede interactuar con la celda si se le ha disparado
    if (!cell.wasShot) {

        element.onmouseenter = () => element.style.backgroundColor = selectedBg;
        element.onmouseleave = () => element.style.backgroundColor = defaultBg;
        
        element.onclick = () => {
            element.style.backgroundColor = shotBg;
            onClick();
            // no se puede interactuar con la celda si se le ha disparado
            element.onmouseenter = null;
            element.onmouseleave = null;
            element.onclick = null;
        }
    }

    return element;
}