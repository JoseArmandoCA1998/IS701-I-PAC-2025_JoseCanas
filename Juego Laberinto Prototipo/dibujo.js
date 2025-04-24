let colorRelleno = "#ff0000";
let spriteBase64 = null;
let sketchJuego;

const sketchDibujo = (p) => {
  let paths = [];
  let currentPath = [];
  let isDrawing = false;

  p.setup = function() {
    let canvas = p.createCanvas(280, 280);
    canvas.parent('canvas-container');
    p.background(255);
    canvas.elt.style.touchAction = 'none'; // Para dispositivos táctiles

    p.select('#colorPicker').input(() => {
      colorRelleno = p.select('#colorPicker').value();
    });
  };

  p.draw = function() {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(colorRelleno);

    for (let path of paths) {
      p.beginShape();
      for (let pt of path) {
        p.vertex(pt.x, pt.y);
      }
      p.endShape(p.CLOSE);
    }
  };

  p.mousePressed = function() {
    if (p.mouseY <= p.height) {
      isDrawing = true;
      currentPath = [];
      paths.push(currentPath);
    }
  };

  p.mouseReleased = function() {
    isDrawing = false;
  };

  p.mouseDragged = function() {
    if (isDrawing) {
      currentPath.push({ x: p.mouseX, y: p.mouseY });
    }
  };

  window.clearCanvas = function() {
    paths = [];
    p.background(255);
  };

  window.undoLast = function() {
    paths.pop();
    p.background(255);
  };

  window.enviarDibujo = function() {
    if (paths.length === 0) {
      alert("¡Dibuja algo primero!");
      return;
    }

    document.getElementById('modo-dibujo').style.display = 'none';
    document.getElementById('modo-juego').style.display = 'flex';

    const canvasElement = document.querySelector('#canvas-container canvas');
    const imagenBase64 = canvasElement.toDataURL('image/png');

    if (sketchJuego && sketchJuego.remove) {
      sketchJuego.remove();
    }

    fetch('https://ad2c-34-90-232-12.ngrok-free.app/procesar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        imagen: imagenBase64,
        color: document.getElementById("colorPicker").value
      })
    })
    .then(res => res.json())
    .then(data => {
      spriteBase64 = data.imagen_sprite;
      iniciarJuego(spriteBase64);
    })
    .catch(err => {
      console.error("Error al procesar el dibujo:", err);
      reiniciarTodo();
    });
  };

  window.reiniciarTodo = function() {
    document.getElementById('modo-dibujo').style.display = 'flex';
    document.getElementById('modo-juego').style.display = 'none';
    document.getElementById("ganaste").classList.add("hidden");
    clearCanvas();
    
    if (sketchJuego && sketchJuego.remove) {
      sketchJuego.remove();
    }
    sketchJuego = null;
  };
};

new p5(sketchDibujo, 'canvas-container');