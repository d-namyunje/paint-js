const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const clearBtn = document.getElementById('jsClear');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeSytle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let isPainting = false;
let isFilling = false;

function stopPainting() {
    isPainting = false;
}

function startPainting() {
    isPainting = true;

    if (isFilling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!isPainting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (isPainting && !isFilling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } 
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick() {
    if (isFilling) {
        isFilling = false;
        mode.textContent = 'Fill';
    } else {
        isFilling = true;
        mode.textContent = 'Paint';
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu', handleCM);
}

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
}

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}