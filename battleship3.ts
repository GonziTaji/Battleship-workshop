var Cell = /** @class */ (function () {
    function Cell() {
        var _this = this;
        this.isShip = false;
        this.wasClicked = false;
        this.cell = document.createElement('button');
        this.cell.style.height = '50';
        this.cell.style.width = '50';
        this.cell.onmouseover = function () { return _this.mouseover(); };
        this.cell.onmouseout = function () { return _this.mouseout(); };
        this.cell.onclick = function () { return _this.mouseclick(); };
        this.cell.style.backgroundColor = 'white';
    }
    Cell.prototype.mouseover = function () {
        if (!this.wasClicked) {
            this.cell.style.backgroundColor = 'green';
        }
    };
    Cell.prototype.mouseout = function () {
        if (!this.wasClicked) {
            this.cell.style.backgroundColor = 'white';
        }
    };
    Cell.prototype.mouseclick = function () {
        this.wasClicked = true;
        if (this.isShip) {
            this.cell.style.backgroundColor = 'grey';
        }
        else {
            this.cell.style.backgroundColor = 'blue';
        }
    };
    return Cell;
}());
var C = new Cell();
document.body.appendChild(C.cell);
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var Board = /** @class */ (function () {
    function Board(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.ship_x = randomIntFromInterval(0, columns - 1);
        this.ship_y = randomIntFromInterval(0, rows - 1);
    }
    Board.prototype.make_board = function () {
        var b = [];
        for (var i = 0; i < this.rows; i++) {
            b.push([]);
        }
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var cell = new Cell;
                b[i].push(cell);
                var x = j + 1;
                var y = i + 1;
                if (x === this.ship_x && y === this.ship_y) {
                    cell.isShip = true;
                }
            }
        }
        this.board = b;
        this.shipfloats = true;
    };
    Board.prototype.print_board = function () {
        var counter = 0;
        for (var _i = 0, _a = this.board; _i < _a.length; _i++) {
            var r = _a[_i];
            for (var _b = 0, r_1 = r; _b < r_1.length; _b++) {
                var c = r_1[_b];
                counter += 1;
                document.body.insertAdjacentElement("afterend");
                c;
                ;
            }
            document.write("<br />");
        }
    };
    return Board;
}());
var board = new Board(5, 8);
board.make_board();
var shipfloats = true;
board.print_board();
