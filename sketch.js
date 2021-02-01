PLAY  = 1;
END = 0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
 
  ground = createSprite(400,370,900,10);
ground.velocityX = -4;
  
  
  
  
  
  monkey = createSprite(50,370,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
   FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
 background("white");
  text("SURVIVAL TIME = "+score,200,200);
  
  
  
  if (gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);
    
  ground.x = ground.width/2;
  monkey.collide(ground);
  
  
  if (keyDown("space")&&monkey.y >=200 ){
    monkey.velocityY = -12;
    
    
    
  }
  //console.log(monkey.depth);
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  
  fruits();
  obstacles();
  drawSprites();
  
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  
  }
  
  if (gameState===END){
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    monkey.collide(ground);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    
    
    
    
  drawSprites();
  
    
    
  }
  
  
  
  
}

function fruits(){
  
  if (frameCount % 90 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    banana.scale = 0.1;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }



  
  
  
  
  
}

function obstacles(){
  if (frameCount % 150 === 0) {
  var obstacle = createSprite(600,340,40,10);
  obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    obstacle.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  

  
  
  
  }
  
}


