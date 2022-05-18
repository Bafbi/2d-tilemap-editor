import { Display } from "./class/display.js";
import { Map } from "./class/map.js";
import { Sheet } from "./class/sheet.js";

import baseLevel from "./map.js";

const tilesheetElem = document.getElementById('tilesheet') as HTMLElement;
const spritesheetElem = document.getElementById('spritesheet') as HTMLElement;
const canvasElem = document.getElementById('editor') as HTMLCanvasElement;
const newMapForm = document.getElementById('newMap') as HTMLElement;

const tileSheet = new Sheet(tilesheetElem, 16);
const spriteSheet = new Sheet(spritesheetElem, 16);

const map = new Map(baseLevel);

const editor = new Display(canvasElem);

function render() {
    editor.drawLayer(map.tile, map.width, tileSheet)
    editor.drawLayer(map.sprite, map.width, spriteSheet)
    editor.camera.update(editor.context.canvas.width, editor.context.canvas.height)
    editor.render();
}

tileSheet.registerClickEvent();
spriteSheet.registerClickEvent();

newMapForm.lastElementChild?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log((newMapForm.children.namedItem('width') as HTMLInputElement)?.value);

    const width = (newMapForm.children.namedItem('width') as HTMLInputElement)?.value;
    const height = (newMapForm.children.namedItem('height') as HTMLInputElement)?.value;
});

window.addEventListener('resize', (e) => {
    editor.resizeContext(document.documentElement.clientWidth - tilesheetElem.clientWidth, document.documentElement.clientHeight)
    editor.render();
});

canvasElem.addEventListener('mousemove', (e) => {
    const offY = e.offsetY + editor.camera.pos1.y * editor.ratio;
    const offX = e.offsetX + editor.camera.pos1.x * editor.ratio;
    console.log(editor.camera.pos1);

    console.log(`x = ${offX}, y = ${offY}`);
    const tileIndex = Math.floor((e.offsetY - editor.camera.pos1.y) / tileSheet.tileSize / editor.ratio) * map.width + Math.floor((e.offsetX - editor.camera.pos1.x) / tileSheet.tileSize / editor.ratio)
    console.log(editor.ratio);

})

//#region Camera //
window.addEventListener("wheel", (event) => {
    console.log(event.deltaY * 0.01);

    editor.camera.zoom += event.deltaY * 0.02;
    render();
});

let mouseDown = false;

canvasElem.addEventListener("mousedown", () => {
    mouseDown = true;
});
window.addEventListener("mousemove", (event) => {
    if (mouseDown) {
        editor.camera.posC.x += event.movementX * -0.39;
        editor.camera.posC.y += event.movementY * -0.39;
        render();
    }
});
window.addEventListener("mouseup", () => {
    mouseDown = false;
});
//#endregion

editor.camera.posC.set(map.width * tileSheet.tileSize, map.height * tileSheet.tileSize);
editor.resizeContext(document.documentElement.clientWidth - tilesheetElem.clientWidth, document.documentElement.clientHeight)
editor.resizeBuffer(map.width, map.height, tileSheet.tileSize);
render();



