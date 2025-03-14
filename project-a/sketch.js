let cloud1X = 50;
let cloud2X = 180;
let cloud3X = 300;
let cloud4X = 450;
let cloud5X = 600;
let cloud6X = 750;
let cloud7X = 550;
let cloud8X = 700;

let cloudSpeed = 1;

let xPos = 310;
let yPos = 350;
let speed = 2; 
let direction = 1; // 1 for right, -1 for left
let stepAngle = 0; // leg oscillation movement

let meatX = -1; 
let meatY = -1; 
let eating = false; 
let eatingDuration = 0; // duration for eating 

let toyX = -1;
let toyY = -1; 
let jumping = false; 

function setup() {
  createCanvas(800, 500);
   let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container")
  angleMode(DEGREES);
  
}

function draw() {
  background(176, 224, 230);
  
  //yo i changed

  // Text at the top
  fill(128, 128, 0);
  textSize(18);
  textAlign(CENTER, TOP);
  text("Press 'F' to feed or Hold 'P' to play", width / 2, 10);

  // Ground (sand)
  noStroke();
  fill(255, 248, 220);
  rect(0, 300, width, height); 

  // Clouds moving
  fill(255, 255, 255, 150);
  circle(cloud1X, 100, 160);
  cloud1X += cloudSpeed;
  if (cloud1X > width) cloud1X = -160;
  circle(cloud2X, 150, 160);
  cloud2X += cloudSpeed;
  if (cloud2X > width) cloud2X = -160;
  circle(cloud3X, 120, 180);
  cloud3X += cloudSpeed;
  if (cloud3X > width) cloud3X = -180;
  circle(cloud4X, 170, 180);
  cloud4X += cloudSpeed;
  if (cloud4X > width) cloud4X = -180;
  circle(cloud5X, 110, 170);
  cloud5X += cloudSpeed;
  if (cloud5X > width) cloud5X = -170;
  circle(cloud6X, 200, 180);
  cloud6X += cloudSpeed;
  if (cloud6X > width) cloud6X = -180;
  circle(cloud7X, 180, 160);
  cloud7X += cloudSpeed;
  if (cloud7X > width) cloud7X = -160;
  circle(cloud8X, 230, 180);
  cloud8X += cloudSpeed;
  if (cloud8X > width) cloud8X = -180;

  // Draw trees
  drawTree(90, 470, 30, 150);
  drawTree(500, 430, 25, 140);
  drawTree(200, 380, 30, 155);
  drawTree(630, 379, 25, 145);
  drawTree(327, 440, 35, 160);

  // Draw meat 
  if (meatX !== -1 && meatY !== -1) {
    drawMeat(meatX, meatY);
  }

  // check if the lion should start eating lol
  checkIfEating();

  // move lion to meat in x direction when it is eating
  if (eating) {
    xPos = lerp(xPos, meatX, 0.05); 
    eatingDuration++;

    // Stop eating after some tiem
    if ((xPos > meatX - 50 && xPos < meatX + 50) || eatingDuration > 200) {
      eating = false;
      meatX = -1; // Remove meat from screen after some time
      meatY = -1;
      eatingDuration = 0;
    }
  } else {
    // normal movement
    xPos += speed * direction;
    speed = map(sin(frameCount * 8), -1, 1, 1, 4);

    // reverse direction when reaching screen edges
    if (xPos > width - 110 || xPos < 110) {
      direction *= -1; // Flip the lion
    }

    // leg movement
    stepAngle += 5;
  }

  // bouncing while walking
  let yOffset = jumping ? sin(frameCount * 10) * 15 : sin(frameCount * 5) * 6;
  let xJitter = random(-1, 1);

  // call draw lion
  drawLion(xPos + xJitter, yPos + yOffset, direction, stepAngle);

  // Draw cat toy if it exists
  if (toyX !== -1 && toyY !== -1) {
    drawCatToy(toyX, toyY);
  }
}

function drawTree(x, y, trunkWidth, trunkHeight) {
  
  // Tree trunk
  fill(139, 69, 19); 
  rect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight); // Tree trunk

  // Tree leaves
  fill(128, 128, 0); 
  circle(x, y - trunkHeight - 40, 100); // Leaves size fixed
  circle(x - 25, y - trunkHeight - 60, 90); // Left side leaf
  circle(x + 25, y - trunkHeight - 60, 90); // Right side leaf
  circle(x, y - trunkHeight - 80, 80); // Top leaf
  circle(x - 35, y - trunkHeight - 100, 70); // Extra left leaf
  circle(x + 35, y - trunkHeight - 100, 70); // Extra right leaf
}

