//value used to manage what scene is drawn
let scene = 0;

//variables used throughout entire game
let mainMenuButton;
let timer = 0;
let roundEnded = false;
let goToHub = false;
let points;
let score;

//used in Hub
let playerAvatar;

//variables exclusive to scene 2

let winConditionTriggerValue = 0;
let wplGhost = null;
let lastSpeedVal = 0;
let wallSpeed = 2;
let ghostFailedToPhase = false;

//variables exclusive to scene 3
let grEndButton;
let grPlayerGhost
let grOpponentGhost;
let raceStart = false;
let initGrL = false;
let reachedfLine = false;
let nTraps = 0;

//variables used in scene4
let chestCounter = 0;
let advanceButton;
let assetsReady = false;
let probabilityValue;
let clAvatar = null;
let collect;
let comeback;
let hideMsg = false;
let chestOne = null;
let chestTwo = null;
let chestThree = null;
let chestFour = null;

//variables scene 5
let getting_Balance = false;
let avail_Balance = 0;
let price1 = 2000;
let price2 = 5000;
let price3 = 10000;
let item1_isSold = false;
let item2_isSold = false;
let item3_isSold = false;
let exitButton;

//hub
let pValue = 0;
let pMsg = 'Points: ' + pValue;

//within mini game
let scValue = 0;
let scMsg = 'Score: ' + scValue;

let rTextB = '';
let rText = 'READY' + rTextB;

let sTextB = '';
let sText = 'SET' + sTextB;

let gTextB = '';
let gText = 'GO' + gTextB;

let insMsLv1WinB ='Press "ENTER" to return to hub';
let insMsLv1Win ='You phased through all the traps \n' + insMsLv1WinB;

let insMsLv1EndB = 'press "ENTER" to return to hub';
let insMsLv1End = 'You Failed to phase through a trap \n' + insMsLv1EndB;

let insMsgLv1B = 'press "Enter" to start';
let insMsgLv1 = 'mouse click to phase through wallls \n' + insMsgLv1B;

let insMsgLv2B = 'press "Enter" to start';
let insMsgLv2 = 'Use "Space" key to move ghost \n' + insMsgLv2B;

let insMsgLv3B = 'press "Enter" to start';
let insMsgLv3 = 'Use "WASD" keys to move ghost\n' + insMsgLv3B;

let insMsgPrLvB = 'press "Enter" continue';
let insMsgPrLv = 'Click on item to buy\n' + insMsgPrLvB;

let grEndTxPlB = 'Prize: 100';
let grEndTxPl = 'You Won\n' + grEndTxPlB;

let grEndTxghB = 'Prize: 0';
let grEndTxgh = 'Blue Ghost Won\n' + grEndTxghB;

let grEndTxTieB = 'Prize: 50';
let grEndTxTie = "It's a Tie\n" + grEndTxTieB;

let mCollectText = 'Collect your reward!';
let mComebackText = 'This world works in mysterious ways.\n' +
                    'There is nothing for you in this room yet.\n' +
                    'Comeback later!';

let moveSpeed = 6;
let allowMovement = true;
let goToScene2 = false;

// used for instruction messages
let insTxWp;
let insTxWpEnd;
let insTxWpWin;
let insTxGr;
let insTxCl;
let insTxPl;
let readyText;
let setText;
let goText;
let insTxgrEndPl;
let insTxgrEndgh;
let insTxgrEndTie;

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
let grlSound;
let prlSound;
let clSound;
//---

//--- Bg Images Variables
let mmBackground;
let mhBackground;
let wpBackground;
let grBackground;
let clBackground;
let plBackground;
//---

//--- used for drawing character in hub
let aIsPressed = false;
let sIsPressed = false;
let dIsPressed = false;
let wIsPressed = false;

//array for sprites
let playerSprite = [];
let chestSprite = [];
let boothName = ['scary','ballon','chase','prize'];

