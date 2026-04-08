let scene = 0;
let pValue = 0;
let wpScore = 0;

let moveSpeed = 6;
let allowMovement = true;


let mainMenuButton;
let playerAvatar;
let wplGhost;
let points;
let score;

let insTxWp;
let insTxGr;
let insTxCl;
let insTxPl;

//image position x and y
let posX = 0;
let posY = 0;

let globX;
let globY;
let cnv;

//---------------------
//used for canvas width and height
let cnvW = 900;
let cnvH = 500;

let ciX;
let ciY;
//---------------------

//--- sound Variables
let mmSound;
let mlSound;
let wplSound;
//---

//--- Bg Images Variables
let mmBackground;
let mhBackground;
let wpBackground;
let grBackground;
let clBackground;
let plBackground;
//---


let aIsPressed = false;
let sIsPressed = false;
let dIsPressed = false;
let wIsPressed = false;

//array for sprites
let playerSprite = [];
let boothName = ['scary','ballon','chase','prize'];

//array for obstacles 
let cWalls = [];

 
function preload() { 
  
  //-------playerSprite
  //--- Wall Phase Ghost
  playerSprite[4] = loadImage("Assets/GhostCarnival/Character/wplGhostR.png");
  //---
  //--------Hub Ghost
  playerSprite[2] = loadImage("Assets/GhostCarnival/Character/ghostLeft.png");
  playerSprite[3] = loadImage("Assets/GhostCarnival/Character/ghostRight.png");
  playerSprite[1] = loadImage("Assets/GhostCarnival/Character/ghostUp.png");
  playerSprite[0] = loadImage("Assets/GhostCarnival/Character/ghostDown.png");
  //-------
  
  //---Sound
  mmSound = loadSound("Assets/GhostCarnival/Sound/Track02.mp3");
  mlSound = loadSound("Assets/GhostCarnival/Sound/Track01.mp3");
  wplSound = loadSound("Assets/GhostCarnival/Sound/Track07.mp3");
  //---

  //-----Background Images
  mmBackground = loadImage("Assets/GhostCarnival/Background/mainMenuBackground.jpg");
  
  mhBackground = loadImage("Assets/GhostCarnival/Background/hubMap.png");

  wpBackground = loadImage("Assets/GhostCarnival/Background/wpMap.jpg");

  grBackground = loadImage("Assets/GhostCarnival/Background/grMap.jpg");

  clBackground = loadImage("Assets/GhostCarnival/Background/clMap.jpg");

  plBackground = loadImage("Assets/GhostCarnival/Background/plMap.jpg");
  //-----
}

function setup() {
 //used for canvas x and y coordinate position  
  globX = windowWidth;
  globY = windowHeight;
  
  cnv = createCanvas(cnvW, cnvH); 
  
  //used to calculate center of screen for canvas
  ciX = ((globX-cnvW)/2);
  ciY = ((globY-cnvH)/2);
  

  //position canvas in the center
  cnv.position(ciX, ciY);

  //create main menu button
  mainMenuButton = new mButton(650,350,200,70,30,255,94,28,255,2);

   //create Player
  playerAvatar = new Player(25);
  points = new elementsUI('points : ' + pValue,50,498);
  score = new elementsUI('score : ' + wpScore,50,35);
  insTxWp = new elementsUI('mouse click to phase through wallls \n' + 'press "Enter" to start', 250, 240);
  insTxGr = new elementsUI('Use "Space" key to move ghost\n' + 'press "Enter" to start',280,240);
  insTxCl = new elementsUI('Use "Space" key to move ghost\n' + 'press "Enter" to start',275,240);
  insTxPl = new elementsUI('Click on item to buy\n' + 'press "Enter" continue',330,240);

  wpBooth = new fairBooth(100,100,200,100,255,255,255,2);
  grBooth = new fairBooth(600,100,200,100,255,255,255,3);
  chBooth = new fairBooth(100,300,200,100,255,255,255,4);
  prBooth = new fairBooth(600,300,200,100,255,255,255,5);

  cWalls.push(new Obstacle());
  
}

