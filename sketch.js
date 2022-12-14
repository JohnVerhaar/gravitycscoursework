// GAME VARIABLES
//let level1Blocks = [100,100,100,100,   650, 700, 50, 200,    200, 720, 80, 80, 15, 400, 30, 800,    400, 785, 800, 30,    400, 15, 800, 30,    785, 400, 30, 800]; // XPOS, YPOS, WIDTH, HEIGHT of each block in the array
let intro1Blocks = [400,555,700,32];
let intro2Blocks = [100,677,200,266,   350,677,100,266,   550,677,100,266,   750,677,100,266];
let intro3Blocks = [100,677,200,266,   700,677,200,266,   400,266,600,100];
let intro4Blocks = [50,170,100,50,   300,266,50,533,   600,533,50,533,   700,750,200,200];
let level1Blocks = [300, 390, 600, 170,   575, 230, 50, 180,   625, 25, 350, 50,   700, 770, 200, 140,   400, 770, 50, 140,   100, 770, 200, 140];
let level2Blocks = [120, 354, 240, 32,   420, 285, 50, 570,   420, 545, 200, 50,   370, 184, 100, 32,   470, 85, 100, 32,   470, 216, 100, 32];
let level3Blocks = [100, 775, 200, 50,   400, 565, 100, 600,   625, 775, 200, 50,   750, 150, 200, 50];
let level4Blocks = [105,175,210,50,   185,325,50,350,   22,365,50,32, 190,365,180,32,   395,80,60,160,   495,145,260,40,    740,145,120,40];
 
let level1Obstacles = [10, 492, true, 30, 492, true, 50, 492, true, 70, 492, true, 90, 492, true, 110, 492, true, 130, 492, true, 150, 492, true, 170, 492, true, 190, 492, true, 210, 492, true, 230, 492, true, 250, 492, true, 270, 492, true, 290, 492, true, 310, 492, true, 330, 492, true, 350, 492, true, 370, 492, true, 390, 492, true, 410, 492, true, 430, 492, true, 450, 492, true, 470, 492, true, 490, 492, true, 510, 492, true, 530, 492, true, 550, 492, true, 570, 492, true, 590, 492, true]; // CENTRE XPOS, CENTRE YPOS, FLIPPED ORIENTATION of each obstacle in the array.
let level2Obstacles = [385, 218, true, 366, 218, true, 347, 218, true, 328, 218, true, 330, 502, false, 349, 502, false, 368, 502, false, 387, 502, false, 453, 502, false, 472, 502, false, 492, 502, false, 511, 502, false,   454, 250, true, 472, 250, true, 491, 250, true, 510, 250, true];
let level3Obstacles = [360,247,false,  380,247,false,  400,247,false,  420,247,false,  440,247,false];
let level4Obstacles = [374,183,true,394,183,true,414,183,true,434,183,true,454,183,true,474,183,true,494,183,true,515,183,true,536,183,true,557,183,true,578,183,true,599,183,true,625,183,true,   678,183,true,700,183,true,722,183,true,744,183,true,766,183,true,788,183,true,   10,399,true,30,399,true,50,399,true, 95,399,true,114,399,true,133,399,true,152,399,true,   217,399,true,235,399,true,253,399,true,271,399,true, 217,331,false,253,331,false,235,331,false,271,331,false];
 
let intro4FlipTiles = [250,677,-1,   650,133,1,   350,677,-1,   550,133,1];
let level3FlipTiles = [175,300,1,    275,300,1,   525,300,1,   625,300,1]; // CENTRE XPOS, CENTRE YPOS, FLIPPED ORIENTATION (-1 = upwards gravity, 1 = downwards/normal gravity) of each flip tile in the array
let level4FlipTiles = [330,640,-1,   430,640,-1,   530,640,-1];
 
let itemPositions = [700,500,700,500,700,500,   750,500,750,500,750,500,       400,120,400,120,700,480,   712,600,712,600,712,600,     90,600,90,600,90,600,       355,120,355,120,483,150, 625,700,625,700,725,65,   75,250,25,440,460,75];
let gameMode = 0;
let runTime = 0; // Frame counter for the timer
let TASString = "";
let TASPlaying = false;
let RTAString = "";
let count = 0.0;
let movingState = 0; // 0 = still, 1 = running
let facingRight = 1; // 1 = facing right, 0 = facing left
let backgroundOffset = 0;
let lastLevel = 9; // value to display the end screen so we can add more level easily
 
