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

let toyZ = -1;
let toyA = -1;
let toySpeedY = 0;
let toyFalling = false;
let gravity = 0.5;
let bounceFactor = -0.7;

function setup() {
  // createCanvas(800, 500);
   let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container")
  angleMode(DEGREES);
}

function draw() {
  background(176, 224, 230);

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

  // Panel
  fill(180, 120, 40);
  rect(50, 20, 250, 80);
  drawMeat(80, 57);
  drawCatToy(400, 120);

  // Text at the top
  fill("white");
  textSize(16);
  text("feeding!", 105, 65);

  fill("white");
  textSize(16);
  text("hold to", 238, 55);
  text("play!", 245, 75);

  // Draw trees
  drawTree(90, 440, 30, 150); // left most
  drawTree(460, 440, 25, 140); // mid right
  drawTree(630, 399, 25, 145); // right most

  // check if the lion should start eating
  checkIfEating();

  // move lion to meat in x direction when it is eating
  if (eating) {
    xPos = lerp(xPos, meatX, 0.05);
    eatingDuration++;

    // Stop eating after some time
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

  // Check if the mouse is touching the lion's head or body
  if (
    mouseX > xPos - 125 &&
    mouseX < xPos + 125 &&
    mouseY > yPos - 125 &&
    mouseY < yPos + 50
  ) {
    xJitter = random(-4, 4); // purring when petting lion
  } else {
    xJitter = random(-1, 1); // Normal jitter
  }

  // call draw lion
  drawLion(xPos + xJitter, yPos + yOffset, direction, stepAngle);

  // Draw tree
  drawTree(267, 490, 35, 160);

  // Draw cat toy if it exists
  if (toyX >= 0 && toyY >= 0) {
    drawCatToy(toyX, toyY);
  }

  // Draw meat
  if (meatX >= 0 && meatY >= 0) {
    drawMeat(meatX, meatY);
  }
  
  // Draw bushes in the bottom corners
  drawBush(100, height - 100); // Bottom left corner
  drawBush(width - 100, height - 100); // Bottom right corner
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
  circle(x, y - trunkHeight - 120, 80); // Top leaf
  circle(x - 35, y - trunkHeight - 100, 70); // Extra left leaf
  circle(x + 35, y - trunkHeight - 100, 70); // Extra right leaf
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
    stroke(57, 255, 20); // Neon green when playing
  } else if (eating) {
    stroke(255, 105, 180); // Pink when eating
  } else {
    let yellowOscillation = map(sin(frameCount * 0.9), -1, 1, 200, 255); // Oscillates between darker and lighter yellow
    stroke(yellowOscillation, yellowOscillation * 0.9, 0);
  }

  // fill color of lion
  if (jumping) {
    fill(57, 255, 20); // Neon green when playing
  } else if (eating) {
    fill(255, 105, 180); // Pink when eating
  } else {
    let yellowOscillation = map(sin(frameCount * 0.9), -1, 1, 200, 255); // Oscillates between dark and light yellow
    fill(yellowOscillation, yellowOscillation * 0.9, 0);
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
  push();

  // Draw the main tennis ball (neon green)

  scale(0.5);
  fill(173, 255, 47); // Neon green color
  noStroke();
  ellipse(x, y, 100, 100); // Ball shape

  // Add a white curve for the tennis ball's seam
  stroke(255); // White color for the seam
  strokeWeight(8);
  noFill();
  beginShape();
  arc(x - 60, y, 100, 100, -45, 45);
  arc(x + 60, y, 100, 100, 135, 225);

  endShape();

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

function mousePressed() {
  // meat button is clicked
  if (mouseX >= 20 && mouseX <= 120 && mouseY >= 20 && mouseY <= 100) {
    meatX = random(100, width - 100);
    meatY = 300; // Ensure it's on the ground
    eating = true;
    eatingDuration = 0;
  }

  // toy button is clicked
  if (mouseX >= 140 && mouseX <= 240 && mouseY >= 20 && mouseY <= 100) {
    // toy infront of lion only
    let offset = 100 * direction;
    toyX = xPos + offset;
    toyY = 490;
    toySpeedY = 0; // Reset speed for jumping
    toyFalling = false; // Start jumping state
    jumping = true; // Start toy jump animation

    if (meatX > xPos) {
      direction = 1; // Face right
    } else {
      direction = -1; // Face left
    }
  }
}

function mouseReleased() {
  // Stop jumping when mouse is released
  if (mouseX >= 140 && mouseX <= 240 && mouseY >= 20 && mouseY <= 100) {
    toyX = -1;
    toyY = -1;
    jumping = false; // Stop toy jump animation

    jumping = false; // stop lion jump
  }
  
}

  function drawBush(x, y) {
    
  fill(128,128,0); // Bush green color
  ellipse(x - 40, y + 20, 100, 100);
  ellipse(x + 20, y +80, 100, 100);
  ellipse(x-70, y+85, 100, 100);
}
