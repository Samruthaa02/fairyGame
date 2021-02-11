const Engine=Matter.Engine;
const Bodies=Matter.Bodies;
const World=Matter.World;

var engineWorld,engineObj;
var fairy,farirImg,fairyImg2;
var star,starImg,starBodies;
var bg,bgImg;
var edges;
var music;

function preload()
{
   //preload the images here
   fairyImg=loadAnimation("fairy1.png","fairy2.png");
   starImg=loadImage("star.png");
   bgImg=loadImage("starnight.png");
   music=loadSound("joyMusic.mp3");
   fairyImg2=loadImage("fairy.png");

}

function setup() {
  createCanvas(800, 800);
 
  engineObj=Engine.create();
  engineWorld=engineObj.world;

  bg=createSprite(400,400,10,10);
  bg.addImage(bgImg);
  bg.scale=0.5;
 
  fairy=createSprite(200,400,10,10);
  fairy.addAnimation("fairyFly",fairyImg);
  fairy.scale=0.2;
  //fairy.debug=true;
 
  var options={
    isStatic:true,
  }
  star=createSprite(750,100,10,10);
  star.addImage(starImg);
  star.scale=0.3;
  starBodies=Bodies.circle(750,100,10,options);
  World.add(engineWorld,starBodies);
  //star.debug=true; 
 
}


function draw() {
  Engine.update(engineObj);

  background("black");
  music.play();
  fairy.setCollider("rectangle", 0, 0, 100, 100,-45);

  edges = createEdgeSprites();
  fairy.bounceOff(edges);
  star.bounceOff(edges);

  star.x=starBodies.position.x;
  star.y=starBodies.position.y;

  if (keyDown("LEFT_ARROW")) fairy.x = fairy.x - 5;
  if (keyDown("RIGHT_ARROW")) fairy.x = fairy.x + 5;
  if (keyDown("DOWN_ARROW"))
    {
      Matter.Body.setStatic(starBodies,false);
     console.log("DOWN_ARROW")

    }
  if(star.y>360 && starBodies.position.y>360){
    Matter.Body.setStatic(starBodies,true);


  }

if (star.isTouching(fairy)){
  
    music.stop();
  //fairy.changeImage(fairyImg2);
}
  drawSprites();
}
