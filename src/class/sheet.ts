export class Sheet {

    imageElem: HTMLImageElement;
    tileSize: number;
    columns: number;
    rows: number;
    tileIndex: number = 6;
    ratio: number;

    constructor(contener: HTMLElement, tileSize: number) {
        this.imageElem = contener.lastElementChild as HTMLImageElement;
        this.tileSize = tileSize;
        this.columns = this.imageElem.naturalWidth / this.tileSize;
        this.rows = this.imageElem.naturalHeight / this.tileSize;
        this.ratio = this.imageElem.width / this.imageElem.naturalWidth
    }

    registerClickEvent() {
        this.imageElem.addEventListener('click', (e) => {
            // console.log(`${Math.floor(e.offsetY / this.tileSize / this.ratio)} x ${this.columns} =  ${Math.floor(e.offsetY / this.tileSize / this.ratio) * this.columns} : ${Math.floor(e.offsetX / this.tileSize / this.ratio}`);
            this.tileIndex = Math.floor(e.offsetY / this.tileSize / this.ratio) * this.columns + Math.floor(e.offsetX / this.tileSize / this.ratio)
            console.log(this.tileIndex);

        })
    }
}