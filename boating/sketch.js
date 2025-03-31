let boat1;
let boat2;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  boat1 = new Boat(100,300);
  boat2 = new Boat(400,300);
}

function draw() {
  background(30,50,230);

    boat1.display();
    boat2.display();

}
  class Boat{
    constructor(){
      this.x = 100;
      this.y = 100;
      this.scaleFactor = 1;
    }
     display(){
   push();
   translate(this.x, this.y);
    scale(this.scaleFactor)

   noStroke();
  
   fill(20, 40, 90)
   arc(0, -20, 150, 90, 0, PI);

   this.drawSail();

   fill("red");
   circle(0, 0, 5)
   pop();
 }

 drawSail(){
  push();
  translate(0, -50);
  fill(200, 120, 90)
  triangle(0, -30, 20, 0, 0, 30)


  fill("green");
  circle(0, 0, 5)
  pop();
 }
  
}