//array for obstacles 
let cWalls = [];

 
function preload() { 
  //---chestSprite
  //--- wood chest
  chestSprite[0] = loadImage("Assets/GhostCarnival/Lootboxes/lbWood.png");
  //--- silver chest
  chestSprite[1] = loadImage("Assets/GhostCarnival/Lootboxes/lbSilver.png");
  //--- gold chest
  chestSprite[2] = loadImage("Assets/GhostCarnival/Lootboxes/lbGold.png");
  //--- diamong chest
  chestSprite[3] = loadImage("Assets/GhostCarnival/Lootboxes/lbDiamond.png");
  //----

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
  grlSound = loadSound("Assets/GhostCarnival/Sound/Track06.mp3");
  prlSound = loadSound("Assets/GhostCarnival/Sound/Track04.mp3");
  clSound = loadSound("Assets/GhostCarnival/Sound/Track05.mp3");
  //---

  //-----Background Images
  mmBackground = loadImage("Assets/GhostCarnival/Background/mainMenuBackground.jpg");
  
  mhBackground = loadImage("Assets/GhostCarnival/Background/hubMap.png");

  wpBackground = loadImage("Assets/GhostCarnival/Background/wpMap.png");

  grBackground = loadImage("Assets/GhostCarnival/Background/grMap.png");

  clBackground = loadImage("Assets/GhostCarnival/Background/clMap.png");

  plBackground = loadImage("Assets/GhostCarnival/Background/plMap.png");
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

  //ghost race button 
  grEndButton = new mButton(640,340,200,70,30,255,94,28,255,2);

  //advance to hub or room
  advanceButton = new mButton(640,340,200,70,30,255,94,28,255,2);

  exitButton = new mButton(650,380,200,70,30,255,94,28,255,2);

   //create Player
  playerAvatar = new Player(25);

  //hub
  points = new elementsUI(pMsg,pValue,17,498);
  
  //mini game
  score = new elementsUI(scMsg,scValue,50,35);

  insTxWp = new elementsUI(insMsgLv1,insMsgLv1B,300,240);
  insTxWpEnd = new elementsUI(insMsLv1End,insMsLv1EndB,300,240);
  insTxWpWin = new elementsUI(insMsLv1Win,insMsLv1WinB,300,240);
  insTxGr = new elementsUI(insMsgLv2,insMsgLv2B,300,240);
  insTxCl = new elementsUI(insMsgLv3,insMsgLv3B,300,240);
  insTxPl = new elementsUI(insMsgPrLv,insMsgPrLvB,350,240);

  readyText = new elementsUI(rText,rTextB,cnvW/2,cnvH/2);
  setText = new elementsUI(sText,sTextB,cnvW/2,cnvH/2);
  goText = new elementsUI(gText,gTextB,cnvW/2,cnvH/2);
  insTxgrEndPl = new elementsUI(grEndTxPl,grEndTxPlB,cnvW/2,cnvH/2);
  insTxgrEndgh = new elementsUI(grEndTxgh,grEndTxghB,cnvW/2,cnvH/2);
  insTxgrEndTie = new elementsUI(grEndTxTie,grEndTxTieB,cnvW/2,cnvH/2);

  collect = new elementsUI(mCollectText,'.',cnvW/2,cnvH/2);
  comeback = new elementsUI(mComebackText,'.',cnvW/2,cnvH/2);

  wpBooth = new fairBooth(100,100,200,100,255,255,255,2);
  grBooth = new fairBooth(600,100,200,100,255,255,255,3);
  chBooth = new fairBooth(100,300,200,100,255,255,255,4);
  prBooth = new fairBooth(600,300,200,100,255,255,255,5);
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

  if((scene === 1) && (allowMovement === false)) {
    if(keyCode === ENTER) {
      goToScene2 = true;
      return;
    }
  }

  if((scene === 2) && (roundEnded === true)) {
    if(keyCode === ENTER) {
      goToHub = true;
    }
  }
  
  if((scene === 3) && (raceStart === true)) {
    if(!reachedfLine) {
      if (keyCode === 32) {
        grPlayerGhost.eX += grPlayerGhost.grSpeed;
      }
    } else if (reachedfLine) {
      if (keyCode === 32) {
      return;
      }
    }
  }

  if(scene === 4) {
    if(chestCounter === 4) {
      if (keyCode === 32) {
        roundEnded = true;
      }
    }
  }
  
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
    allowMovement = true;
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
    if(ghostFailedToPhase){
      wplGhost.isPhasing = false;
    }
  }

  if(scene === 3) {
    grEndButton.clicked();
  }

  if(scene === 4) {
    advanceButton.clicked();
  }

  if(scene === 5) {
    exitButton.clicked();
  }
  
  if(scene === 5) {
    if(!item1_isSold && avail_Balance >= price1) {
      if(mouseX >= 100 && mouseX <= 250 && mouseY >= 162 && mouseY <= 312) {
      avail_Balance -=price1;
      pValue = avail_Balance;
      item1_isSold = true;
      playerAvatar.currentTint = color(158,189,144);
      }
    }

    if(!item2_isSold && avail_Balance >= price2) {
      if(mouseX >= 380 && mouseX <= 530 && mouseY >= 162 && mouseY <= 312) {
      avail_Balance -=price2;
      pValue = avail_Balance;
      item2_isSold = true;
      playerAvatar.currentTint = color(255,177,203);
      }
    }

    if(!item3_isSold && avail_Balance >= price3) {
      if(mouseX >= 650 && mouseX <= 800 && mouseY >= 162 && mouseY <= 312) {
      avail_Balance -=price3;
      pValue = avail_Balance;
      item3_isSold = true;
      playerAvatar.currentTint = color(250,207,84);
      }
    }   
  }
}

