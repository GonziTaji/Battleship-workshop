import { Cell } from "./boardCell";
import { gameConfig } from "./gameConfig";
import { Point } from "./types";

export class UserInterface {
    private positionsContainer: HTMLDivElement;
    private boardPositions: HTMLDivElement[][];
    private selectedRow: number = 0;
    private selectedColumn: number = 0;

    private rowSelectionInput: HTMLInputElement;
    private columnSelectionInput: HTMLInputElement;

    private get selectedCell() {
        return this.boardPositions[this.selectedRow][this.selectedColumn];
    }

    constructor(positions: Cell[][], shotCallback: (p: Point) => any) {
        this.positionsContainer = document.createElement('div');
        document.body.append(this.positionsContainer);
        
        this.renderBoard(positions, shotCallback);
        this.renderForm();
        
        document.onkeydown = this.handleKeyboardInput.bind(this);
    }

    private renderBoard(positions: Cell[][], shotCallback: (p: Point) => any) {
        this.positionsContainer.innerHTML = "";
        this.boardPositions = [];

        positions.map((row, x) => 
            row.map((cell, y) => 
                this.createBoardCellElement(cell, () => shotCallback({ x, y }))
            )
        )
        .forEach(row => {
            const rowContainer = document.createElement('div');
            
            rowContainer.style.height = row[0].style.height;
            rowContainer.append(...row);

            this.boardPositions.push(row);
            this.positionsContainer.appendChild(rowContainer);
        });
    }

    private renderForm() {
        this.rowSelectionInput = document.createElement('input');
        this.columnSelectionInput = document.createElement('input');
        
        this.rowSelectionInput.type = "number";
        this.columnSelectionInput.type = "number";
        this.rowSelectionInput.max = gameConfig.board.rows.toString();
        this.columnSelectionInput.max = gameConfig.board.columns.toString();
        this.rowSelectionInput.min = "0";
        this.columnSelectionInput.min = "0";
        this.rowSelectionInput.value = "0";
        this.columnSelectionInput.value = "0";

        this.rowSelectionInput.oninput = _ => 
            this.onSelectedRowChanged(this.rowSelectionInput.value);

        this.columnSelectionInput.oninput = _ =>
            this.onSelectedColumnChanged(this.columnSelectionInput.value);

        const shootButton = document.createElement('button');
        shootButton.innerText = "Dispara!"
        shootButton.onclick = () => this.selectedCell.click();

        document.body.append(
            'X:', this.columnSelectionInput, 
            'Y:', this.rowSelectionInput, 
            shootButton);
    }

    private handleKeyboardInput(e: KeyboardEvent) {
        let value: string;
        switch (e.key) {
            case "ArrowRight":
                value = (this.selectedColumn + 1).toString();
                this.columnSelectionInput.value = value.toString();
                this.onSelectedColumnChanged(value.toString());
                break;
            case "ArrowLeft":
                value = (this.selectedColumn - 1).toString();
                this.columnSelectionInput.value = value.toString();
                this.onSelectedColumnChanged(value.toString());
                break;
            case "ArrowDown":
                value = (this.selectedRow + 1).toString();
                this.rowSelectionInput.value = value.toString();
                this.onSelectedRowChanged(value.toString());
                break;
            case "ArrowUp":
                value = (this.selectedRow - 1).toString();
                this.rowSelectionInput.value = value.toString();
                this.onSelectedRowChanged(value.toString());
                break;
            case "Enter":
                this.selectedCell.click();
                break;
        }
    }

    private onSelectedRowChanged(value: string) {
        this.selectFromForm(true);

        const parsedValue = parseInt(value);
        
        if (!isNaN(parsedValue) && 
            parsedValue >= 0 &&
            parsedValue < gameConfig.board.rows)
        {
            this.selectedRow = parsedValue;
            this.selectFromForm();
        }
    }

    private onSelectedColumnChanged(value: string) {
        console.log("e");
        this.selectFromForm(true);
        
        const parsedValue = parseInt(value);
        
        if (!isNaN(parsedValue) && 
            parsedValue >= 0 && 
            parsedValue < gameConfig.board.columns) 
        {
            this.selectedColumn = parsedValue;
            this.selectFromForm();
        }
    }

    private selectFromForm(reverse: boolean = false) {
        const eventName = reverse ? 'mouseleave' : 'mouseenter'

        this.selectedCell.dispatchEvent(new Event(eventName));
    }

    private createBoardCellElement(cell: Cell, onClick: () => void) {
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
                onClick();
                // no se puede interactuar con la celda si se le ha disparado
                element.style.backgroundColor = shotBg;
                element.onmouseenter = null;
                element.onmouseleave = null;
                element.onclick = null;
            }
        }

        return element;
    }
}