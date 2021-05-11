var dog, happydog, database, foodS, foodStock ;
var database;


function preload()
{
	//load images here
  Dog = loadImage("images/dogImg.png");
  HappyDog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(400,400);

  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  dog = createSprite(200,220,20,20);  
  dog.addImage(Dog);
  dog.scale = 0.2; 
}


function draw() {  

background(46,138,87);


  textSize(16);
  fill(255);
  text("Press UP_ARROW key to feed your dog food",45,20);
  text("Food Remaining : " + foodS, 150,150);


  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(HappyDog);
  }

  drawSprites();
 
}


function writeStock(x){

  if (x <= 0){
    x = 0;
  }else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
}


