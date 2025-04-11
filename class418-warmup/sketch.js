// let ball1;
// let ball2;

let basket = [];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // ball1 = new eggball(100,300);
  // ball2 = new eggball(200,100);

  //one single egg
  // let egg = new eggball(100,100)
  // basket.push(egg)

  for(let i = 0; i <100; i++){
    let egg = new eggball(random(0,width),random(0,height))
    basket.push(egg)
  }
}

function draw() {
  background("blue");

  // ball1.display()
  // ball1.update()

  // ball2.display()
  // ball2.update()
  for( let i =0; i<100; i++){
  basket[i].update();
  basket[i].display();
  }

}

class eggball {
  constructor(startX,startY) {
    this.x = startX;
    this.y = startY;
    this.eggsizeX=30
    this.eggsizeY=80
    this.speedX= random(-2,2)
    this.speedY= random(-2,2)
    this.scaleFactor = random(0.3,1)
  }

update(){
  this.x += this.speedX;
  this.y += this.speedY;

  if (this.x < 0 || this.x > width){
    this.speedX = -this.speedX
  }
  if (this.y < 0 || this.y > height){
    this.speedY = -this.speedY
  }
}
display() {
  push();
  translate(this.x,this.y);
  scale(this.scaleFactor)

  noStroke()
  fill(255,200)
  // circle(0,0,this.eggsize)
  arc(0,0,this.eggsizeX,this.eggsizeY, PI, 2*PI)
  // ellipse(0,0,this.eggsizeX,this.eggsizeX)
  arc(0,0,this.eggsizeX,this.eggsizeX,0,PI)

  

  pop()
}
}