let playerRunSprites = []; // array of player running sprites moving RIGHT
let itemSprites = [];
let levelBackgrounds = [];
 
function preload() {
  titleScreen = loadImage('assets/titlescreen.png'); // Loads the title screen image into P5
  levelBackgrounds[0] = loadImage('assets/tutorial1sky.png');
  levelBackgrounds[1] = loadImage('assets/tutorial2sky.png');
  levelBackgrounds[2] = loadImage('assets/tutorial3sky.png');
  levelBackgrounds[3] = loadImage('assets/tutorial4sky.png');
  levelBackgrounds[4] = loadImage('assets/level1sky.png');
  levelBackgrounds[5] = loadImage('assets/level2sky.png');
  levelBackgrounds[6] = loadImage('assets/level3sky.png');
  levelBackgrounds[7] = loadImage('assets/level4sky.png')
  levelBackgrounds[8] = loadImage('assets/endscreen.png');
  endScreen = loadImage('assets/endscreen.png'); // Loads the end screen image into P5
 
  // Loading player's sprites
  playerRunSprites[0] = loadImage('assets/player/run1.png');
  playerRunSprites[1] = loadImage('assets/player/run2.png');
  playerRunSprites[2] = loadImage('assets/player/run3.png');
  playerRunSprites[3] = loadImage('assets/player/run4.png');
  playerRunSprites[4] = loadImage('assets/player/run5.png');
  playerRunSprites[5] = loadImage('assets/player/run6.png');
  playerRunSprites[6] = loadImage('assets/player/run7.png');
  playerRunSprites[7] = loadImage('assets/player/run8.png');
  idle = loadImage('assets/player/idle.png')
  jump = loadImage('assets/player/jump.png')
  flipTile = loadImage('assets/gravityflipper.png');
 
  // Loading item sprites
  itemSprites[0] = loadImage('assets/coin/image 1.png');
  itemSprites[1] = loadImage('assets/coin/image 2.png');
  itemSprites[2] = loadImage('assets/coin/image 3.png');
  itemSprites[3] = loadImage('assets/coin/image 4.png');
  itemSprites[4] = loadImage('assets/coin/image 5.png');
  itemSprites[5] = loadImage('assets/coin/image 6.png');
  itemSprites[6] = loadImage('assets/coin/image 7.png');
  itemSprites[7] = loadImage('assets/coin/image 8.png');
  itemSprites[8] = loadImage('assets/coin/image 9.png');
  itemSprites[9] = loadImage('assets/coin/image 10.png');
  itemSprites[10] = loadImage('assets/coin/image 11.png');
  itemSprites[11] = loadImage('assets/coin/image 12.png');
  itemSprites[12] = loadImage('assets/coin/image 13.png');
  itemSprites[13] = loadImage('assets/coin/image 14.png');
  itemSprites[14] = loadImage('assets/coin/image 15.png');
  itemSprites[15] = loadImage('assets/coin/image 16.png');
 
 
}
 
function setup() {
  rectMode(CENTER); // Makes the drawing functions draw sprites from their central coordinates, instead of the default top-left corner coordinates. This makes collision and movement easier to calculate as you aren’t worrying about factoring in player width in only one direction when collision occurs.
  createCanvas(800, 800);
  myPlayer = new Player();
  item1 = new Item(itemPositions[0], itemPositions[1]);
  item2 = new Item(itemPositions[2], itemPositions[3]);
  item3 = new Item(itemPositions[4], itemPositions[5]);
 
 
 
  loadTAS();
  frameRate(60);
}
 
