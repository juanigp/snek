var scrW = screen.innerWidth;
var scrH = screen.innerHeight;
var scl = 20;
var mySnake;
var food;


function setup(){
 createCanvas(600,600);
 // createCanvas(scrW,scrH);
  frameRate(10);
  noStroke();

  mySnake = new Snake();
  food = createVector(floor(random((width-scl)/scl))*scl,floor(random((height-scl)/scl))*scl )

}

function draw(){
  background(51);
  mySnake.update();
  mySnake.show();

  if (mySnake.eat(food)) {
    updateFood();
  }


  fill(255,0,100);
  rect(food.x,food.y,scl,scl);

}

function resetGame(){
  delete mySnake;
  mySnake = new Snake();
  food = createVector(floor(random((width-scl)/scl))*scl,floor(random((height-scl)/scl))*scl );
}


function updateFood(){
  food.x = floor(random((width-scl)/scl))*scl;
  food.y = floor(random((height-scl)/scl))*scl;
}
function keyPressed(){
  if ((keyCode === UP_ARROW)&&(mySnake.yspeed===0)){
    mySnake.dir(0,-1);
  }
  else if ((keyCode === DOWN_ARROW)&&(mySnake.yspeed===0)){
    mySnake.dir(0,1);
  }
  else if ((keyCode === LEFT_ARROW)&&(mySnake.xspeed===0)){
    mySnake.dir(-1,0);
  }
  else if ((keyCode === RIGHT_ARROW)&&(mySnake.xspeed===0)){
    mySnake.dir(1,0);
  }
}


function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    if ((this.x === pos.x) && (this.y === pos.y)){
      this.total++;
      return true;
    }else {
      return false;
    }
  }

  this.update = function(){

    var oldX = this.x;
    var oldY = this.y;

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    for (var i = 0; i < this.tail.length-1;i++){
      this.tail[i]=this.tail[i+1];
      if  ((this.x == this.tail[i].x) && (this.y == this.tail[i].y)){
        resetGame();
        break;
      }
    }
    this.tail[this.total-1] = createVector(oldX,oldY);





    if ((this.x===-scl)||(this.x===width)||(this.y===-scl)||(this.y===-1)){
      resetGame();
    }

  }

  this.show  = function(){
    fill(255);
    rect(this.x, this.y, scl, scl);
    for (var i = 0; i < this.total ; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }

  this.dir = function(i,j){
    this.xspeed = i;
    this.yspeed = j;
  }
}