function draw() {
  background(255,0,0);
    switch(scene) {
      case 0:
        mainMenu();
        return;
      case 1:
        mainHub();
        return;
      case 2:
        wallPhaseLv();
        return;
      case 3:
        ghostRaceLv();
        return;
      case 4:
        chaseLv();
        return;
      case 5:
        prizeLv();
        return;
      default:     
    }
} 

function keyPressed() {
  if((key === 'a' || key === 'A') || 
     (key === 'w' || key === 'W') || 
     (key === 'd' || key === 'D') || 
     (key === 's' || key === 'S')) {
    playerAvatar.move();
  }



  if((key !== 'a' || key !== 'A') && 
     (key !== 'w' || key !== 'W') &&
     (key !== 'd' || key !== 'D') &&
     (key !== 's' || key !== 'S')) {
        return;
     }
}

function mvRestriction() {
  if(scene === 2) {
    allowMovement = false;
  }
}

function mousePressed() {
  userStartAudio();

  if(scene === 0) {
    mainMenuButton.clicked();
  }

  if(scene === 2) {
    wplGhost.isPhasing = true;
    console.log(wplGhost.isPhasing);
  }
}

function mouseReleased() {
  if(scene === 2) {
    wplGhost.isPhasing = false;
    console.log(wplGhost.isPhasing);
  }
}

class elementsUI {
  constructor (msg, xUI, yUI) {
    this.message = msg;
    this.x = xUI;
    this.y = yUI;
  }

  showUI () {
    textSize(25);
    strokeWeight(4);
    fill(255);
    text(this.message, this.x, this.y);
  }
}

class mButton {
  constructor(bX,bY,bW,bH,bR,bcR,bcG,bcB,bS,bsW) {
    //dimension variables and radius
    this.x = bX;
    this.y = bY;
    this.w = bW;
    this.h = bH;
    this.r = bR;
    //color and stroke variables 
    this.cR = bcR;
    this.cG = bcG;
    this.cB = bcB;
    this.s = bS;
    this.sW = bsW;
  } 

  show() {
    fill(this.cR,this.cG,this.cB);
    stroke(this.s);
    strokeWeight(this.sW);
    rect(this.x,this.y,this.w,this.h,this.r);
  }

  highlight() {
    if(mouseX >= this.x && mouseX <= (this.x + this.w) &&
       mouseY >= this.y && mouseY <= (this.y + this.h)) {
         this.cR = 255;
         this.cG = 255;
         this.cB = 255;
       }
  }

  clicked() {
    if(mouseX >= this.x && mouseX <= (this.x + this.w) &&
       mouseY >= this.y && mouseY <= (this.y + this.h)) {
        scene = 1;
       } 
  }
}

class fairBooth {
  constructor(x,y,w,h,r,g,b,sN) {
    this.fbX = x;
    this.fbY = y;
    this.fbW = w;
    this.fbH = h;

    this.fbR = r;
    this.fbG = g;
    this.fbB = b;
    this.fbScene = sN;
  }

  show() {
    noStroke();
    fill(this.fbR, this.fbG, this.fbB,0);
    rect(this.fbX, this.fbY, this.fbW, this.fbH);
  }

  borders() {
    //border left
    stroke(0,0,0,0);
    line(this.fbX,this.fbY,this.fbX,(this.fbY + this.fbH));
    //border middle
    line(this.fbX,this.fbY,(this.fbX + this.fbW),this.fbY);
    //border right
    line((this.fbX + this.fbW), this.fbY, (this.fbX + this.fbW), (this.fbY + this.fbH));
  }