function draw() {
  noStroke();
 
  if (TASPlaying == false) { // Play TAS / check for user input
    keyChecking(); // Check for user input
  } else {
    if (TASString != "") { // If there are inputs to read
      let currentInput = '';
      let checkingInputs = true;
 
      while (checkingInputs == true) { // Check for inputs until we reach a semicolon
        currentInput = TASString.charAt(0);
 
        if (currentInput == ';') {
          checkingInputs = false;
        } else {
          switch(currentInput) { // Perform the input (UP/LEFT/RIGHT/FLIP)
            case 'U':
              playerUp();
            break;
 
            case 'L':
              playerLeft();
            break;
 
            case 'R':
              playerRight();
            break;
 
            case 'S':
              playerFlip();
            break;
          }
        }    
        if (TASString.length > 0) {
          TASString = TASString.substring(1);
        } else {
          TASPlaying = false;
        }
      }
    } else {
      TASPlaying = false; // When the TAS string is empty, give the user back control of the player
      document.getElementById("readFileButton").innerHTML = "Finished TAS";
    }
  }
 
  if (gameMode == 0) {
    background(255);
    background(titleScreen); // Display title screen image
  } else {
    background(0)
    image(levelBackgrounds[gameMode - 1], (backgroundOffset % 2000) - 2000, -200);
    image(levelBackgrounds[gameMode - 1], (backgroundOffset % 2000), -200);
    backgroundOffset = backgroundOffset + 0.2;
 
    switch(gameMode) {
      case 1:
        fill(10,10,220);
        // Draw the level
        drawBlocks(intro1Blocks);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textStyle()
        fill(255);
        stroke(0);
        strokeWeight(4);
        textSize(32);
        text("Collect the coin by running with the arrow keys!", 400, 350);
       
        myPlayer.moveY(intro1Blocks);
       
      break;
 
      case 2:
        fill(220,220,0);
        // Draw the level
        drawBlocks(intro2Blocks);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textStyle()
        fill(255);
        stroke(0);
        strokeWeight(4);
        textSize(32);
        text("Jump over gaps with the up arrow key!", 400, 350);
       
        myPlayer.moveY(intro2Blocks);
      break;
 
      case 3:
        fill(230,210,200);
        // Draw the level
        drawBlocks(intro3Blocks);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textStyle()
        fill(255);
        stroke(0);
        strokeWeight(4);
        textSize(32);
        text("Flip your gravity with the spacebar!", 400, 350);
       
        myPlayer.moveY(intro3Blocks);
      break;
 
      case 4:
        fill(150,0,255);
        // Draw the level
        drawBlocks(intro4Blocks);
        drawFlipTiles(intro4FlipTiles);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textStyle()
        fill(255);
        stroke(0);
        strokeWeight(4);
        textSize(32);
        text("Use the flip tiles to change your gravity!", 400, 350);
       
        myPlayer.moveY(intro4Blocks);
        myPlayer.flipTileCollision(intro4FlipTiles);
      break;
 
      case 5:
        fill(150,0,255);
        // Draw the level
        drawBlocks(level1Blocks);
        drawObstacles(level1Obstacles);
       
        myPlayer.moveY(level1Blocks);
        myPlayer.spikeCollision(level1Obstacles);
      break;
 
      case 6:
        fill(255,200,0);
        // Draw the level
        drawBlocks(level2Blocks);
        drawObstacles(level2Obstacles);
 
        myPlayer.moveY(level2Blocks);
        myPlayer.spikeCollision(level2Obstacles);
      break;
 
      case 7:
        fill(220);
        // Draw the level
        drawBlocks(level3Blocks);
        drawObstacles(level3Obstacles);
        drawFlipTiles(level3FlipTiles);
 
        myPlayer.moveY(level3Blocks);
        myPlayer.spikeCollision(level3Obstacles);
        myPlayer.flipTileCollision(level3FlipTiles);
      break;
     
      case 8:
        fill(220);
        // Draw the level
        drawBlocks(level4Blocks);
        drawObstacles(level4Obstacles);
        drawFlipTiles(level4FlipTiles);
 
        myPlayer.moveY(level4Blocks);
        myPlayer.spikeCollision(level4Obstacles);
        myPlayer.flipTileCollision(level4FlipTiles);
      break;
 
      case 9:
        background(endScreen);
 
        // Display the final time to the user
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(48);
        fill(200,0,0);
        noStroke();
        text("Your final time was " + runTimeMinutes + ":" + runTimeSeconds + "." + runTimeMilliseconds + "!", 400, 600);
        console.log(RTAString);
      break;
    }
   
    // DRAW THE PLAYER AND THE TIMER
    if (gameMode != lastLevel) {
      if (myPlayer.getGround() == true) { // Draw player sprites
        if (movingState == 0) {
          myPlayer.draw(idle, 0, facingRight);
        } else if (movingState == 1) {
            myPlayer.draw(playerRunSprites, 1, facingRight);
        }
      } else {
        myPlayer.draw(jump, 2, facingRight);
      }
      displayTimer();
      runTime = runTime + 0.752;
    }
   
    //LEVEL INCREMENTER FUNCTION
    itemCollision();
 
    item1.draw(itemSprites);
    item2.draw(itemSprites);
    item3.draw(itemSprites);
    item1.collisionCheck(myPlayer.getX(), myPlayer.getY());
    item2.collisionCheck(myPlayer.getX(), myPlayer.getY());
    item3.collisionCheck(myPlayer.getX(), myPlayer.getY());
 
    console.log(gameMode);
    RTAString = RTAString + ";";
    movingState = 0;
  }
 
 
}
 
