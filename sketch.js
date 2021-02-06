//creating the variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var cashG,diamondsG,jwelleryG,swordGroup;
var treasureCollection = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //load your images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");

}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
 //create groups 
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();


}

function draw() {

  background(0);
  
  //define gamestate play
  if(gameState==PLAY){
   //make the boy move with the mouse
  boy.x = World.mouseX; 
    
  //if boy is touching any treasure scores should increase
  if(boy.isTouching(cashG)){
   treasureCollection=treasureCollection+50; 
  }
  
  if(boy.isTouching(jwelleryG)){
   treasureCollection=treasureCollection+100; 
  }
  
  if(boy.isTouching(diamondsG)){
   treasureCollection=treasureCollection+150; 
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //the treasure should disapper when the boy touches it
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else{
      //if the boy touches any of the sword game should stop
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END;
    }
  }
 
 //defining gamestate end 
  if( gameState==END){
    boy.scale=1;
    boy.addAnimation("SahilRunning",endImg);
    boy.velocityX=0;
    path.velocityY=0;
    boy.x=200;
    boy.y=200;
    cashG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    diamondsG.destroyEach();
    
  }    
  }
  drawSprites();
  
  //display text score
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);  
  
}
//define function createcash
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}
//define function creatediamonds
function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

//define function createjewellery
function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}


//define function createsword
function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}