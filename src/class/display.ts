import { Camera } from "./camera.js";
import { Map } from "./map.js";
import { Sheet } from "./sheet.js";

export class Display {

    context: CanvasRenderingContext2D;
    buffer: CanvasRenderingContext2D;
    camera: Camera = new Camera();
    ratio: number = 1;

    constructor(canvasElem: HTMLCanvasElement) {
        this.context = canvasElem.getContext("2d") as CanvasRenderingContext2D;
        this.context.imageSmoothingEnabled = false;
        this.buffer = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
    }

    fill(where: CANVAS, color: string | CanvasGradient | CanvasPattern) {
        switch (where) {
            case 'CONTEXT':
                this.context.fillStyle = color;
                this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                break;
            case 'BUFFER':
                this.buffer.fillStyle = color;
                this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
                break;
            default:
                break;
        }
    }
    clear(where: CANVAS) {
        switch (where) {
            case 'CONTEXT':
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                break;
            case 'BUFFER':
                this.buffer.clearRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
                break;
            default:
                break;
        }
    }

    drawLayer(layer: number[], width: number, sheet: Sheet) {
        layer.forEach((value, index) => {
            if (value < 0) {
                return;
            }
            const source_x =
                (value % sheet.columns) * sheet.tileSize;
            const source_y =
                Math.floor(value / sheet.columns) *
                sheet.tileSize;
            const destination_x = (index % width) * sheet.tileSize;
            const destination_y =
                Math.floor(index / width) * sheet.tileSize;

            this.buffer.drawImage(
                sheet.imageElem,
                source_x,
                source_y,
                sheet.tileSize,
                sheet.tileSize,
                destination_x,
                destination_y,
                sheet.tileSize,
                sheet.tileSize
            );
        });
    }


    // drawGrid(tileSize: number, color: string | CanvasGradient | CanvasPattern) {
    //     this.buffer.fillStyle = color;
    //     for (let column = 0; column < this.context; column++) {
    //         const element = array[column];

    //     }
    //     for (let columns = 0; columns < this.; columns++) {
    //         this.buffer.fillRect(
    //             (columns + 1) * this.tileSheet.tileSize - 1,
    //             0,
    //             2,
    //             worldRows * this.tileSheet.tileSize
    //         );
    //     }
    //     for (let rows = 0; rows < worldRows; rows++) {
    //         this.buffer.fillRect(
    //             0,
    //             (rows + 1) * this.tileSheet.tileSize - 1,
    //             worldColumns * this.tileSheet.tileSize,
    //             2
    //         );
    //     }
    // }

    render() {
        // this.clear('CONTEXT');
        this.fill('CONTEXT', 'black')
        this.context.drawImage(
            this.buffer.canvas,
            this.camera.pos1.x,
            this.camera.pos1.y,
            this.camera.pos2.x,
            this.camera.pos2.y,
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        );
    }

    updateRatio() {
        this.ratio = this.context.canvas.width / this.buffer.canvas.width;
    }

    resizeBuffer(mapWidth: number, mapHeight: number, tileSize: number) {
        this.buffer.canvas.width = mapWidth * tileSize;
        this.buffer.canvas.height = mapHeight * tileSize;
        this.updateRatio();
    }

    resizeContext(width: number, height: number) {
        this.context.canvas.width = width;
        this.context.canvas.height = height;
        this.context.imageSmoothingEnabled = false;
        this.camera.update(width, height)
        this.updateRatio();
    }



}

type CANVAS = "CONTEXT" | "BUFFER"