  boothCollision(obj) {
    if((obj.eX > this.fbX && obj.eX < (this.fbX + this.fbW)) 
      &&(obj.eY > this.fbY && obj.eY < (this.fbY +this.fbH))) {
      console.log(this.fbScene);
      allowMovement = false;
      if(!allowMovement){
      moveSpeed = 0;
      push();
      fill(0,0,0,190);
      rect(posX,posY,cnvW,cnvH);
      pop();

      push();
      fill(255);
      if(this.fbScene === 2 && !allowMovement) { 
        insTxWp.showUI();
      }

      if(this.fbScene === 3 && !allowMovement) {
        insTxGr.showUI();
      }

      if(this.fbScene === 4 && !allowMovement) {
        insTxCl.showUI();
      }
      
      if(this.fbScene === 5 && !allowMovement) {
        insTxPl.showUI();
      }

      pop();

      }
      obj.boothId(this.fbScene);
    }

    let d;

    let bCntX = (this.fbX + (this.fbW/2));
    let bCntY = (this.fbY + (this.fbH/2));

    d = dist(bCntX, bCntY, obj.eX, obj.eY);
  
    let sum = (this.fbW/2) + obj.ecR;

    if (d < 110) {
      obj.eX = constrain(obj.eX, (this.fbX+15), (this.fbX + (this.fbW-15)));
      
    } else {
      obj.eX = constrain(obj.eX, 49, 851);
       }

    if(d < 75) {
      obj.eY = constrain(obj.eY, (this.fbY+25), 479);
    } else {
      obj.eY = constrain(obj.eY, 70, 429);
    }   
  }
}

class Player {
  constructor (cirRad) {
    text();
    this.eX = cnvW/2;
    this.eY = cnvH/2;
    this.ecR = cirRad;

    this.eR = 0;
    this.eG = 0;
    this.eB = 0;
    this.eA = 0;

    this.isPhasing = false;
    this.imgOpacity = 255;
  }

  wplShow() {
    let ghOffsetX = 170;
    let ghOffsetY = 90;
    let ghostW = 150;
    let ghostH = 150;

    let ghostX = this.eX - ghOffsetX;
    let ghostY = this.eY + ghOffsetY; 

    push();
    if(this.isPhasing === true) {
      this.imgOpacity = 128;
      tint(255,this.imgOpacity);
      image(playerSprite[4],ghostX,ghostY, ghostW, ghostH);
    }else {
      this.imgOpacity = 255;
      tint(255,this.imgOpacity);
      image(playerSprite[4],ghostX,ghostY, ghostW, ghostH);
    }
    pop();

    fill(56,56,56,75);
    ellipse(this.eX - 95, this.eY + 165, 100);
  }
  showHub() {
    let xOffset = 25;
    let yOffset = 25;
    let ghostW = 50;
    let ghostH = 50;

    if(!aIsPressed && !dIsPressed && !sIsPressed && !wIsPressed){
      image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      
    }

    if(aIsPressed) {
      if(allowMovement) {
        image(playerSprite[2],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }

      if(!allowMovement) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }
    }

    if(dIsPressed) {
      if(allowMovement) {
        image(playerSprite[3],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }

    if(!allowMovement) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }  
    }

    if(wIsPressed) {
      if(allowMovement) {
        image(playerSprite[1],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }

      if(!allowMovement) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }
    }

    if(sIsPressed) {
      if(allowMovement) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }

      if(!allowMovement) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }
    }
     //ellipse(this.eX, this.eY, this.ecR);
  }

  move() {
    //let moveSpeed = 6;
    
    if(keyIsDown(65)) {
      aIsPressed = true;
    } else if(!keyIsDown(65)) {
      aIsPressed = false;
    }

    if(keyIsDown(68)) {
      dIsPressed = true;
    } else if(!keyIsDown(68)) {
      dIsPressed = false;
    }

    if(keyIsDown(87)) {
      wIsPressed = true; 
    } else if(!keyIsDown(87)) {
      wIsPressed = false;
    }

    if(keyIsDown(83)) {
      sIsPressed = true; 
    } else if(!keyIsDown(83)) {
      sIsPressed = false;
    }

    if(aIsPressed && !sIsPressed && !dIsPressed && !wIsPressed) {
      this.eX -= moveSpeed;
    }

    if(dIsPressed && !sIsPressed && !aIsPressed && !wIsPressed) {
      this.eX += moveSpeed; 
    } 

    if(wIsPressed && !sIsPressed && !aIsPressed && !dIsPressed) {
      this.eY -= moveSpeed;
    }

    if(sIsPressed && !wIsPressed && !aIsPressed && !dIsPressed) {
      this.eY += moveSpeed;
    }
  }

  boothId (tS) {
    let tScene = tS;
    scene = tScene; 
  }
}

