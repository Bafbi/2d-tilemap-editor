export class Display {

    context: CanvasRenderingContext2D;
    buffer: CanvasRenderingContext2D;

    constructor(canvasElem: HTMLCanvasElement) {
        this.context = canvasElem.getContext("2d") as CanvasRenderingContext2D;
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

    render() {
        this.clear('CONTEXT');
        this.context.drawImage(
            this.buffer.canvas,
            0,
            0,
            this.buffer.canvas.width,
            this.buffer.canvas.height,
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        );
    }
}

type CANVAS = "CONTEXT" | "BUFFER"