import { Camera } from "./camera.js";
export class Display {
    context;
    buffer;
    camera = new Camera();
    ratio = 1;
    constructor(canvasElem) {
        this.context = canvasElem.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.buffer = document.createElement("canvas").getContext("2d");
    }
    fill(where, color) {
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
    clear(where) {
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
    drawLayer(layer, width, sheet) {
        layer.forEach((value, index) => {
            if (value < 0) {
                return;
            }
            const source_x = (value % sheet.columns) * sheet.tileSize;
            const source_y = Math.floor(value / sheet.columns) *
                sheet.tileSize;
            const destination_x = (index % width) * sheet.tileSize;
            const destination_y = Math.floor(index / width) * sheet.tileSize;
            this.buffer.drawImage(sheet.imageElem, source_x, source_y, sheet.tileSize, sheet.tileSize, destination_x, destination_y, sheet.tileSize, sheet.tileSize);
        });
    }
    render() {
        this.fill('CONTEXT', 'black');
        this.context.drawImage(this.buffer.canvas, this.camera.pos1.x, this.camera.pos1.y, this.camera.pos2.x, this.camera.pos2.y, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    updateRatio() {
        this.ratio = this.context.canvas.width / this.buffer.canvas.width;
    }
    resizeBuffer(mapWidth, mapHeight, tileSize) {
        this.buffer.canvas.width = mapWidth * tileSize;
        this.buffer.canvas.height = mapHeight * tileSize;
        this.updateRatio();
    }
    resizeContext(width, height) {
        this.context.canvas.width = width;
        this.context.canvas.height = height;
        this.context.imageSmoothingEnabled = false;
        this.camera.update(width, height);
        this.updateRatio();
    }
}
