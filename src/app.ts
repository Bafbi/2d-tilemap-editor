import { Display } from "./class/display.js";
import { Map } from "./class/map.js";
import { Sheet } from "./class/sheet.js";

import baseLevel from "./map.js";


// #region url
let lvl = JSON.stringify(baseLevel);

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("map-data")) {
    lvl = decodeURI(urlParams.get("map-data") as string);
}
// #endregion

const tilesheetElem = document.getElementById('tilesheet') as HTMLOListElement;
const canvasElem = document.getElementById('editor') as HTMLCanvasElement;
const newMapForm = document.getElementById('newMap') as HTMLElement;
const downloadElem = document.getElementById('download') as HTMLLinkElement;

const tileSheet = new Sheet(tilesheetElem, 16);
const map = new Map(JSON.parse(lvl));
const editor = new Display(canvasElem);

tileSheet.addTile('./assets/path.png', -3);
tileSheet.addTile('./assets/ice.png', -1);
tileSheet.addTile('./assets/wall.png', -2);
tileSheet.addTile('./assets/rock.png', 0);
tileSheet.addTile('./assets/point_up.png', 1);
tileSheet.addTile('./assets/point_right.png', 2);
tileSheet.addTile('./assets/point_down.png', 3);
tileSheet.addTile('./assets/point_left.png', 4);
tileSheet.addTile('./assets/breaking.png', 5);
tileSheet.addTile('./assets/breaked.png', 6);



function render() {
    editor.fill('BUFFER', 'pink');
    editor.drawMap(tileSheet, map);
    editor.drawRectangle(editor.tileIndex.x * tileSheet.tileSize, editor.tileIndex.y * tileSheet.tileSize, tileSheet.tileSize, tileSheet.tileSize, "rgba(0, 0, 0, 0.6)");
    editor.resizeContext(document.documentElement.clientWidth, document.documentElement.clientHeight);
    editor.camera.update(editor.context.canvas.width, editor.context.canvas.height);
    editor.render();
    editor.drawGrid(map.width, map.height, tileSheet.tileSize);
}

tileSheet.registerClickEvent();

newMapForm.lastElementChild?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log((newMapForm.children.namedItem('width') as HTMLInputElement)?.value);

    map.width = Number((newMapForm.children.namedItem('width') as HTMLInputElement)?.value);
    map.height = Number((newMapForm.children.namedItem('height') as HTMLInputElement)?.value);
    editor.resizeBuffer(map.width, map.width, tileSheet.tileSize);
    editor.resizeContext(document.documentElement.clientWidth, document.documentElement.clientHeight);
    render();
});

window.addEventListener('resize', (e) => {
    editor.render();
});

canvasElem.addEventListener('mousemove', (e) => {
    const offX = e.offsetX * (editor.camera.pos2.x / editor.context.canvas.width) + editor.camera.pos1.x;
    const offY = e.offsetY * (editor.camera.pos2.y / editor.context.canvas.height) + editor.camera.pos1.y;

    editor.tileIndex.set(Math.floor(offX / tileSheet.tileSize), Math.floor(offY / tileSheet.tileSize));
    render();
})

//#region Camera //
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
        map.data[editor.tileIndex.y * map.width + editor.tileIndex.x] = tileSheet.tiles[tileSheet.tileIndex].index;
        downloadElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(map));
        downloadElem.setAttribute('download', 'map.json');
    }
    render();

});
window.addEventListener("mouseup", () => {
    mouseDown = false;
    if (button == 0 && editor.tileIndex.y < map.height && editor.tileIndex.y > 0 && editor.tileIndex.x < map.width && editor.tileIndex.x > 0) {
        map.data[editor.tileIndex.y * map.width + editor.tileIndex.x] = tileSheet.tiles[tileSheet.tileIndex].index;
    }
    render();
});
//#endregion

editor.camera.posC.set(map.width * tileSheet.tileSize, map.height * tileSheet.tileSize);
editor.resizeBuffer(map.width, map.height, tileSheet.tileSize);
render();



