export class Sheet {
    imageElem;
    tileSize;
    columns;
    rows;
    tileIndex = 6;
    ratio;
    constructor(contener, tileSize) {
        this.imageElem = contener.lastElementChild;
        this.tileSize = tileSize;
        this.columns = this.imageElem.naturalWidth / this.tileSize;
        this.rows = this.imageElem.naturalHeight / this.tileSize;
        this.ratio = this.imageElem.width / this.imageElem.naturalWidth;
    }
    registerClickEvent() {
        this.imageElem.addEventListener('click', (e) => {
            this.tileIndex = Math.floor(e.offsetY / this.tileSize / this.ratio) * this.columns + Math.floor(e.offsetX / this.tileSize / this.ratio);
            console.log(this.tileIndex);
        });
    }
}
