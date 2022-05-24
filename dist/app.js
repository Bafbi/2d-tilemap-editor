import { Display } from "./class/display.js";
import { Map } from "./class/map.js";
import { Sheet } from "./class/sheet.js";
import baseLevel from "./map.js";
const tilesheetElem = document.getElementById('tilesheet');
const spritesheetElem = document.getElementById('spritesheet');
const canvasElem = document.getElementById('editor');
const newMapForm = document.getElementById('newMap');
const tileSheet = new Sheet(tilesheetElem, 16);
const spriteSheet = new Sheet(spritesheetElem, 16);
const map = new Map(baseLevel);
const editor = new Display(canvasElem);
function render() {
    editor.fill('BUFFER', 'pink');
    editor.drawLayer(map.tile, map.width, tileSheet);
    editor.drawLayer(map.sprite, map.width, spriteSheet);
    editor.drawRectangle(editor.tileIndex.x * tileSheet.tileSize, editor.tileIndex.y * tileSheet.tileSize, tileSheet.tileSize, tileSheet.tileSize, "rgba(0, 0, 0, 0.6)");
    editor.camera.update(editor.context.canvas.width, editor.context.canvas.height);
    editor.render();
    editor.drawGrid(map.width, map.height, tileSheet.tileSize);
}
tileSheet.registerClickEvent();
spriteSheet.registerClickEvent();
newMapForm.lastElementChild?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(newMapForm.children.namedItem('width')?.value);
    const width = newMapForm.children.namedItem('width')?.value;
    const height = newMapForm.children.namedItem('height')?.value;
});
window.addEventListener('resize', (e) => {
    editor.resizeContext(document.documentElement.clientWidth - tilesheetElem.clientWidth, document.documentElement.clientHeight);
    editor.render();
});
canvasElem.addEventListener('mousemove', (e) => {
    const offX = e.offsetX * (editor.camera.pos2.x / editor.context.canvas.width) + editor.camera.pos1.x;
    const offY = e.offsetY * (editor.camera.pos2.y / editor.context.canvas.height) + editor.camera.pos1.y;
    editor.tileIndex.set(Math.floor(offX / tileSheet.tileSize), Math.floor(offY / tileSheet.tileSize));
    render();
});
window.addEventListener("wheel", (event) => {
    editor.camera.zoom += event.deltaY * 0.02 * editor.camera.zoom / 100;
    render();
});
let mouseDown = false;
let button;
canvasElem.addEventListener("mousedown", (e) => {
    button = e.button;
    mouseDown = true;
});
window.addEventListener("mousemove", (event) => {
    if (mouseDown && button == 1) {
        editor.camera.posC.x += event.movementX * -0.39 * editor.camera.zoom / 50;
        editor.camera.posC.y += event.movementY * -0.39 * editor.camera.zoom / 50;
    }
    if (mouseDown && button == 0 && editor.tileIndex.y < map.height && editor.tileIndex.x < map.width) {
        map.tile[editor.tileIndex.y * map.width + editor.tileIndex.x] = tileSheet.tileIndex;
    }
    render();
});
window.addEventListener("mouseup", () => {
    mouseDown = false;
    if (button == 0 && editor.tileIndex.y < map.height && editor.tileIndex.x < map.width) {
        map.tile[editor.tileIndex.y * map.width + editor.tileIndex.x] = tileSheet.tileIndex;
    }
    render();
});
editor.camera.posC.set(map.width * tileSheet.tileSize, map.height * tileSheet.tileSize);
editor.resizeContext(document.documentElement.clientWidth - tilesheetElem.clientWidth, document.documentElement.clientHeight);
editor.resizeBuffer(map.width, map.height, tileSheet.tileSize);
render();
