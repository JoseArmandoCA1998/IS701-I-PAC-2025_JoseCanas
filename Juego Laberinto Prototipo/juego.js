function iniciarJuego(spriteBase64) {
  sketchJuego = new p5((p) => {
    const cols = 25;
    const rows = 25;
    let tileSize;
    let maze = [];
    let player = { x: 1, y: 1, px: 1, py: 1 };
    let spriteImg;
    let ganaste = false;
    let enemigos = [];
    const numEnemigos = 6;
    const margenHorizontal = 3;
    let keys = {};
    let lastMoveTime = 0;
    let moveDelay = 100; // ms entre movimientos
    let sonidoFondo, sonidoSalto;

    p.preload = function() {
      sonidoFondo = document.getElementById('fondo');
      sonidoSalto = document.getElementById('salto');
    };

    p.setup = function() {
      tileSize = Math.floor(Math.min(window.innerWidth, window.innerHeight * 0.9) / cols);
      let canvas = p.createCanvas(cols * tileSize, rows * tileSize);
      canvas.parent('juego-container');
      canvas.elt.tabIndex = 0;
      canvas.elt.focus();
      generarNuevoLaberinto();
      spriteImg = p.loadImage(spriteBase64);
      crearEnemigos();
      
      // Iniciar música de fondo
      sonidoFondo.volume = 0.3;
      sonidoFondo.play();
    };

    function generarNuevoLaberinto() {
      maze = generarLaberinto(cols, rows);
      player = { x: 1, y: 1, px: 1, py: 1 };
      ganaste = false;
      document.getElementById("ganaste").classList.add("hidden");
      crearEnemigos();
    }

    function crearEnemigos() {
      enemigos = [];
      const filasDisponibles = Array.from({length: rows-4}, (_, i) => i + 2);
      
      for (let i = 0; i < numEnemigos; i++) {
        const fila = p.random(filasDisponibles);
        const limiteIzquierdo = margenHorizontal;
        const limiteDerecho = cols - margenHorizontal - 1;
        
        enemigos.push({
          x: p.random(limiteIzquierdo, limiteDerecho),
          y: fila,
          velocidad: p.random(0.5, 2),
          direccion: p.random() > 0.5 ? 1 : -1,
          limiteIzquierdo: limiteIzquierdo,
          limiteDerecho: limiteDerecho
        });
      }
    }

    p.draw = function() {
      if (!spriteImg || !maze.length) return;
      p.background(255);

      // Dibujar laberinto
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (maze[y][x] === 1) {
            p.fill(0);
            p.noStroke();
            p.rect(x * tileSize, y * tileSize, tileSize, tileSize);
          } else if (maze[y][x] === 9) {
            p.fill(230);
            p.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            p.fill(255, 215, 0);
            p.ellipse(x * tileSize + tileSize/2, y * tileSize + tileSize/2, tileSize*0.4);
          }
        }
      }

      // Actualizar y dibujar enemigos
      for (let enemigo of enemigos) {
        enemigo.x += enemigo.velocidad * 0.1 * enemigo.direccion;
        
        if (enemigo.x > enemigo.limiteDerecho) {
          enemigo.x = enemigo.limiteDerecho;
          enemigo.direccion = -1;
        } else if (enemigo.x < enemigo.limiteIzquierdo) {
          enemigo.x = enemigo.limiteIzquierdo;
          enemigo.direccion = 1;
        }

        p.fill(255, 0, 0);
        p.ellipse(
          enemigo.x * tileSize + tileSize/2,
          enemigo.y * tileSize + tileSize/2,
          tileSize*0.8
        );

        if (distancia(player.x, player.y, enemigo.x, enemigo.y) < 0.8) {
          generarNuevoLaberinto();
          return;
        }
      }

      // Movimiento continuo del jugador
      if (p.millis() - lastMoveTime > moveDelay) {
        moverJugador();
        lastMoveTime = p.millis();
      }

      // Dibujar jugador
      player.px = p.lerp(player.px, player.x, 0.2);
      player.py = p.lerp(player.py, player.y, 0.2);
      p.image(spriteImg, player.px * tileSize, player.py * tileSize, tileSize, tileSize);

      if (maze[player.y][player.x] === 9 && !ganaste) {
        document.getElementById("ganaste").classList.remove("hidden");
        ganaste = true;
      }
    };

    function moverJugador() {
      if (ganaste) return;
      
      let moved = false;
      let nx = player.x;
      let ny = player.y;

      if (keys[p.LEFT_ARROW] || keys[37]) { nx--; moved = true; }
      if (keys[p.RIGHT_ARROW] || keys[39]) { nx++; moved = true; }
      if (keys[p.UP_ARROW] || keys[38]) { ny--; moved = true; }
      if (keys[p.DOWN_ARROW] || keys[40]) { ny++; moved = true; }

      if (moved && maze[ny] && maze[ny][nx] !== 1) {
        player.x = nx;
        player.y = ny;
        sonidoSalto.currentTime = 0;
        sonidoSalto.play();
      }
    }

    function distancia(x1, y1, x2, y2) {
      return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    }

    p.keyPressed = function(event) {
      keys[event.keyCode] = true;
      
      // Prevenir comportamiento por defecto de las teclas de dirección
      if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
      }
      
      return false;
    };

    p.keyReleased = function(event) {
      keys[event.keyCode] = false;
      return false;
    };

    function generarLaberinto(cols, rows) {
      const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
      const visitado = Array.from({ length: rows }, () => Array(cols).fill(false));

      function dfs(x, y) {
        const dirs = [[2,0], [-2,0], [0,2], [0,-2]];
        p.shuffle(dirs, true);
        visitado[y][x] = true;
        maze[y][x] = 0;

        for (let [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx > 0 && ny > 0 && nx < cols-1 && ny < rows-1 && !visitado[ny][nx]) {
            maze[y + dy/2][x + dx/2] = 0;
            dfs(nx, ny);
          }
        }
      }

      dfs(1, 1);
      maze[rows-2][cols-2] = 9;
      return maze;
    }

    window.nuevoLaberinto = function() {
      generarNuevoLaberinto();
      document.getElementById('juego-container').querySelector('canvas').focus();
    };

    // Ajustar tamaño al cambiar ventana
    window.addEventListener('resize', () => {
      tileSize = Math.floor(Math.min(window.innerWidth, window.innerHeight * 0.9) / cols);
      p.resizeCanvas(cols * tileSize, rows * tileSize);
    });
  }, 'juego-container');
}