function mouseReleased() {
  if(scene === 2) {
    wplGhost.isPhasing = false; 
    if(ghostFailedToPhase){
      wplGhost.isPhasing = false;
    }
  }
}

class elementsUI {
  constructor (msg, val, xUI, yUI) {
    this.message = msg;
    this.value = val;
    this.x = xUI;
    this.y = yUI;
    this.size = 20;

    this.rewardVal= 0;

    this.tColorOpacity = 255;
  }

  chestReward(reVal) {
    this.rewardVal += reVal;
    this.message = 'Score: ' + this.rewardVal;
  }

  showUI () {
    textSize(this.size);
    strokeWeight(4);
    fill(255,255,255);
    text(this.message,this.x,this.y);
  }

  upTextSize (nSize) {
    push();
    textAlign(CENTER,CENTER);
    this.size = nSize;
    textSize(nSize);
    fill(255,255,255,this.tColorOpacity);
    text(this.message,(this.x-10),this.y);
    pop(); 
  }

  update(upVal) {
    this.val = upVal;
    this.message = 'Score: ' + upVal;
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

    this.hcR = 255;
    this.hcG = 255;
    this.hcG = 255;

    this.ucR = bcR;
    this.ucG = bcG;
    this.ucB = bcB;

    this.cBopacity = 255;
  } 

  show() {
    fill(this.cR,this.cG,this.cB,this.cBopacity);
    stroke(this.s, this.cBopacity);
    strokeWeight(this.sW);
    rect(this.x,this.y,this.w,this.h,this.r);
  }

  highlight() {
    if(mouseX >= this.x && mouseX <= (this.x + this.w) &&
       mouseY >= this.y && mouseY <= (this.y + this.h)) {
         this.cR = this.hcR;
         this.cG = this.hcG;
         this.cB = this.hcB;
       }else {
         this.cR = this.ucR;
         this.cG = this.ucG;
         this.cB = this.ucB;
       }
  }

