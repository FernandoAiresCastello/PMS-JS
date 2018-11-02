
var Canvas = null;
var BodyColor = '#000';
var BackColor = '#fff';
var GridColor = '#000';
var GridStyle = [3];
var CanvasWidth = 640;
var CanvasHeight = 480;
var Cols = 20;
var Rows = 20;
var TilePxCountX = 8;
var TilePxCountY = 8;
var TilePxCount = TilePxCountX * TilePxCountY;
var GridTileWidth = CanvasWidth / Cols;
var GridTileHeight = CanvasHeight / Rows;
var TilePxWidth = GridTileWidth / TilePxCountX;
var TilePxHeight = GridTileHeight / TilePxCountY;

function InitSys() {
    Canvas = document.getElementById('canvas').getContext('2d');
    Canvas.canvas.width = CanvasWidth;
    Canvas.canvas.height = CanvasHeight;
    Canvas.imageSmoothingEnabled = false;

    Canvas.canvas.addEventListener('click', (e) => {
        CanvasClicked(e.layerX, e.layerY);
    });

    SetBodyColor(BodyColor);
    Cls(BackColor);
}

function SetBodyColor(color) {
    document.body.style.backgroundColor = color;
}

function Cls(color) {
    Canvas.fillStyle = color;
    Canvas.fillRect(0, 0, CanvasWidth, CanvasHeight);
}

function DrawGrid() {
    Canvas.strokeStyle = GridColor;
    Canvas.lineWidth = 0.1;
    Canvas.setLineDash(GridStyle)
    Canvas.beginPath();
    for (let x = 0, y = 0; x < CanvasWidth; x += GridTileWidth) {
        Canvas.moveTo(x, y);
        Canvas.lineTo(x, y + CanvasHeight);
    }
    for (let x = 0, y = 0; y < CanvasHeight; y += GridTileHeight) {
        Canvas.moveTo(x, y);
        Canvas.lineTo(x + CanvasWidth, y);
    }
    Canvas.stroke();
}

function FillGridTile(x, y, color) {
    Canvas.strokeStyle = '';
    Canvas.fillStyle = color;
    Canvas.fillRect(x * GridTileWidth, y * GridTileHeight, GridTileWidth, GridTileHeight);
}

function DrawPixel(x, y, color) {
    if (color != null) {
        Canvas.strokeStyle = '';
        Canvas.fillStyle = color;
        Canvas.fillRect(x * TilePxWidth, y * TilePxHeight, TilePxWidth, TilePxHeight);
    }
}

function DrawTile(x, y, fgc, bgc, pixels) {
    x *= TilePxCountX;
    y *= TilePxCountY;
    let px = x;
    let py = y;
    for (let i = 0; i < TilePxCount; i++) {
        DrawPixel(px, py, (pixels[i] == '1') ? fgc : (pixels[i] == '0') ? bgc : null);
        if (++px >= x + TilePxCountX) {
            px = x;
            py++;
        }
    }
}

function CanvasClicked(x, y) {
    console.log(x + "," + y);
}

function Main() {
    InitSys();

    const tile = 
        '10101010'+
        '01010101'+
        '10101010'+
        '01010101'+
        '10101010'+
        '01010101'+
        '10101010'+
        '01010101';
    const tile1 = 
        '00111100'+
        '01000010'+
        '10100101'+
        '10000001'+
        '10100101'+
        '10011001'+
        '01000010'+
        '00111100';

    DrawTile(0, 0, '#f00', '#ff0', tile1);
    DrawTile(1, 1, '#00f', '#f0f', tile1);
    DrawTile(2, 1, '#0f0', '#0ff', tile1);

    DrawGrid();
}
