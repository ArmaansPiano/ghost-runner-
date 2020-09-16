var gameState = "PLAY";
var spookySound;
var climberInvisible;
var invisGroup;
var ghostImage;
var ghost;
var climberImage;
var climber;
var climbersGroup;
var doorImage;
var door;
var doorsGroup;
var towerImage;
var tower;
function preload() {
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  doorsGroup=new Group();
  climberImage=loadImage("climber.png");
  climbersGroup = new Group();
  ghostImage=loadImage("ghost-standing.png");
  invisGroup = new Group();
  //spookySound = loadSound("spooky.wav");//
}
function setup() {
  createCanvas(600,600);
  //spookySound.loop();//
  tower=createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghoststand",ghostImage);
  ghost.scale = 0.4;
}
function draw() {
  background("black");
  if(gameState==="PLAY") {
    
  if(tower.y>400) {
    tower.y = 300;
  }
  if(keyDown("left")) {
    ghost.x = ghost.x-3;
  }
  if(keyDown("right")) {
  ghost.x = ghost.x+3;
  }
  if(keyDown("space")) {
ghost.velocityY = -8;
  }
  if(keyDown("w")) {
    ghost.velocityY = -8;
  }
  if(keyDown("a")) {
    ghost.x = ghost.x-3;
  }
  if(keyDown("d")) {
    ghost.x = ghost.x+3;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  spawnDoors();
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  if(invisGroup.isTouching(ghost) || (ghost.y > 600)) {
    ghost.destroy();
    gameState = "END";
  }
  drawSprites();
  }
    if(gameState === "END") {
      textSize(50);
      fill("white");
      textFont("serif");
      background("brown")
      text("GAME OVER",150,250);
      textSize(25);
      text("PLAY AGAIN!",225,300);
      textSize(20);
      text("Ghost Runner--made by Armaan Rajani", 150,50);
    }
  ghost.setCollider("circle",0,0,100);
  ghost.debug = true;
} 
function spawnDoors() {
  if(frameCount%240===0) {
var door = createSprite(200,-50);
    door.addImage("door",doorImage);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    ghost.depth = door.depth + 1;
    doorsGroup.add(door);
    climber = createSprite(200,10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    climberInvisible = createSprite(200,15);
    climberInvisible.width = climber.width;
    climberInvisible.height= 2;
    climberInvisible.visible = false;
    climberInvisible.x = door.x;
    climberInvisible.velocityY = 1;
    invisGroup.add(climberInvisible);
  }
}