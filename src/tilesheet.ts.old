import { Display } from "./display.js";

export class SheetWindow extends Display {

    imageSheet: HTMLImageElement = new Image();
    column: number;
    row: number;
    tileSize: number;

    constructor(canvasElem: HTMLCanvasElement) {
        super(canvasElem)
        this.column = 5;
        this.row = 5;
        this.tileSize = 16;
    }

    resize() {
        this.buffer.canvas.width = this.column * this.tileSize;
        this.buffer.canvas.height = this.row * this.tileSize
        this.context.canvas.width = this.context.canvas.height * (this.buffer.canvas.width / this.buffer.canvas.height)
        this.context.imageSmoothingEnabled = false;
        this.render();
    }

    reload() {
        console.log(this);
        this.resize();
        this.drawSheet();
        this.render();
    }

    drawSheet() {
        this.buffer.drawImage(this.imageSheet, 0, 0, this.column * this.tileSize, this.row * this.tileSize, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        this.drawGrid('black')
    }

    drawGrid(color: string | CanvasGradient | CanvasPattern) {
        this.buffer.fillStyle = color;
        for (let columns = 0; columns < this.column - 1; columns++) {
            this.buffer.fillRect(
                (columns + 1) * this.tileSize - 1,
                0,
                1,
                this.row * this.tileSize
            );
        }
        for (let rows = 0; rows < this.row - 1; rows++) {
            this.buffer.fillRect(
                0,
                (rows + 1) * this.tileSize - 1,
                this.column * this.tileSize,
                1
            );
        }
    }
}