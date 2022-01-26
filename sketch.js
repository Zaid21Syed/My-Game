var glassEntity, boss
var lab
var gameState = 0
var obstaclesGroup, obstacle1, obstacle2

function preload(){
  glassEntityImage = loadImage("glass entity.png")
  entityImage = loadImage("boss.png")
  labImage = loadImage("LAbBG.png")
  obstacle1 = loadImage("fireball.png");
  obstacle2 = loadImage("broken machine.png");
}

function setup() {
  createCanvas(800,400);
  lab = createSprite(1610, 160, 8000, 110)
  lab.addImage("lab", labImage)
  lab.scale = 0.5
  glassEntity = createSprite(250, 300, 80, 50)
  glassEntity.addImage("gEntity",glassEntityImage);
  glassEntity.scale = 0.05
  boss = createSprite(750, 150, 80, 50)
  boss.addImage("boss", entityImage)
  ground = createSprite(400, 310, 4000, 5)
  ground.visible = false
  
  obstaclesGroup = createGroup()
}

function draw() {
  background(255,255,255);  
  drawSprites();
  if (gameState === 0){
    lab.velocityX = -3
    controls()
    
  }
  else if (gameState === 1) {
    lab.velocityX = 0;
   
   glassEntity.velocityY = 0
   
   fill("red")
  textSize(50)
  text("YOU DIED!", 150,150)

   obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1)
 }
 else if (gameState === 2) {
  lab.velocityX = 0;
  glassEntity.velocityY = 0

  obstaclesGroup.setLifetimeEach(0)
  
  fill("red")
  textSize(50)
  text("YOU ESCAPED!!!", 150,150)
  

 }
  glassEntity.velocityY = glassEntity.velocityY+0.8
  glassEntity.collide(ground)

  boss.x = boss.x+0.28
//console.log(lab.x)
  spawnObstacles()
  
  if(obstaclesGroup.isTouching(glassEntity)){
    gameState = 1;
}
if(lab.x === -820){
  gameState = 2
}
  
}

function controls(){
  if(keyDown("space")&& glassEntity.y>280) {
    glassEntity.velocityY = -12;
  }
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(900,300,10,40);
    obstacle.velocityX = -6;
    
     
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle1);
               break;
       case 4: obstacle.addImage(obstacle2);
               break;
       case 5: obstacle.addImage(obstacle1);
               break;
       case 6: obstacle.addImage(obstacle2);
               break;
       default: break;
     }
    
     
     obstacle.scale = 0.08;
     obstacle.lifetime = 300;
     
    
     obstaclesGroup.add(obstacle);
  }
 }
 