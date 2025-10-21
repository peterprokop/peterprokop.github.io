// Anonymous closure to sandbox my code
void function() {

  // Tells the JS engine to use strict syntax rules
  // e.g. creating variables without var, let or const
  // creates an error in strict mode
  "use strict";
  
  const level = 
`
      ###
      #*#
  ### # #
  #*# # #
  # # # #
###c###c#####
#s         f#
#############
`;

  // console.log(level);
  const blockSize = 20;

  var canvasWidth = 400;
  var canvasHeight = 400;
  var canvas = null;
  var ctx = null;
  var mouse = {x: 0.0, y: 0.0};
  var box = {x: 0.0, y: 0.0, width: blockSize, height: blockSize};
  var boxMoveSpeed = 2.0;
  
  // Called whenever the mouse moves 
  // (canvas.onmousemove can be used too)
  // window.onmousemove = function(e) {
  //   if (canvas) {
  //     // Gets the canvas' offset from the top left of the screen
  //     var boundingRect = canvas.getBoundingClientRect();
      
  //     mouse.x = e.clientX - boundingRect.left;
  //     mouse.y = e.clientY - boundingRect.top;
  //   }
  // }

  const leftKeyCode = 37;
  const upKeyCode = 38;
  const rightKeyCode = 39;
  const downKeyCode = 40;
  const aKeyCode = 65;
  const wKeyCode = 87;
  const dKeyCode = 68;
  const sKeyCode = 83;

  var pressedKeys = {};
  var firstGameLoopIteration = true;

  window.onkeyup = function(e) {
    pressedKeys[e.keyCode] = false;        
  }
  window.onkeydown = function(e) {
    pressedKeys[e.keyCode] = true;
    // console.log(e.keyCode);
  }

  function drawObject(fillStyle, levelX, levelY) {
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = "black";
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(levelX * blockSize, levelY * blockSize, box.width, box.height);
    ctx.fill();
    // ctx.stroke();
  }
  
  // Game loop
  function loop() {
    var xDirection = 0;
    var yDirection = 0;
    // Tick (Update game logic)
    // box.x += (mouse.x - box.x - box.width * 0.5) / boxMoveSpeed;
    // box.y += (mouse.y - box.y - box.height * 0.5) / boxMoveSpeed;
    if (pressedKeys[downKeyCode] || pressedKeys[sKeyCode]) {
      yDirection += 1;
    }
    if (pressedKeys[upKeyCode] || pressedKeys[wKeyCode]) {
      yDirection -= 1;
    }

    if (pressedKeys[rightKeyCode] || pressedKeys[dKeyCode]) {
      xDirection += 1;
    }
    if (pressedKeys[leftKeyCode] || pressedKeys[aKeyCode]) {
      xDirection -= 1;
    }

    box.x += xDirection * boxMoveSpeed;
    box.y += yDirection * boxMoveSpeed;
    
    // Render background
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Render level
    var levelX = 0;
    var levelY = 0;
    
    for (let i = 0; i < level.length; i++) {
      const char = level.charAt(i);
      if (char == '\n') {
        levelX = 0;
        levelY += 1;
        continue;
      }

      if (char == '#') {
        drawObject("black", levelX, levelY);
      }

      if (char == 'f') {
        drawObject("green", levelX, levelY);
      }

      if (char == 's' && firstGameLoopIteration) {
        firstGameLoopIteration = false;
        box.x = levelX * blockSize;
        box.y = levelY * blockSize;
      }

      levelX += 1;
    }
    
    // Render player
    ctx.fillStyle = "darkred";
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.width, box.height);
    ctx.fill();
    
    // Frequency will generally match the display refresh rate
    requestAnimationFrame(loop);
  }
  
  window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    ctx = canvas.getContext("2d");
    
    loop();
  }
}();