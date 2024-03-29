/*=============================================================================

    PMS.js
    Pixel Manipulation Sample in Javascript
    2018 Developed by Fernando Aires Castello

=============================================================================*/
const BackColor = '#000';
const BorderColor = '#222';
const GridColor = 'rgba(255,255,255,0.2)';
const GridEnabled = false;
const GridStyle = [3];
const ScreenWidth = 336;
const ScreenHeight = 152;
const ScreenZoom = 4;
const TilePxCountX = 8;
const TilePxCountY = 8;
const ScreenCols = ScreenWidth / TilePxCountX;
const ScreenRows = ScreenHeight/ TilePxCountY;
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
	if (!GridEnabled)
		return;
	
    Canvas.strokeStyle = GridColor;
    Canvas.lineWidth = 1;
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

    const tile2 = 
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
    DrawTile(1, 1, '#00f', '#f0f', tile2);
    DrawTile(2, 1, '#0f0', '#fff', tile1);

    DrawGrid();
}
