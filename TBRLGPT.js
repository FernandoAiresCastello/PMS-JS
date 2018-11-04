/*=============================================================================

    TBRLGPT .js
    Tile-Based Retro-Looking Game Project Template
    2018 Developed by Fernando Aires Castello

=============================================================================*/
const BackColor = '#fff';
const BorderColor = '#000';
const GridColor = '#000';
const GridStyle = [3];
const ScreenWidth = 256;
const ScreenHeight = 192;
const ScreenZoom = 3;
const ScreenCols = 32;
const ScreenRows = 24;
const TilePxCountX = 8;
const TilePxCountY = 8;
const CanvasWidth = ScreenZoom * ScreenWidth;
const CanvasHeight = ScreenZoom * ScreenHeight;
const TilePxCount = TilePxCountX * TilePxCountY;
const GridTileWidth = CanvasWidth / ScreenCols;
const GridTileHeight = CanvasHeight / ScreenRows;
const TilePxWidth = GridTileWidth / TilePxCountX;
const TilePxHeight = GridTileHeight / TilePxCountY;
const Canvas = document.getElementById('canvas').getContext('2d');

function InitGraphics() {
    document.body.style.backgroundColor = BorderColor;
    Canvas.canvas.width = CanvasWidth;
    Canvas.canvas.height = CanvasHeight;
    Canvas.imageSmoothingEnabled = false;
    Canvas.canvas.addEventListener('click', (e) => {
        CanvasClicked(e.layerX, e.layerY);
    });
    Cls();
}

function Cls() {
    Canvas.fillStyle = BackColor;
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
    
    InitGraphics();

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