function drawMeat(x, y) {
  push();
  translate(x, y);
  scale(0.2); 
  // Meat body
  fill(200, 50, 50); 
  stroke(150, 30, 30); 
  strokeWeight(3);
  ellipse(0, 0, 200, 300); 

  // Draw the bone in the middle
  fill(240); 
  noStroke();

  ellipse(-30, 0, 40, 60); // Left part of the bone
  ellipse(30, 0, 40, 60); // Right part of the bone

  rect(-30, -10, 60, 20); // Middle part of the bone

  pop();
}

function drawCatToy(x, y) {
  fill(57, 255, 20); // Neon green 
  ellipse(x, y, 50, 50); 
}

function drawLion(x, y, dir, step) {
  push();

  // face towards the meat if it is eating
  if (eating) {
    
    // Flip direction based on where the meat is
    if (meatX < x) {
      dir = -1; 
    } else if (meatX > x) {
      dir = 1; 
    }
  }

  if (dir === 1) {
    translate(x, y);
    scale(-1, 1); // Flip the lion when moving toward left
  } else {
    translate(x, y);
  }

  // stroke color based on the lion's state
  if (jumping) {
    stroke(57, 255, 20); 
  } else if (eating) {
    stroke(255, 105, 180); 
  } else {
    stroke(255, 204, 0); 
  }

  // Set the fill color based on the lion's state
  if (jumping) {
    fill(57, 255, 20); 
  } else if (eating) {
    fill(255, 105, 180); 
  } else {
    fill(255, 204, 0); 
  }

  // Mane
  push();
  for (let i = 0; i < 360; i += 4) {
    let x1 = -110;
    let y1 = -70;

    let x2 = -110 + 100 * cos(i);
    let y2 = -70 + 100 * sin(i);

    let x3 = -110 + 75 * cos(i + 2);
    let y3 = -70 + 75 * sin(i + 2);

    stroke(184, 134, 11); // Mane color
    line(x1, y1, x2, y2);
    line(x1, y1, x3, y3);
  }
  pop();

  // Lion Body
  ellipse(0, 0, 250, 100);

  // Move front legs
  let frontLegOffset = sin(step) * 5;

  // Move back legs
  let backLegOffset = cos(step + 180) * 5;

  // Front Legs drawing
  rect(-90, 20 + frontLegOffset, 40, 60, 10);
  rect(-30, 20 - frontLegOffset, 40, 60, 10);

  // Back Legs drawing
  rect(30, 20 + backLegOffset, 40, 50, 10);
  rect(80, 20 - backLegOffset, 40, 50, 10);

  // Paws move with legs
  push();
  fill(180, 120, 40); // darkpaw color
  ellipse(-70, 75 + frontLegOffset, 40, 20);
  ellipse(-10, 75 - frontLegOffset, 40, 20);
  ellipse(50, 65 + backLegOffset, 40, 20);
  ellipse(100, 65 - backLegOffset, 40, 20);
  pop();

  // Tail
  push();
  translate(80, 20);
  strokeWeight(8);
  line(0, 0, 60, -70);
  fill(180, 120, 40); // Tail color
  ellipse(65, -75, 20, 20);
  pop();

  // Lion Head
  strokeWeight(2);
  circle(-110, -70, 100);

  // Eyes
  fill(0);
  circle(-125, -80, 10); // Left eye
  circle(-95, -80, 10); // Right eye

  // Nose
  fill(0);
  triangle(-115, -65, -105, -65, -110, -55);

  // Mouth (Smile)
  noFill();
  stroke(0);
  arc(-110, -50, 20, 10, 0, 90); //  mouth

  // Whiskers
  stroke(0);
  line(-130, -55, -150, -50); // Left whisker 1
  line(-130, -60, -150, -65); // Left whisker 2
  line(-130, -50, -150, -35); // Left whisker 3

  line(-90, -55, -70, -50); // Right whisker 1
  line(-90, -60, -70, -65); // Right whisker 2
  line(-90, -50, -70, -35); // Right whisker 3

  pop();
}

function checkIfEating() {
  if (
    eating === false &&
    xPos >= meatX - 40 &&
    xPos <= meatX + 40 &&
    yPos >= meatY - 40 &&
    yPos <= meatY + 40
  ) {
    eating = true; // Lion starts eating
  }
}

function keyPressed() {
  if (key === "f" || key === "F") {
    meatX = mouseX;
    meatY = mouseY;

    // Lion starts moving towards the meat
    eating = true;
    eatingDuration = 0; // Reset eating duration
  }
  if (key === "p" || key === "P") {
    toyX = random(100, width - 100);
    toyY = random(100, 300);
    jumping = true;
  }
}

function keyReleased() {
  if (key === "p" || key === "P") {
    // stop when p is released
    toyX = -1;
    toyY = -1;
    jumping = false;
  }
}