//LEVEL OBJECT DRAW FUNCTIONS
function drawBlocks(array) {
  for (let i = 0; i < (array.length / 4); i++) { // Draws each block in the array
    rect(array[4*i], array[4*i+1], array[4*i+2], array[4*i+3]);
  }
}
 
function drawObstacles(array) {
  fill(0);
  for (let i = 0; i < (array.length / 3); i++) { // Draws each block in the array
    if (array[3*i + 2] == true) {
      triangle(array[3*i] - 10, array[3*i + 1] - 18, array[3*i] + 10, array[3*i + 1] - 18, array[3*i], array[3*i+1] + 18);
    } else {
      triangle(array[3*i] - 10, array[3*i + 1] + 18, array[3*i] + 10, array[3*i + 1] + 18, array[3*i], array[3*i+1] - 18);
    }
  }
}
 
function drawFlipTiles(array) {
  for (let i = 0; i < (array.length / 3); i++) { // Draws each block in the array
    imageMode(CENTER);
    if (array[3*i + 2] == 1) {
      scale(1, -1);
      image(flipTile, array[3*i], -array[3*i + 1]);
      scale(1, -1);
    } else {
      image(flipTile, array[3*i], array[3*i + 1]);
    }
  }
}
 
//ITEM COLLISION FUNCTION
function itemCollision() {
  if (item1.getCollected() + item2.getCollected() + item3.getCollected() == 3) { // If all items are collected, move to the next level
    itemIncrementer();
 
    gameMode = gameMode + 1; // Increment level
    myPlayer.newGameMode(gameMode);
    myPlayer.die();
 
    if (gameMode == lastLevel) { // If on the last level, move the items out of the way so they cannot be collected
      item1.newPos(1000,500);
      item2.newPos(1000,500);
      item3.newPos(1000,500);
    }
  }
}
 
function itemIncrementer() {
  if(gameMode*6 + 5 < itemPositions.length) {
    item1.newPos(itemPositions[gameMode*6], itemPositions[gameMode*6 + 1]);
    item2.newPos(itemPositions[gameMode*6 + 2], itemPositions[gameMode*6 + 3]);
    item3.newPos(itemPositions[gameMode*6 + 4], itemPositions[gameMode*6 + 5]);
  }
}
 
function displayTimer() {
  runTimeMilliseconds = (Math.floor(((runTime % 60) / 60) * 1000));
  if (runTimeMilliseconds < 100) {
    runTimeMilliseconds = "0" + str(runTimeMilliseconds);
  }
  runTimeSeconds = (Math.floor(runTime / 60)) % 60 // We have to MOD by 60 here to get rid of all times that make up a whole minute
  if (runTimeSeconds < 10) {
    runTimeSeconds = "0" + str(runTimeSeconds);
  }
  runTimeMinutes = (Math.floor(runTime / 3600))
  if (runTimeMinutes < 10) {
    runTimeMinutes = "0" + str(runTimeMinutes);
  }
 
  textSize(25);
  fill(255);
  strokeWeight(2);
  textAlign(LEFT, TOP);
  text(runTimeMinutes + ":" + runTimeSeconds + "." + runTimeMilliseconds, 5, 775);
}
 
