import { Display } from "./display.js";
import { SheetWindow } from "./tilesheet.js";
const editorCanvas = document.getElementById('editor');
const editor = new Display(editorCanvas);
const tileSheetCanvas = document.getElementById('tileSheet');
const tileSheet = new SheetWindow(tileSheetCanvas);
const objectSheetCanvas = document.getElementById('objectSheet');
const objectSheet = new SheetWindow(objectSheetCanvas);
let move = 0;
function moveCanvasWindow(e, canvasWindow, clickDown) {
    if (clickDown) {
        e.preventDefault();
        move += e.movementY;
        let match = canvasWindow.style.left.match(/\d+/);
        const offsetX = Number(match ? match[0] : 0);
        match = canvasWindow.style.top.match(/\d+/);
        const offsetY = Number(match ? match[0] : 0);
        canvasWindow.style.left = (offsetX + e.movementX) + 'px';
        canvasWindow.style.top = (offsetY + e.movementY) + 'px';
    }
}
function sheetLoader(e, win) {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer?.files.length == undefined || e.dataTransfer?.files.length > 1) {
        console.warn('Wrong format');
        return;
    }
    const file = e.dataTransfer?.files.item(0);
    if (file?.type != 'image/png') {
        console.warn('Wrong format');
        return;
    }
    var fr = new FileReader();
    fr.onload = () => {
        if (fr.result == null)
            return;
        win.imageSheet.src = fr.result;
        win.reload();
    };
    fr.readAsDataURL(file);
}
tileSheetCanvas.addEventListener('drop', (e) => {
    sheetLoader(e, tileSheet);
});
tileSheetCanvas.addEventListener('drop', (e) => {
    sheetLoader(e, tileSheet);
});
const canvasWindows = document.getElementsByClassName('canvasWindow');
[].forEach.call(canvasWindows, (canvasWindow) => {
    canvasWindow.addEventListener("dragover", (e) => {
        console.log('aa');
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = 'copy';
    });
    let clickDown = false;
    canvasWindow.firstElementChild?.addEventListener("mousedown", (e) => {
        canvasWindow.style.zIndex = '2';
        clickDown = true;
    });
    window.addEventListener("mousemove", (e) => moveCanvasWindow(e, canvasWindow, clickDown));
    window.addEventListener("mouseup", () => {
        canvasWindow.style.zIndex = '1';
        clickDown = false;
    });
});
editor.render();
