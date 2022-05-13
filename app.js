const canvas = document.getElementById("drawing-canvas");
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const strokeThickness = document.querySelector('#size');
const colorBtn = document.querySelector('#color');
const clearBtn = document.querySelector('#clear');
const btnDownload = document.querySelector("#btnDownload");
const btnErase = document.querySelector("#btnErase");

const ctx = canvas.getContext('2d'); 

// drawing stuff with smooth rounded line
let size = 10; 
let isPressed = false;  
let color = 'black';
let x = undefined;
let y = undefined;

canvas.addEventListener('mousedown', function(e) {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener('mouseup', function(e) {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', function(e) {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

// download drawn thing as PNG with transparent background
btnDownload.addEventListener("click", function () {
    // IE/Edge Support (PNG only)
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "canvas-image.png");
    } else { 
        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    }
});

// Lines and Circles are both needed to be able to draw curves
// ====  Drawing Lines ------
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}
// ===== Drawing Circles ----
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2); 
    ctx.fillStyle = color;
    ctx.fill();
}

//================Toolbar============================================================//

// =================Increase / Decrease Buttons / Stroke Width =====================//
// ======= Increase Button =====================
increaseBtn.addEventListener('click', function() {
    size += 1;

    if (size > 50) {
        size = 50;
    }
    updateSize();
});

// ======= Decrease Button =====================
decreaseBtn.addEventListener('click', function() {
    size -= 1;

    if (size < 1) {
        size = 1;
    }
    updateSize();
});

// Updating the Stroke Width Dynamically
function updateSize() {
    strokeThickness.innerText = size;
}

// ============ Stroke Color =======================================================//
colorBtn.addEventListener('change', function(e){
    color = e.target.value;
});

// ===============Erase Color ===============================//
// const erase = () => context.globalCompositeOperation = 'destination-out';

// btnErase.addEventListener('click', erase);


// = ==========Clear Button ========================================================//
clearBtn.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// --------------------End Toolbar --------------------------------------------------//




