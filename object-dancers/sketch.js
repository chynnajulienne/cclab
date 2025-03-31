/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ChynnaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ChynnaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.bodyheight = 190
    this.yjump 
    this.legslength = 55;
    this.beakOpen = 0;
    this.wingFlap = 0;
    this.angle = 0;
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.bodyheight= 30*sin(frameCount*0.05)+100
    this.yjump = 90*sin(frameCount*0.05 + PI)
    this.legslength = map(this.yjump,-90,90,55,20)
    this.beakOpen = map(sin(frameCount * 0.1), -1, 1, 5, 20); 
    this.wingFlap = map(sin(frameCount * 0.1), -1, 1, -10, 10); 

    // dancing motion
    this.angle += 0.03; // speed of rotation
    this.x = width / 2 + 50 * cos(this.angle); 
    this.y = height / 2 + 50 * sin(this.angle);
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x,this.y+this.yjump);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    noStroke()
  
     
// Wings (More Realistic Flapping)
push();
fill(255,255,102)

translate(-70, 50); 
rotate(radians(this.wingFlap)); 
arc(0, 0, 80, 50, PI, 0, CHORD);
pop();

push();
fill(255,255,102)

translate(70, 50); 
rotate(radians(-this.wingFlap));  
arc(0, 0, 80, 50, PI, 0, CHORD);
pop();

//leg
fill(255,178,102)
rect(-25, 90, 10, this.legslength); //left leg
rect(25, 90, 10, this.legslength); //right leg

// Head and body with  tilt
push();
rotate(radians(this.bodyTilt)); // Add tilt
fill(255, 255, 102);
circle(0, 60 - this.bodyheight / 2, 110);
ellipse(0, 65, 160, this.bodyheight);
pop();


// Beak 
fill(255, 178, 102);
let beakY = 60 - this.bodyheight / 2 + 5; // Moves with head
triangle(-30, beakY, 3, beakY + 40 + this.beakOpen * 0.8, 31, beakY);
// Eye
  fill('black');
  let eyeY = 60 - this.bodyheight / 2 - 10;
  circle(25, eyeY, 10); // Left eye
  circle(-25, eyeY, 10); // Right eye





    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/