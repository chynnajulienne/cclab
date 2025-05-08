let river;
let island;
let smallerIsland;
let flowers = [];
let video;
let bodyPose;
let poses = [];
let showVideo = false; // turn to true to turn on video
let tree;

// Load ml5 library
function preload() {
  bodyPose = ml5.bodyPose(); 
}

function setup() {
  createCanvas(800, 500); 

  river = new River();
  island = new Island();
  smallerIsland = new SmallerIsland();
  tree = new Tree(280, 345); 

  video = createCapture(VIDEO);
  video.size(800, 500); 
  video.hide();

  bodyPose.detectStart(video, gotPoses);

  flowers.push(new Flower(50, height / 2 + 95));
  flowers.push(new Flower(340, height / 2 + 95));
  flowers.push(new Flower(155, height / 2 + 220)); // island flower
  flowers.push(new Flower(590, height / 2 + 90));
  flowers.push(new Flower(720, height / 2 + 120));
}

function draw() {
  background(200, 240, 255);

  island.display();
  river.display();
  smallerIsland.display();
  tree.display();

  if (showVideo) {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  }

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update(poses);
    flowers[i].display();
  }
}

function gotPoses(results) {
  poses = results;
}

class River {
  constructor() {
    this.x1 = 0;
    this.x2 = 800;
    this.y1 = 370;
    this.y2 = 380;
  }

  display() {
    noStroke();
    fill(70, 130, 180);
    beginShape();
    vertex(this.x1, this.y1);
    bezierVertex(80, 320, 620, 420, this.x2, this.y2); 
    vertex(this.x2, 500);
    bezierVertex(640, 510, 160, 510, this.x1, 500); 
    endShape(CLOSE);
  }
}

class Island {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.w = 800;
    this.h = 200;
  }

  display() {
    noStroke();
    push();
    fill(184, 134, 11);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

class SmallerIsland {
  constructor() {
    this.offsetY = 90; 
  }

  display() {
    noStroke();
    fill(184, 134, 11);
    beginShape();
    vertex(0, 370 + this.offsetY);
    bezierVertex(200, 320 + this.offsetY, 600, 420 + this.offsetY, 800, 390 + this.offsetY);
    vertex(800, 500 + this.offsetY);
    bezierVertex(640, 510 + this.offsetY, 160, 520 + this.offsetY, 0, 500 + this.offsetY);
    endShape(CLOSE);
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    noStroke();
    fill('green');
    circle(this.x + 40, this.y - 200, 100);
    circle(this.x + 40, this.y - 140, 100);
    circle(this.x - 20, this.y - 240, 100);
    circle(this.x - 40, this.y - 140, 120);
    circle(this.x - 60, this.y - 190, 100);

    fill(139, 69, 19);
    beginShape();
    vertex(this.x - 10, this.y);
    bezierVertex(this.x - 20, this.y - 160, this.x - 50, this.y - 100, this.x, this.y - 150);
    bezierVertex(this.x + 20, this.y - 20, this.x + 30, this.y - 420, this.x + 30, this.y);
    endShape(CLOSE);
  }
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
  }

  update(poses) {
    let headX = this.x;
    let headY = this.y - 80;
    let relevantKeypoints = [5, 6, 11, 12];
    let found = false;

    for (let p = 0; p < poses.length; p++) {
      let pose = poses[p];
      for (let i = 0; i < relevantKeypoints.length; i++) {
        let index = relevantKeypoints[i];
        let kp = pose.keypoints[index];
        if (kp.confidence > 0.1) {
          let d = dist(kp.x, kp.y, headX, headY);
          if (d < 100) {
            this.swayPhaseOffset = kp.x < this.x ? PI : 0;
            this.animationProgress = 1;
            this.lastTriggerFrame = frameCount;
            this.triggered = true;
            found = true;
            break;
          }
        }
      }
      if (found) {
        break;
      }
    }

    let framesSinceTrigger = frameCount - this.lastTriggerFrame;
    if (framesSinceTrigger > 0 && this.triggered) {
      this.animationProgress = max(0, 1 - framesSinceTrigger / 180);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    let swayAngle = sin(frameCount * 0.08 + this.swayPhaseOffset) * PI / 48 * this.animationProgress;
    rotate(swayAngle);

    stroke(34, 139, 34);
    strokeWeight(6);
    line(0, 0, 0, -80);
    noStroke();
    fill(34, 139, 34);

    push();
    translate(-10, -35);
    let leftLeafAngle = sin(frameCount * 0.05) * PI / 30 * this.animationProgress;
    rotate(leftLeafAngle);
    ellipse(0, 0, 20, 10);
    pop();

    push();
    translate(10, -20);
    let rightLeafAngle = sin(frameCount * 0.05 + PI) * PI / 40 * this.animationProgress;
    rotate(rightLeafAngle);
    ellipse(0, 0, 20, 10);
    pop();

    push();
    translate(0, -80); 
    let headSway = sin(frameCount * 0.05) * PI / 30 * this.animationProgress;
    rotate(headSway);

    fill(255, 105, 180);

    push();
    translate(-12.5, 0);
    rotate(sin(frameCount * 0.06) * PI / 60 * this.animationProgress);
    ellipse(-7.5, 0, 30, 30);
    pop();

    push();
    translate(12.5, 0);
    rotate(sin(frameCount * 0.08 + PI) * PI / 60 * this.animationProgress);
    ellipse(7.5, 0, 30, 30);
    pop();

    push();
    translate(0, -12.5);
    rotate(sin(frameCount * 0.05) * PI / 80 * this.animationProgress);
    ellipse(0, -7.5, 30, 30);
    pop();

    push();
    translate(-7.5, 12.5);
    rotate(sin(frameCount * 0.03 + HALF_PI) * PI / 50 * this.animationProgress);
    ellipse(-4.5, 7.5, 30, 30);
    pop();

    push();
    translate(7.5, 12.5);
    rotate(sin(frameCount * 0.05 + PI / 3) * PI / 50 * this.animationProgress);
    ellipse(4.5, 7.5, 30, 30);
    pop();

    fill(255, 215, 0);
    noStroke();
    ellipse(0, 0, 25, 25);

    pop();
    pop();
  }
}