function loadTAS() { // Copies the contents of the TAS file to a string in JavaScript, TASString
  let file = document.getElementById("readFile");
  file.addEventListener("change", function () { // When the contents of file changes (when a file is uploaded):
    gameMode = gameMode + 1;
    myPlayer.newGameMode(gameMode);
    myPlayer.die();
    var reader = new FileReader();
    reader.onload = function (progressEvent) { // When the file is read, convert the contents of the file to a readable string of inputs, then output the string to console
      TASString = inputStringConversion(this.result);
      console.log(TASString);
    };
    reader.readAsText(this.files[0]); // Read the file
  });
}
 
function inputStringConversion(inputs) { // Convert the TAS String to a readable format
  inputs = inputs.replace(/[\r\n]/gm, ';'); // Replace all blank lines with semicolons
 
  let count = 0;
  let rnNewLine = false;
  while (count < inputs.length - 1) { // Check if string has two semicolons or one, due to \r\n formatting
    if (inputs.charAt(count) == ';') {
      if (inputs.charAt(count + 1) == ';') {
        rnNewLine = true; // True if \r\n
      }
      break;
    }
    count = count + 1;
  }
 
  if (rnNewLine == true) { // Remove extra semicolons if they exist
    count = 1
    while (count < inputs.length - 1) {
      if (inputs.charAt(count) == ';') { // Remove extra semicolon
        inputs = inputs.substring(0, count + 1) + inputs.substring(count + 2); // Remove the extra semicolon
      }
      count = count + 1;
    }
  }
 
  document.getElementById("readFile").disabled = true;
  document.getElementById("readFileButton").innerHTML = "Playing TAS";
  TASPlaying = true; // Disable user input
  return inputs;
}
 
//KEY DETECTION FUNCTIONS
function keyChecking() {
  if(keyIsDown(LEFT_ARROW)) {
    playerLeft();
    if (gameMode < lastLevel) {
      RTAString = RTAString + "L";
    }
  }
 
  if(keyIsDown(RIGHT_ARROW)) {
    playerRight();
    if (gameMode < lastLevel) {
      RTAString = RTAString + "R";
    }
  }
 
  if(keyIsDown(UP_ARROW)) {
    playerUp();
    if (gameMode < lastLevel) {
      RTAString = RTAString + "U";
    }
  }
 
  if(keyIsDown(32)) { // If space is pressed
    playerFlip();
    if (gameMode < lastLevel) {
      RTAString = RTAString + "S";
    }
  }
}
 
function playerLeft() {
  movingState = 1;
  facingRight = 0;
  switch (gameMode) {
    case 1:
      myPlayer.moveX(intro1Blocks, -1);
    break;
 
    case 2:
      myPlayer.moveX(intro2Blocks, -1);
    break;
   
    case 3:
      myPlayer.moveX(intro3Blocks, -1);
    break;
 
    case 4:
      myPlayer.moveX(intro4Blocks, -1);
    break;
 
    case 5:
      myPlayer.moveX(level1Blocks, -1);
    break;
   
    case 6:
      myPlayer.moveX(level2Blocks, -1);
    break;
 
    case 7:
      myPlayer.moveX(level3Blocks, -1);
    break;
 
    case 8:
      myPlayer.moveX(level4Blocks, -1);
    break;
  }
}
 
function playerRight() {
  movingState = 1;
  facingRight = 1;
  switch (gameMode) {
    case 1:
      myPlayer.moveX(intro1Blocks, 1);
    break;
 
    case 2:
      myPlayer.moveX(intro2Blocks, 1);
    break;
   
    case 3:
      myPlayer.moveX(intro3Blocks, 1);
    break;
 
    case 4:
      myPlayer.moveX(intro4Blocks, 1);
    break;
 
    case 5:
      myPlayer.moveX(level1Blocks, 1);
    break;
   
    case 6:
      myPlayer.moveX(level2Blocks, 1);
    break;
 
    case 7:
      myPlayer.moveX(level3Blocks, 1);
    break;
 
    case 8:
      myPlayer.moveX(level4Blocks, 1);
    break;
  }
}
 
function playerUp() {
  if (gameMode == 0) { // If on title screen, start game
    gameMode = 1;
    myPlayer.newGameMode(gameMode);
    myPlayer.die();
  } else {
    if (myPlayer.getGround()) {
      myPlayer.jump();
    }
    myPlayer.decreaseGravity();
  }
}
 
function playerFlip() {
  if (gameMode != 0) {
    myPlayer.flipGravity();
  }
}
 