class Obstacle{
  constructor () {
  this.wX = cnvW ; 
  this.wY = 0;
  this.wW = random(40,60);
  this.wH = cnvH;
  this.wSpeed = 1;
  }

  show() {
    fill(255,206,145);
    rect(this.wX,this.wY,this.wW,this.wH);
  }

  wallMovement() {
    this.wX -= this.wSpeed;
  }
}

function mainMenu() {
  let area = 'mMenu';
  soundManager(area);

  let message = 'PLAY';
  let mW = 700;
  let mH = 400;
  let mC = 0;

  image(mmBackground,posX,posY,cnvW,cnvH);

  mainMenuButton.highlight();
  mainMenuButton.show();
    
  fill(mC);
  textSize(40);
  text(message,mW,mH); 
}

function mainHub() {
  mvRestriction();
  noCursor();
  let area = 'mHub'
  soundManager(area);
 
  image(mhBackground,posX,posY,cnvW,cnvH);

  points.showUI();
  
  playerAvatar.showHub();
  playerAvatar.move(); 
  
  wpBooth.show();
  wpBooth.borders();
  wpBooth.boothCollision(playerAvatar);

  grBooth.show();
  grBooth.borders();
  grBooth.boothCollision(playerAvatar);
  
  chBooth.show();
  chBooth.borders();
  chBooth.boothCollision(playerAvatar);
  
  prBooth.show();
  prBooth.borders();
  prBooth.boothCollision(playerAvatar);
}

function wallPhaseLv() {
  noCursor();
  let area = 'wpLv';
  soundManager(area);

  image(wpBackground,posX,posY,cnvW,cnvH);

  
  if(wplGhost === undefined || wplGhost === null) {
   wplGhost = new Player(50);
  }

  if(frameCount % 500 == 0) {
    cWalls.push(new Obstacle());
  }

  for(let i = 0; i < cWalls.length; i++) {
    cWalls[i].show();
    cWalls[i].wallMovement();
  }

  wplGhost.wplShow();

  push();
  fill(0);
  rect(0,0,cnvW,50);
  pop();

  score.showUI();
}

function ghostRaceLv() {
  image(grBackground,posX,posY,cnvW,cnvH);


}

function chaseLv() {
  image(clBackground,posX,posY,cnvW,cnvH);
}

function prizeLv() {
  image(plBackground,posX,posY,cnvW,cnvH);
}

function soundManager(sA) {
  let location = sA;

  if (sA === 'mMenu' ){
    if(!mmSound.isPlaying()) {
      mmSound.play();
    } 
  }
  
  if (sA === 'mHub') {
    let mlSoundReset = 0; 
    mlSound.setVolume(0.25);
    
    if(mmSound.isPlaying()) {
      mmSound.stop();
    } 

    while(mlSoundReset === 0){
      if(!mlSound.isPlaying()) {
        mlSound.play();   
      }
      mlSoundReset = 1;
    }
    mlSoundReset = 0;
  }

  if (sA === 'wpLv' ){
    let wplSoundReset = 0;
    wplSound.setVolume(0.25);

    if(mlSound.isPlaying()) {
    mlSound.stop();
    }

    if(!wplSound.isPlaying()) {
      wplSound.play();
    } 

    while(wplSoundReset === 0){
      if(!wplSound.isPlaying()) {
        wplSound.play();   
      }
      wplSoundReset = 1;
    }
    wplSoundReset = 0;
 

  }

  
}