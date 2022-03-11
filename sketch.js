var player, playerImg, PlayerBullets;
var kills;
var playerBulletsGroup, aliensGroup, leftAliensGroup, rightAliensGroup;
var gameState, play, end;
var bulletsRemain;

function preload() {
    playerImg = loadImage("./Assets/download.png");
    greenAlienImg = loadImage("./Assets/Alien1.png");
    blueAlienImg = loadImage("./Assets/Alien2.png");
    redAlienImg = loadImage("./Assets/Alien3.png");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    //Create The Player Ship
    player = createSprite(window.innerWidth /2, window.innerHeight/1.2);
    player.addImage(playerImg);
    player.scale = 1;

playerBulletsGroup = new Group();
aliensGroup = new Group();
leftAliensGroup = new Group();
rightAliensGroup = new Group();

    kills = 0
    play = 0;
    end = 1;
    gameState = play;
    bulletsRemain = 100;
}

function draw() {
    background("black");

    playerMovement();
    //keyTyped();
    collisions();
    spawnAliens();
    drawSprites();
}

function playerMovement() {
    if (keyDown("space")) {
        playersBullets();
    }

    if (keyDown("left")) {
        player.x = player.x - 10;
        console.log("left");
    }

    if (keyDown("right")) {
        player.x = player.x + 10;
        console.log("right");
    }
}

function keyTyped() {
    if (key === " " && gameState === play && bulletsRemain >= 1) {
      playersBullets();
    }
  }
  
function playersBullets() {
  if (gameState === play) {
    var playerBullet = createSprite(player.x, player.y, window.innerWidth/70, window.innerHeight/15);
    playerBullet.setCollider("rectangle", 0, 0, window.innerWidth/70, window.innerHeight/15);
    playerBullet.velocityY = - 15;
    playerBullet.debug = true;
    playerBulletsGroup.add(playerBullet);
    playerBullet.lifetime = 750;
    bulletsRemain = bulletsRemain - 1;
  }
}

function spawnAliens() {
    if (frameCount%150===0) {
      var leftAlien = createSprite(-10, random(30, window.innerHeight/2), 40, 40);
  
      switch(Math.round(random(2, 3))) {
        case 1:
        leftAlien.addImage(blueAlienImg);
        leftAlien.scale = 0.3;
        break;
  
        case 2:
        leftAlien.addImage(greenAlienImg);
        leftAlien.scale = 0.25;
        leftAlien.setCollider("rectangle", 0, 0, 275, 300);
        break;
  
        case 3:
        leftAlien.addImage(redAlienImg);
        leftAlien.scale = 0.08;
        leftAlien.setCollider("rectangle", 0, 0, 900, 900);
        break;
  
        default:
        break;
      }
      leftAlien.velocityX = 4;
      aliensGroup.add(leftAlien);
      leftAliensGroup.add(leftAlien);
      leftAlien.debug = true;
    }
  
    if (frameCount%160===0) {
      var rightAlien = createSprite(window.innerWidth + 10, random(30, window.innerHeight/2), 40, 40);
  
      switch(Math.round(random(2, 3))) {
        case 1:
        rightAlien.addImage(blueAlienImg);
        rightAlien.scale = 0.3;
        break;
  
        case 2:
        rightAlien.addImage(greenAlienImg);
        rightAlien.scale = 0.25;
        rightAlien.setCollider("rectangle", 0, 0, 275, 300);
        break;
  
        case 3:
        rightAlien.addImage(redAlienImg);
        rightAlien.scale = 0.08;
        rightAlien.setCollider("rectangle", 0, 0, 900, 900);
        break;
  
        default:
        break;
      }
      rightAlien.velocityX = -4;
      aliensGroup.add(rightAlien);
      rightAliensGroup.add(rightAlien);
  
      rightAlien.debug = true;
    }
}

function collisions() {
    if (aliensGroup.isTouching(playerBulletsGroup)) {
        for (var i=0;i<aliensGroup.length;i++) {     
            if (aliensGroup[i].isTouching(playerBulletsGroup)) {
                aliensGroup[i].destroy();
                kills = kills + 1;
            } 
        }
    }
}