  clicked() {
    if(mouseX >= this.x && mouseX <= (this.x + this.w) &&
       mouseY >= this.y && mouseY <= (this.y + this.h)) {
      if(scene === 0) {
        scene = 1;
      }
        
      if(scene === 3) {
        goToHub = true;
      }

      if(scene === 4) {
        if(probabilityValue <= 5) {
          pLocationReset(playerAvatar);
          allowMovement = true;
          moveSpeed = 6;
          noCursor(); 
          scene = 1;
          goToScene2 = false;
          assetsReady = false;
          probabilityValue = 0;
          clAvatar = null;
        } else {
          hideMsg = true;
          noCursor();
        }
      }


      if(scene === 5) {
        pValue = avail_Balance;
        points.update(pValue);

        getting_Balance = false;
        roundEnded = false;

        pLocationReset(playerAvatar);
        allowMovement = true;
        moveSpeed = 6;

        goToHub = false;
        goToScene2 = false;
        

        noCursor();

        scene = 1;

      }
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
      allowMovement = false;
      if(!allowMovement) {
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

      if(goToScene2) {
        obj.boothId(this.fbScene);
        allowMovement = true;
      }
    }
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

    this.currentTint = color(255,255,255);

    this.isPhasing = false;
    this.imgOpacity = 255;

    this.grTint = 255;
    this.grTopa = 255;
    this.grSpeed = 1;
  }

  grlMkGh(x,y,r,aR,aG,aB,gT,gO,gS) {
    this.eX = x;
    this.eY = y;
    this.ecR = r;

    this.eR = aR;
    this.eG = aG;
    this.eB = aB;

    this.grTint = gT;
    this.grTopa = gO;
    this.grSpeed = gS;
  }

  moveOpp() {
    if(!reachedfLine) {
      this.eX += this.grSpeed;
    }
  }

  grlShowGhost() {
    push();
    fill(this.eR,this.eG,this.eB);
    ellipse(this.eX,this.eY,this.ecR,0);
    
    tint(this.eR,this.eG,this.eB,this.grTopa);
    image(playerSprite[4],(this.eX-(this.ecR/2)),(this.eY-(this.ecR/2)),this.ecR,this.ecR);
    pop();
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

    fill(255,255,255,0);
    ellipse(this.eX - 95, this.eY + 165, 75);
  }
  showHub() {
    let xOffset = 25;
    let yOffset = 25;
    let ghostW = 50;
    let ghostH = 50;

    push();

    if(this.currentTint) {
      tint(this.currentTint);
    }

    if(!allowMovement || (!aIsPressed && !dIsPressed && !sIsPressed && !wIsPressed)) {
      image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH); 
    } else if(aIsPressed && (dIsPressed || wIsPressed || sIsPressed) || dIsPressed && (wIsPressed || sIsPressed || aIsPressed) || wIsPressed && (aIsPressed || sIsPressed || dIsPressed) || sIsPressed && (wIsPressed || aIsPressed || dIsPressed)) {
      image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
    } else {
      if(aIsPressed) {
        image(playerSprite[2],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      } else if(dIsPressed) {
        image(playerSprite[3],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      } else if(wIsPressed) {
        image(playerSprite[1],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      } else if(sIsPressed) {
        image(playerSprite[0],this.eX - xOffset,this.eY - yOffset, ghostW, ghostH);
      }
    //ellipse(this.eX, this.eY, this.ecR);
    }
    pop();
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

class Obstacle {
  constructor () {
  this.wX = cnvW ; 
  this.wY = 50;
  this.wW = random(40,60);
  this.wH = cnvH;
  this.wSpeed = wallSpeed;

  this.ecY = 415;
  this.ecR = this.wW;
  }

  show() {
    let x1,x2,x3,x4,y1,y2,y3,y4;

    x1 = random(this.wX,(this.wX-10) + this.wW);
    x2 = random(this.wX,(this.wX-10) + this.wW);
    x3 = random(this.wX,(this.wX-10) + this.wW);
    x4 = random(this.wX,(this.wX-10) + this.wW);

    y1 = 50;
    y2 = 200;
    y3 = 300;
    y4 = 500;
    
    fill(0,126,255,90);
    rect(this.wX,this.wY,this.wW,this.wH);

    push();
    fill(255,0,0,0);
    ellipse(this.wX + (this.wW/2),this.ecY,this.ecR);
    pop();

    push();
    noFill();
    strokeWeight(1);
    stroke(0,0,255,126);
    bezier((x1-5),y1,(x2-5),y2,(x3-5),y3,(x4-5),y4);  
    bezier(x1,y1,x2,y2,x3,y3,x4,y4);
    bezier((x1+5),y1,(x2+5),y2,(x3+5),y3,(x4+5),y4);
    pop();
    
  }

  wallMovement() {
    this.wX -= this.wSpeed;
  }
}

class Collectable {
  constructor (colX,colY) {
    this.collectX = colX;
    this.collectY = colY;
   
    this.wasPickedUp = false;
    
    this.collectRarity = floor(random(1,11));

    if(this.collectRarity === 10) {
      this.collectW = 110;
      this.collectH = 110;
      this.rewardValue = 500;
      this.imageIndex = 3;
      this.collectDescription = 'a Diamond Chest';
    } else if(this.collectRarity >= 8) {
      this.collectW = 100;
      this.collectH = 60;
      this.rewardValue = 100;
      this.imageIndex = 2;
      this.collectDescription = 'a Gold Chest';
    } else if(this.collectRarity >= 5) {
      this.collectW = 70;
      this.collectH = 60;
      this.rewardValue = 50;
      this.imageIndex = 1;
      this.collectDescription = 'a Silver Chest';
    } else {
      this.collectW = 70;
      this.collectH = 60;
      this.rewardValue = 10;
      this.imageIndex = 0;
      this.collectDescription = 'a Wood Chest';
    }

    this.collision_CoordinateX = this.collectX + (this.collectW/2);
    this.collision_CoordinateY = this.collectY + (this.collectH/2);

  }

  showCollectable() {
    if(this.wasPickedUp === false) {
      image(chestSprite[this.imageIndex], this.collectX, this.collectY, this.collectW, this.collectH);
      console.log(this.collision_CoordinateX);
      console.log(this.collision_CoordinateY);

      fill(255,0,0,0);
      ellipse(this.collision_CoordinateX, this.collision_CoordinateY, clAvatar.ecR+13);
    }
  }

  checkDistance(objP_ghost) {
    let playerGhost = objP_ghost;

    let p_centerX =playerGhost.eX; 
    let p_centerY =playerGhost.eY;

    let c_centerX =this.collision_CoordinateX; 
    let c_centerY =this.collision_CoordinateY; 

    if(this.wasPickedUp) {
      return 0;
    }

    let rad_sum = ((playerGhost.ecR/2) + ((clAvatar.ecR+13)/2));
  
    let distance = dist(c_centerX,c_centerY, p_centerX,p_centerY);

    if(distance < rad_sum) {
      this.wasPickedUp = true;
      chestCounter+= 1;
      return this.rewardValue;
    }
    return 0; 
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
  let getPoints = 0;
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
  let winConditionMet = false;
  let spawnWalls = 200;
  let distToTrap;
  let ghostColX;
  let ghostColY;
  let scoreTracking = 0;
  let area = 'wpLv';
  
  noCursor();
  soundManager(area);

  image(wpBackground,posX,posY,cnvW,cnvH);

  //score background
  push();
  fill(0);
  rect(0,0,cnvW,50);
  pop();
  //display score text and numbers

  score.showUI();

  if(wplGhost === null) {
    winConditionTriggerValue = floor(random(5,16));
    wplGhost = new Player(50);
  }

  nTraps = winConditionTriggerValue-scValue; 
  
  ghostColX = wplGhost.eX - 103; 
  ghostColY = wplGhost.eY + 165;

  push();
  fill(255);
  textSize(20);
  text('Traps Remaining: ' + max(0,nTraps), 660, 35);
  pop();

  if(frameCount % floor(spawnWalls) === 0) {
    cWalls.push(new Obstacle());
  }

  for(let i = 0; i < cWalls.length; i++) {
    //let x = 0;
    if(cWalls[i].wX > -150 && cWalls[i].wX < cnvW) {  
      let objSum;
      cWalls[i].show();
    

      distToTrap = dist(ghostColX,ghostColY,(cWalls[i].wX + cWalls[i].wW/2), cWalls[i].ecY); 

      objSum = 50 + (cWalls[i].ecR/2);

      if(distToTrap < objSum && !wplGhost.isPhasing) {
        ghostFailedToPhase = true;
        for(let w = 0; w < cWalls.length; w++) {
          cWalls[w].wSpeed = 0;
        }

        if( i === 0 ) {
          scoreTracking = 0;  
          scValue = scoreTracking;
        }

        if(ghostFailedToPhase && i > scoreTracking){
          scoreTracking = i;
          scValue = scoreTracking;
        }      
      }else if(distToTrap < objSum && wplGhost.isPhasing) {
        scoreTracking =( i + 1);
        scValue = scoreTracking;
      }
    }
    cWalls[i].wallMovement();

    if((cWalls[i].wX +cWalls[i].wW < (ghostColX-50) && i ===    (winConditionTriggerValue-1))) {
        for(let w = 0; w < cWalls.length; w++) {
        cWalls[w].wSpeed = 0;
        }
        scoreTracking = i;
        winConditionMet = true;
      }

  }

  if(scValue > 0 && scValue % 5 === 0 && scValue !== lastSpeedVal) {
    wallSpeed += 2;
    lastSpeedVal = scValue;

    (spawnWalls*2) / wallSpeed;

    for(let i = 0; i < cWalls.length; i++) {
      cWalls[i].wSpeed = wallSpeed;
    }
  }

  wplGhost.wplShow();

  score.update(scValue);

  push();
  if(winConditionMet === true) {
    fill(0,0,0,190);
    rect(posX,posY,cnvW,cnvH);
    insTxWpWin.showUI();
    roundEnded = true;
    moveSpeed = 6;
  } 
  
  if(ghostFailedToPhase && scoreTracking < winConditionTriggerValue) {
    fill(0,0,0,190);
    rect(posX,posY,cnvW,cnvH);
    insTxWpEnd.showUI();
    roundEnded = true;
    moveSpeed = 6;
  }
  pop();

  if(roundEnded === true && goToHub === true) {
      pValue += scValue;
      points.update(pValue);

      pLocationReset(playerAvatar);

      roundEnded = false;
      ghostFailedToPhase = false;
      goToHub = false;
      goToScene2 = false;
      allowMovement = true;
      moveSpeed = 6;
      cWalls = [];

      scValue = 0;
      scoreTracking = 0;
      score.update(scValue);  
      wallSpeed = 2;
      lastSpeedVal = 0;
      spawnWalls = 200;
      wplGhost = null;
      winConditionTriggerValue = 0;

      scene = 1;
    }
}

function ghostRaceLv() {  
  let area = 'grLv';

  let message = 'BACK';
  let mW = 685;
  let mH = 385;
  let mC = 0;
    
  let scoreTracking = 0;
  
  soundManager(area);

  let fLineX;
  fLineX = 780;
  
  if(initGrL === false) {
   grPlayerGhost = new Player(50);
   grOpponentGhost = new Player(50);
   
   grPlayerGhost.grlMkGh(100,125,100,255,0,0,255,255,12);
   grOpponentGhost.grlMkGh(100,375,100,0,0,255,255,255,2);
   initGrL = true;
  }
 
  image(grBackground,posX,posY,cnvW,cnvH);
  
  timer += deltaTime;

  rStartUp();

  if(timer > 3000) {
    grPlayerGhost.grlShowGhost();
    grOpponentGhost.grlShowGhost();

    //display score and background rectangle at the top of canvas
    push();
    fill(0);
    rect(0,0,cnvW,50);
    score.showUI();
    pop();
    
    raceStart = true;
    grOpponentGhost.moveOpp();
  }

  if((grOpponentGhost.eX >= fLineX || grPlayerGhost.eX >= fLineX)) {
    reachedfLine = true;
    roundEnded = true;
  }

  //race end display.
  push();
  if(reachedfLine) {
    fill(0,0,0,190);
    rect(posX,50,cnvW,cnvH);
    if(grOpponentGhost.eX > grPlayerGhost.eX) {
      insTxgrEndgh.upTextSize(70);
      cursor();
      scoreTracking = 0;
      scValue = scoreTracking;
      score.update(scValue);
      grEndButton.highlight();
      grEndButton.show();
      push();
      fill(mC);
      textSize(40);
      text(message,mW,mH);
      pop();
      //console.log('Ghost Won!')
    }else if(grPlayerGhost.eX > grOpponentGhost.eX) {
      insTxgrEndPl.upTextSize(70);
      cursor();
      scoreTracking = 100;
      scValue = scoreTracking;
      score.update(scValue);
      grEndButton.highlight();
      grEndButton.show();
      push();
      fill(mC);
      textSize(40);
      text(message,mW,mH);
      pop();
      //console.log('You Won!');
    }else if (grPlayerGhost.eX == grOpponentGhost.eX) {
      cursor();
      insTxgrEndTie.upTextSize(70);
      cursor();
      scoreTracking = 50;
      scValue = scoreTracking;
      score.update(scValue);
      grEndButton.highlight();
      grEndButton.show();
      push();
      fill(mC);
      textSize(40);
      text(message,mW,mH);
      pop();
      //console.log('Tie');
    }
  }
  pop();

  if (roundEnded === true && goToHub === true) {
    pLocationReset(playerAvatar);
    pValue += scValue;
    points.update(pValue);

    timer = 0;
    raceStart = false;
    reachedfLine = false;
    roundEnded = false;
    goToHub = false;
    goToScene2 = false;
    allowMovement = true;
    moveSpeed = 6;
    initGrL = false;
    scValue = 0;
    scoreTracking = 0;
    score.update(scValue);
    noCursor();
    grOpponentGhost = null;
    grPlayerGhost = null;
    
    scene = 1;
  }
}

function chaseLv() {
  noCursor();
  let area = 'cLv';
  let playerSize = 50;
  let scorebg = 50;
  let scoreTracking = 0;
 
  soundManager(area);

  if(assetsReady === false) {
    clAvatar = new Player(playerSize);
    clAvatar.currentTint = playerAvatar.currentTint;
    chestOne = new Collectable(225,125);
    chestTwo = new Collectable(615,125);
    chestThree = new Collectable(225,315);
    chestFour = new Collectable(615,315);

    probabilityValue = floor(random(1,11));

    assetsReady = true;
  }

  image(clBackground,posX,posY,cnvW,cnvH);

  if(probabilityValue > 5) { 
    push()
    fill(0,0,0);
    rect(0,0,cnvW,scorebg);
    pop();
  score.showUI(scoreTracking);
  }
  if(hideMsg === false && probabilityValue !== null) {
    showMessage(probabilityValue); 
  }
  
  if(probabilityValue > 5 && hideMsg) {
    clAvatar.eX = constrain(clAvatar.eX,playerSize,(cnvW - playerSize));
    clAvatar.eY = constrain(clAvatar.eY,(playerSize + 24),(cnvH - 72));

    if(chestCounter  <4) {
      allowMovement = true;
      moveSpeed = 6;
    } else {
      allowMovement = false;
      moveSpeed = 0;
    }

    chestOne.showCollectable();
    chestTwo.showCollectable();
    chestThree.showCollectable();
    chestFour.showCollectable();

    clAvatar.showHub();
    clAvatar.move();

    scoreTracking += chestOne.checkDistance(clAvatar);
    scoreTracking += chestTwo.checkDistance(clAvatar);
    scoreTracking += chestThree.checkDistance(clAvatar);
    scoreTracking += chestFour.checkDistance(clAvatar);
    
    if(scoreTracking > 0) {
      scValue = scoreTracking
      score.chestReward(scValue);
      console.log(chestCounter);
      }
    }

    if(chestCounter == 4) {
      push();
      fill(0,0,0,190);
      rect(0,0,cnvW,cnvH);
      pop();

      push();
      fill(255);
      textSize(30);
      text('Press (SPACE) to return to the Hub', 200, 250);
      pop();

    }

    if(roundEnded == true) {
      pLocationReset(playerAvatar);

      pValue += score.rewardVal;
      points.update(pValue);

      clAvatar = null;
      chestOne = null;
      chestTwo = null;
      chestThree = null;
      chestFour = null;
      assetsReady = false;

      hideMsg = false;

      allowMovement = true;
      chestCounter = 0;
      moveSpeed = 6;
      scoreTracking = 0;
      probabilityValue = null;
      goToHub = false;
      goToScene2 = false;
      
      scValue = 0;
      score.rewardVal = 0;
      score.update(scValue);

      roundEnded = false;
      
      scene = 1; 
    }
}

function prizeLv() {
  cursor(ARROW);
  let area = 'prLv';
  soundManager(area);


  if(!getting_Balance) {
    avail_Balance = pValue;
    getting_Balance = true;
  }

  image(plBackground,posX,posY,cnvW,cnvH);

  push();
  push();
  fill(0,0,0)
  rect(0,25,300,50);
  pop();
  fill(255);
  textSize(20);
  text('Balance: ' + avail_Balance,10,55);
  pop();

  if(avail_Balance >= price1) {
    canBuy1 = true;
  }


  if(!item1_isSold) {
    push();
    if(mouseX >= 100 && mouseX <= 250 && mouseY >= 162 && mouseY <= 312) {
      stroke(35,101,51); 
    }else {
      stroke(255,126,0);
    }
    strokeWeight(4);
    fill(126,126,126);
    rect(100,162,150,150,30);
    push();
    tint(158,189,144);
    image(playerSprite[0],125,187,100,100);
    pop();
    pop();
    push();
    fill(255);
    text('$' + price1, 140,337);
    pop();   
  }

  if(!item2_isSold) {
    push();
    if(mouseX >= 380 && mouseX <= 530 && mouseY >= 162 && mouseY <= 312) {
      stroke(35,101,51); 
    }else {
      stroke(255,126,0);
    }
    strokeWeight(4);
    fill(126,126,126);
    rect(380,162,150,150,30);
    push();
    tint(255,177,203);
    image(playerSprite[0],405,187,100,100);
    pop();
    pop();
    push();
    fill(255);
    text('$' + price2, 420,337);
    pop();
  }

  if(!item3_isSold) {
    push();
    if(mouseX >= 650 && mouseX <= 800 && mouseY >= 162 && mouseY <= 312) {
      stroke(35,101,51);
    }else {
      stroke(255,126,0);
    }
    strokeWeight(4);
    fill(126,126,126);
    rect(650,162,150,150,30);
    push();
    tint(250,200,84);
    image(playerSprite[0],675,187,100,100);
    pop();
    pop();push();
    fill(255);
    text('$' + price3, 690,337);
    pop();
  }

  push();
  exitButton.highlight();
  exitButton.show();
  pop();

  push();
  fill(255);
  textSize(25);
  text('Exit Shop',700,423);
  pop();
}

function rStartUp() {
  push();
  
  if (timer > 0 && timer < 3001) {
  fill(0,0,0,126);
  rect(posX,posY,cnvW,cnvH);
  }

  if(timer > 0 && timer <= 1000) {
    readyText.upTextSize(264);

  }

  if(timer > 1000 && timer <= 2000) {
    setText.upTextSize(270);
  }

  if(timer > 2000 && timer <= 3000) {
    goText.upTextSize(270);
  }
  pop();
}

function soundManager(sA) {
  let location = sA;

  if (sA === 'mMenu' ){
    if(!mmSound.isPlaying()) {
      mmSound.play();
    } 
  }
  
  if (sA === 'mHub') {
    mlSound.setVolume(0.25);
    
    if(mmSound.isPlaying()) {
      mmSound.stop();
    }
    
    if(wplSound.isPlaying()) {
      wplSound.stop();
    }

    if(grlSound.isPlaying()) {
      grlSound.stop();
    }

    if(prlSound.isPlaying()) {
      prlSound.stop();
    }
    
    if(clSound.isPlaying()) {
      clSound.stop();
    }

    if(!mlSound.isPlaying()) {
      mlSound.play();
    } 
  }

  if (sA === 'wpLv') {
    wplSound.setVolume(0.25);

    if(mmSound.isPlaying()) {
      mmSound.stop();
    }

    if(mlSound.isPlaying()) {
      mlSound.stop();
    }

    if(grlSound.isPlaying()) {
      grlSound.stop();
    }

    if(prlSound.isPlaying()) {
      prlSound.stop();
    }

    if(clSound.isPlaying()) {
      clSound.stop();
    }

    if(!wplSound.isPlaying()) {
      wplSound.play();
    }

    if(roundEnded === true) {
      wplSound.stop();
    }
  }

  if (sA === 'grLv') {
    grlSound.setVolume(0.25);

    if(mmSound.isPlaying()) {
      mmSound.stop();
    }

    if(mlSound.isPlaying()) {
      mlSound.stop();
    }
    
    if(wplSound.isPlaying()) {
      wplSound.stop();
    }
    
    if(prlSound.isPlaying()) {
      prlSound.stop();
    }

    if(clSound.isPlaying()) {
      clSound.stop();
    }
    
    if(!grlSound.isPlaying()) {
      grlSound.play();
    }

    if(roundEnded === true) {
      grlSound.stop();
    }
  }

  if (sA === 'prLv') {
    prlSound.setVolume(0.25);

    if(mmSound.isPlaying()) {
      mmSound.stop();
    }

    if(mlSound.isPlaying()) {
      mlSound.stop();
    }

    if(wplSound.isPlaying()) {
      wplSound.stop();
    }

    if(grlSound.isPlaying()) {
      grlSound.stop();
    }

    if(clSound.isPlaying()) {
      clSound.stop();
    }

    if(!prlSound.isPlaying()) {
      prlSound.play();
    }
  }

  if (sA === 'cLv') {
    clSound.setVolume(0.25);

    if(mmSound.isPlaying()) {
      mmSound.stop();
    }

    if(mlSound.isPlaying()) {
      mlSound.stop();
    }

    if(wplSound.isPlaying()) {
      wplGhost.stop();
    }

    if(grlSound.isPlaying()) {
      grlSound.stop();
    }

    if(prlSound.isPlaying()) {
      prlSound.stop();
    }

    if(!clSound.isPlaying()) {
      clSound.play();
    }
  }
}

function pLocationReset(pObj) {
  let plObject = pObj;
  plObject.eX = cnvW/2;
  plObject.eY = cnvH/2;
}

function roundEnd(value) {
  let val = value;
  return value;
}

function showMessage(pV){
  cursor(ARROW);
  let value = pV;
  //console.log(value);

  let tcO = 255;
  let bgOpacity = 190;

  if(hideMsg === true) {
    bgOpacity = 0;
    collect.tColorOpacity = 0;
    comeback.tColorOpacity = 0;
    advanceButton.cBopacity = 0;
    tcO = 0;
    noCursor();
  }

  let tSize = 30;
  let tX = 660;
  let tY = 385;
  let bText;

  push();
  fill(0,0,0,bgOpacity);
  rect(0,0,cnvW,cnvH);
  pop();
  if (value <= 5){
    //console.log(probabilityValue);
    comeback.upTextSize(30);
    
    bText = 'Back to Hub';
  } else {
    //console.log(probabilityValue);
    collect.upTextSize(30);
    bText = 'Enter Room';
  }

  if(hideMsg === false) {
    push();
    advanceButton.highlight();
    advanceButton.show();
    pop();  
  }

  push();
  fill(0,0,0,tcO);
  textSize(tSize);
  text(bText,tX,tY);
  pop();
}
