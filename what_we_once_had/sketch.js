let sun;
let river;
let island;
let smallerIsland;
let flowers = [];
let video;
let bodyPose;
let poses = [];
let showVideo = false; 
let tree = []

let mountain1;
let mountain2;

let clouds = [];


let plantLeaves = [];
let tulipFlower = [];
let plantShortGrass = [];
let lilypadding = [];



function preload() {
  bodyPose = ml5.bodyPose({flipHorizontal: true});
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
  mountain1 = new Mountain(0, 350, color(169, 169, 169));
  mountain2 = new Mountain(200, 370, color(120, 120, 120));
  
  river = new River();

  island = new Island();
  smallerIsland = new SmallerIsland();
  
//   tree = new Tree(300, 345);
//   tree2 = new Tree(780, 545);
  
   sun = new Sun(700, 100, 80);
  
    for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(50, 200);
    clouds.push(new Cloud(x, y));
  }



  // video = createCapture(VIDEO, {flipped:true});
  video = createCapture(VIDEO, {flipped:true});

  video.size(800, 500);
  video.hide();

  bodyPose.detectStart(video, gotPoses);



  flowers.push(new pinkFlower(50, height / 2 + 95));
  
  flowers.push(new pinkFlower(340, height / 2 + 95)); //middle

  
  flowers.push(new pinkFlower(155, height / 2 + 220)); // island flower
    flowers.push(new pinkFlower(435, height / 2 + 240)); // island flower

  flowers.push(new pinkFlower(590, height / 2 + 90));
  plantShortGrass.push(new shortGrass(600, height / 2 + 125)); //middle water

  

  plantLeaves.push(new plantVer1(100, height / 2 + 270)); //island left
  
  plantLeaves.push(new plantVer1(55, height / 2 + 320)); //island left
  
  plantLeaves.push(new plantVer1(775, height / 2 + 260)); //island right
  plantLeaves.push(new plantVer1(725, height / 2 + 300));//island right
  
  
    tulipFlower.push(new Tulip(105, height / 2 + 75)); //tree

  
    plantLeaves.push(new plantVer1(300, height / 2 + 300)); // middle

    tree.push(new treeOne(255, height / 2 + 95)); //tree
    tree.push(new treeOne(725, height / 2 + 260)); //righttree


  
  tulipFlower.push(new Tulip(40, height / 2 + 250)); // island left
  tulipFlower.push(new Tulip(255, height / 2 + 95)); //tree
  tulipFlower.push(new Tulip(510, height / 2 + 125)); //right
    tulipFlower.push(new Tulip(760,515)); //right

  
  plantShortGrass.push(new shortGrass(265, height / 2 + 95)); //middle tree
  plantShortGrass.push(new shortGrass(295, height / 2 + 105)); //middle tree

    plantShortGrass.push(new shortGrass(520, height / 2 + 140)); //middle right
    plantShortGrass.push(new shortGrass(500, height / 2 + 140)); //middle right
      plantLeaves.push(new plantVer1(540, height / 2 + 140)); //middle right


    plantShortGrass.push(new shortGrass(175, height / 2 + 85)); // left top
  
      plantShortGrass.push(new shortGrass(435, height / 2 + 85)); // left top
        plantShortGrass.push(new shortGrass(405, height / 2 + 105)); // left top




  plantShortGrass.push(new shortGrass(35, height / 2 + 105)); // left top
  plantShortGrass.push(new shortGrass(85, height / 2 + 115)); // left top
    plantShortGrass.push(new shortGrass(125, height / 2 + 115)); // left top

  plantShortGrass.push(new shortGrass(340, height / 2 + 185)); //middle water
  plantShortGrass.push(new shortGrass(360, height / 2 + 195)); //middle water
  plantShortGrass.push(new shortGrass(380, height / 2 + 185)); //middle water

  plantShortGrass.push(new shortGrass(100, height / 2 + 270)); //island left
  plantShortGrass.push(new shortGrass(775, height / 2 + 260)); //island right

    plantShortGrass.push(new shortGrass(200, height / 2 + 250)); //island left
  plantShortGrass.push(new shortGrass(225, height / 2 + 270)); //island left
  
  
    plantShortGrass.push(new shortGrass(425, height / 2 + 270)); //island left
   plantShortGrass.push(new shortGrass(485, height / 2 + 250)); //island left
   plantShortGrass.push(new shortGrass(545, height / 2 + 270)); //island left


  
  lilypadding.push(new LilyPad(250, height / 2 + 165))
  lilypadding.push(new LilyPad(563, height / 2 + 165))
  lilypadding.push(new LilyPad(597, height / 2 + 205))


}
function draw() {


  background(200, 240, 255);
  
   sun.display();
  
  mountain1.display();
    for (let i = 0; i < clouds.length; i++) {
    clouds[i].update();
    clouds[i].display();
  }
  
  mountain2.display();

  island.display();
  river.display();
  smallerIsland.display();


  if (showVideo) {
    push();
    // translate(width, 0);
    // scale(-1, 1);
    image(video, width, height);
    pop();
  }
  
    for (let i = 0; i < tree.length; i++) {
    tree[i].update(poses);
    tree[i].display();
  }

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update(poses);
    flowers[i].display();
  }
  
    for (let i = 0; i < plantLeaves.length; i++) {
    plantLeaves[i].update(poses);
    plantLeaves[i].display();
  }
  
      for (let i = 0; i < tulipFlower.length; i++) {
    tulipFlower[i].update(poses);
    tulipFlower[i].display();
  }
  
  
          for (let i = 0; i < lilypadding.length; i++) {
    lilypadding[i].update(poses);
    lilypadding[i].display();
  }
  
  
          for (let i = 0; i < plantShortGrass.length; i++) {
    plantShortGrass[i].update(poses);
    plantShortGrass[i].display();
  }

  
 

  //draw layer and flip
  // push();
  // translate(width, 0);
  // scale(-1, 1);
  // image(layer, 0, 0);
  // pop();
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
    fill(135,206,235);
    beginShape();
    vertex(this.x1, this.y1);
    bezierVertex(80, 320, 620, 420, this.x2, this.y2);
    vertex(this.x2, 500);
    bezierVertex(640, 510, 160, 510, this.x1, 500);
    endShape(CLOSE);
  }
}

class Sun {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  display() {
    noStroke();
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(0.2, 0.4); 
  }

  update() {
    this.x -= this.speed;
    if (this.x < -100) {
      this.x = width + 100;
      this.y = random(50, 200);
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 60, 40);
    ellipse(this.x + 30, this.y + 10, 50, 30);
    ellipse(this.x - 30, this.y + 10, 50, 30);
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
   fill(50, 95, 0);
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
   fill(40, 80, 0);
    beginShape();
    vertex(0, 370 + this.offsetY);
    bezierVertex(200,320 + this.offsetY,600,420 + this.offsetY,800,390 + this.offsetY
    );
    vertex(800, 500 + this.offsetY);
    bezierVertex(640, 510 + this.offsetY,160,520 + this.offsetY,0,500 + this.offsetY
    );
    endShape(CLOSE);
  }
}

class treeOne { //hands
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }
  
  update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      let pose = poses[p];
      
      if (
        pose.keypoints[9].confidence > 0.5 || 
        pose.keypoints[10].confidence > 0.5
      ) {

        let wristLeft = pose.keypoints[9];
        let wristRight = pose.keypoints[10];

        console.log('Left Wrist:', wristLeft.x, wristLeft.y);
        console.log('Right Wrist:', wristRight.x, wristRight.y);

        let dLeft = dist(wristLeft.x, wristLeft.y, this.x, this.y);
        let dRight = dist(wristRight.x, wristRight.y, this.x, this.y);

        console.log('Distance Left:', dLeft, 'Distance Right:', dRight);

        if (dLeft < 100 || dRight < 100) { 
          this.swayPhaseOffset = (wristLeft.x < this.x) * PI;
          this.lastTriggerTime = millis();
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 2.5;
      this.ownFrameCount += 1;
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(0.9);
    noStroke();

    fill(107, 162, 25);
    circle(0, -180, 120);

    let shakeAmount = sin(this.ownFrameCount * 0.1) * 5; // Increase shaking effect

    fill(107, 162, 25);
    circle(40 + shakeAmount, -200 + shakeAmount, 100);
    circle(40 - shakeAmount, -140 + shakeAmount, 100);
    circle(-20 + shakeAmount, -240 - shakeAmount, 100);
    circle(-40 - shakeAmount, -140 + shakeAmount, 120);
    circle(-60 + shakeAmount, -190 - shakeAmount, 100);

    fill(139, 69, 19);
    beginShape();
    vertex(-10, 0);
    bezierVertex(-20, -160, -50, -100, 0, -150);
    bezierVertex(20, -20, 30, -420, 30, 0);
    endShape(CLOSE);

    pop();
  }
}


class pinkFlower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }

  update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      //for loop for detected people
      let pose = poses[p];
      if (
        pose.keypoints[5].confidence > 0.1 ||
        pose.keypoints[6].confidence > 0.1
      ) {
        //deteceted with enough confidence

        let shoulderLeft = pose.keypoints[5];
        let shoulderRight = pose.keypoints[6];
        // circle(shoulderLeft.x, shoulderLeft.y, 10);
        // circle(shoulderRight.x, shoulderRight.y, 10);
        // console.log(shoulderLeft)

        //DISTANCE FROM FLOWER TO SHOULDER
        let dLeft = dist(shoulderLeft.x, shoulderLeft.y, this.x, this.y);
        let dRight = dist(shoulderRight.x, shoulderRight.y, this.x, this.y);

        // is shoulder within 100 pixels of the flower????
        if (dLeft < 80 || dRight < 80) {
          //if the shoulder is to the left of the flower, use PI, otherwise 0...

          this.swayPhaseOffset = (shoulderLeft.x < this.x) * PI;
          this.lastTriggerTime = millis(); //store the time when triggered
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    // 3 seconds = 3000 milliseconds
    // how much time has passed since the flower was last triggered?
    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 2.5;
      this.ownFrameCount += 1;
      //stop animation after 3000millisecs
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(0.9)
    
    // fill('red')
    // circle(0, 0, 20)
    
    noFill()
    // stroke(0)
    // circle(0, 0, 120)
    
    let swayAngle =
      ((sin(this.ownFrameCount * 0.08 + this.swayPhaseOffset) * PI) / 48) *
      this.animationProgress;
    rotate(swayAngle);

    //stem
    stroke(34, 139, 34);
    strokeWeight(6);
    line(0, 0, 0, -80);

    //leaves
    noStroke();
    fill(34, 139, 34);

    //left leaf
    push();
    translate(-2, -35);
    let leftLeafAngle =
      ((sin(this.ownFrameCount * 0.1) * PI) / 60) * this.animationProgress;
    rotate(leftLeafAngle);
    ellipse(-10, 0, 20, 10);
    pop();

    // right leadf
    push();
    translate(1, -20);
    rotate(leftLeafAngle * 2.1);
    ellipse(10, 0, 20, 10);
    pop();

    //head group
    push();
    translate(0, -80);
    let headSway =
      ((sin(this.ownFrameCount * 0.07) * PI) / 30) * this.animationProgress;
    rotate(headSway);

    fill(255, 105, 180);

    // Petal 5: Left

    push();
    translate(-12.5, 0);
    rotate(
      ((sin(this.ownFrameCount * 0.4) * PI) / 60) * this.animationProgress
    );
    ellipse(-7.5, 0, 30, 30);
    pop();

    // Petal 6: Right

    push();
    translate(12.5, 0);
    rotate(
      ((sin(this.ownFrameCount * 0.1 + PI) * PI) / 60) * this.animationProgress
    );
    ellipse(7.5, 0, 30, 30);

   
    pop();

    // Petal 7: Top
    push();
    translate(0, -12.5);
    rotate(
      ((sin(this.ownFrameCount * 0.3) * PI) / 80) * this.animationProgress
    );
    ellipse(0, -7.5, 30, 30);

    // fill("red");
    // circle(0, 0, 10);

    pop();

    // Petal 8: Bottom left

    push();
    translate(-7.5, 12.5);
    rotate(
      ((sin(this.ownFrameCount * 0.2 + HALF_PI) * PI) / 50) *
        this.animationProgress
    );
    ellipse(-4.5, 7.5, 30, 30);
    pop();

    // Petal 9: Bottom right

    push();
    translate(7.5, 12.5);
    rotate(
      ((sin(this.ownFrameCount * 0.15 + PI / 3) * PI) / 50) *
        this.animationProgress
    );
    ellipse(4.5, 7.5, 30, 30);
    pop();

    // Center of flower drawn infront

    fill(255, 215, 0);
    noStroke();
    ellipse(0, 0, 25, 25);
    
    //  display the countdown after touching
            // push()
            // fill('black')
            // textSize(20)
            // text(round((millis() - this.lastTriggerTime)/1000), 10, 10)
            // pop()
    
    pop();
    pop();
  }
}

class plantVer1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }

  update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      //for loop for detected people
      let pose = poses[p];
      if (
        pose.keypoints[5].confidence > 0.1 ||
        pose.keypoints[6].confidence > 0.1
      ) {
        //deteceted with enough confidence

        let shoulderLeft = pose.keypoints[5];
        let shoulderRight = pose.keypoints[6];
        // circle(shoulderLeft.x, shoulderLeft.y, 10);
        // circle(shoulderRight.x, shoulderRight.y, 10);
        // console.log(shoulderLeft)

        //DISTANCE FROM FLOWER TO SHOULDER
        let dLeft = dist(shoulderLeft.x, shoulderLeft.y, this.x, this.y);
        let dRight = dist(shoulderRight.x, shoulderRight.y, this.x, this.y);

        // is shoulder within 100 pixels of the flower????
        if (dLeft < 100 || dRight < 100) {
          //if the shoulder is to the left of the flower, use PI, otherwise 0...

          this.swayPhaseOffset = (shoulderLeft.x < this.x) * PI;
          this.lastTriggerTime = millis(); //store the time when triggered
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    // 3 seconds = 3000 milliseconds
    // how much time has passed since the flower was last triggered?
    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 2.5;
      this.ownFrameCount += 1;
      //stop animation after 3000millisecs
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }

  display() {
    let sway = sin(this.ownFrameCount * 0.09) * PI / 60; // gentle sway for the stem

    push();
    translate(this.x, this.y);
    rotate(sway); // sway whole plant

    stroke(34, 139, 34);
    strokeWeight(3);
    noFill();

    // Draw the stem (in local coordinates)
    bezier(0, 0,-20, -50,20, -100,0, -150);

    // Draw leaves
    noStroke();
    fill(50, 205, 50);

    // First leaf pair (near the tip)
    let x3 = bezierPoint(0, -20, 20, 0, 0.9);
    let y3 = bezierPoint(0, -50, -100, -150, 0.9);
    push();
    translate(x3, y3);
    
    rotate(sin(this.ownFrameCount * 0.3) * PI / 30); // slight movement for the leaves
    ellipse(-10, 0, 18, 10); // left
    ellipse(10, 7, 18, 10);  // right
    pop();


    // second leaf pair
    let x2 = bezierPoint(0, -20, 20, 0, 0.6);
    let y2 = bezierPoint(0, -50, -100, -150, 0.6);
    push();
    translate(x2, y2);
    rotate(sin(this.ownFrameCount * 0.5) * PI / 40); // slight movement for the leaves
    ellipse(-8, -3, 20, 10); // left
    ellipse(8, 0, 20, 10);   // right
    pop();
    
    
    // thirs leaf pair
    let x1 = bezierPoint(0, -20, 20, 0, 0.3);
    let y1 = bezierPoint(0, -50, -100, -150, 0.3);
    push();
    translate(x1, y1);
    rotate(sin(this.ownFrameCount * -0.5) * PI / 40); // slight movement for the leaves
    ellipse(-10, 10, 20, 10); // left
    ellipse(10, -10, 20, 10); // right
    pop();

    pop(); // Done with plant
  }
}

class Tulip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }
  
  update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      //for loop for detected people
      let pose = poses[p];
      if (
        pose.keypoints[5].confidence > 0.1 ||
        pose.keypoints[6].confidence > 0.1
      ) {
        //deteceted with enough confidence

        let shoulderLeft = pose.keypoints[5];
        let shoulderRight = pose.keypoints[6];
        // circle(shoulderLeft.x, shoulderLeft.y, 10);
        // circle(shoulderRight.x, shoulderRight.y, 10);
        // console.log(shoulderLeft)

        //DISTANCE FROM FLOWER TO SHOULDER
        let dLeft = dist(shoulderLeft.x, shoulderLeft.y, this.x, this.y);
        let dRight = dist(shoulderRight.x, shoulderRight.y, this.x, this.y);

        // is shoulder within 100 pixels of the flower????
        if (dLeft < 100 || dRight < 100) {
          //if the shoulder is to the left of the flower, use PI, otherwise 0...

          this.swayPhaseOffset = (shoulderLeft.x < this.x) * PI;
          this.lastTriggerTime = millis(); //store the time when triggered
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    // 3 seconds = 3000 milliseconds
    // how much time has passed since the flower was last triggered?
    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 2.5;
      this.ownFrameCount += 1;
      //stop animation after 3000millisecs
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }


  display() {
    push();
    
    translate(this.x, this.y);
    scale(0.7);
    
      let swayAngle = sin(this.ownFrameCount * 0.08) * PI / 48; 
      rotate(swayAngle);


    
        noStroke();
  
    // fill('red')
    // circle(0,0,10)

    //  stem

    fill(102,204,0);
    rect(-2.5, -100, 5, 100); 

    // leaves
    push();
    
    let LeafAngle = sin(this.ownFrameCount * 0.12) * PI / 90;
    rotate(LeafAngle);
    
    translate(0, -16); 
    rotate(-3);
    fill(102,204,0);
    noStroke();
    beginShape();
    curveVertex(0, 0);
    curveVertex(5, 20);
    curveVertex(20, 40);
    curveVertex(15, 50);
    curveVertex(0, 30);
    curveVertex(-15, 60);
    curveVertex(-20, 40);
    curveVertex(-5, 20);
    endShape(CLOSE);
    pop();

    // tulip petals 
    push();
    translate(-20, -120); // Left petal
    fill(200, 0, 200);
    noStroke();
    ellipse(0, 0, 40, 60);
    fill(128, 0, 128);
    ellipse(0, 10, 30, 50);
    pop();

    push();
    translate(20, -120); // Right petal
    
    fill(200, 0, 200);
    noStroke();
    ellipse(0, 0, 40, 60);
    fill(128, 0, 128);
    ellipse(0, 10, 30, 50);
    pop();

    push();
    translate(0, -130); // Top petal
    fill(200, 0, 200);
    noStroke();
    ellipse(0, 0, 40, 60);
    fill(128, 0, 128);
    ellipse(0, 10, 30, 50);
    pop();

    pop();
  }
}

class shortGrass {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.baseHeight = 70;
    this.color = 'green';
    
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }

  update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      //for loop for detected people
      let pose = poses[p];
      if (
        pose.keypoints[5].confidence > 0.1 ||
        pose.keypoints[6].confidence > 0.1
      ) {
        //deteceted with enough confidence

        let shoulderLeft = pose.keypoints[5];
        let shoulderRight = pose.keypoints[6];
        // circle(shoulderLeft.x, shoulderLeft.y, 10);
        // circle(shoulderRight.x, shoulderRight.y, 10);
        // console.log(shoulderLeft)

        //DISTANCE FROM FLOWER TO SHOULDER
        let dLeft = dist(shoulderLeft.x, shoulderLeft.y, this.x, this.y);
        let dRight = dist(shoulderRight.x, shoulderRight.y, this.x, this.y);

        // is shoulder within 100 pixels of the flower????
        if (dLeft < 60 || dRight < 60) {
          //if the shoulder is to the left of the flower, use PI, otherwise 0...

          this.swayPhaseOffset = (shoulderLeft.x < this.x) * PI;
          this.lastTriggerTime = millis(); //store the time when triggered
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    // 3 seconds = 3000 milliseconds
    // how much time has passed since the flower was last triggered?
    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 2.5;
      this.ownFrameCount += 1;
      //stop animation after 3000millisecs
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }
  
  display() {
    stroke(this.color);
    strokeWeight(2);
    noFill();

    // Movement for each blade using frameCount
    let sway1 = sin(this.ownFrameCount * 0.1) * PI / 30; // Blade 1 sway
    let sway2 = sin(this.ownFrameCount * 0.12) * PI / 40; // Blade 2 sway
    let sway3 = sin(this.ownFrameCount * 0.15) * PI / 70; // Blade 3 sway
    let sway4 = sin(this.ownFrameCount * 0.08) * PI / 40; // Blade 4 sway
    let sway5 = sin(this.ownFrameCount * 0.14) * PI / 40; // Blade 5 sway

    // Blade 1
    push(); 
    translate(this.x - 15, this.y);
    rotate(sway1); 
    bezier(
      0+4, 0,
      -10, -this.baseHeight+50 * 0.3,
      -9, -this.baseHeight+50 * 0.7,
      -11, -this.baseHeight-1 * 0.9
    );
    pop();

    // Blade 2
    push();
    translate(this.x - 5, this.y);
    rotate(sway2);
    bezier(
      0, 0,
      -10, -this.baseHeight * 0.3,
      0, -this.baseHeight * 0.6,
      -3, -this.baseHeight * 0.7
    );
    pop();

    // Blade 3 (middle)
    push();
    translate(this.x, this.y);
    rotate(sway3);
    bezier(
      0, 0,
      -2, -this.baseHeight+20 * 0.4,
      2, -this.baseHeight+20 * 0.7,
      0, -this.baseHeight+20
    );
    pop();

    // Blade 4
    push();
    translate(this.x + 5, this.y);
    rotate(sway4); 
    bezier(
      0, 0,
      10, -this.baseHeight * 0.3,
      0, -this.baseHeight * 0.6,
      3, -this.baseHeight * 0.5
    );
    pop();

    // Blade 5
    push();
    translate(this.x + 14, this.y);
    rotate(sway5); 
    bezier(
      0, 0,
      7, -this.baseHeight * 0.3,
      -9, -this.baseHeight * 0.6,
      -8, -this.baseHeight * 0.9
    );
    pop();
  }
}

class Mountain {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  display() {
    push();

    fill(this.col);
    noStroke();
    beginShape();
    curveVertex(this.x, this.y);
    curveVertex(this.x + 140, this.y - 290);
    curveVertex(this.x + 280, this.y - 130);
    curveVertex(this.x + 430, this.y - 260);
    curveVertex(this.x + 620, this.y);
    endShape(CLOSE);
    pop();
  }
}

class LilyPad {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.initialY = y; 
    this.amplitude = 5; 
    this.speed = 0.05; 
    
    this.animationProgress = 0;
    this.lastTriggerFrame = 0;
    this.triggered = false;
    this.swayPhaseOffset = 0;
    this.ownFrameCount = 0;
  }

update(poses) {
    let trigger = false;

    for (let p = 0; p < poses.length; p++) {
      //for loop for detected people
      let pose = poses[p];
      if (
        pose.keypoints[5].confidence > 0.1 ||
        pose.keypoints[6].confidence > 0.1
      ) {
        //deteceted with enough confidence

        let shoulderLeft = pose.keypoints[5];
        let shoulderRight = pose.keypoints[6];
        // circle(shoulderLeft.x, shoulderLeft.y, 10);
        // circle(shoulderRight.x, shoulderRight.y, 10);
        // console.log(shoulderLeft)

        //DISTANCE FROM FLOWER TO SHOULDER
        let dLeft = dist(shoulderLeft.x, shoulderLeft.y, this.x, this.y);
        let dRight = dist(shoulderRight.x, shoulderRight.y, this.x, this.y);

        // is shoulder within 100 pixels of the flower????
        if (dLeft < 60 || dRight < 60) {
          //if the shoulder is to the left of the flower, use PI, otherwise 0...

          this.swayPhaseOffset = (shoulderLeft.x < this.x) * PI;
          this.lastTriggerTime = millis(); //store the time when triggered
          this.triggered = true;
          trigger = true;
          break;
        }
      }
    }

    // 3 seconds = 3000 milliseconds
    // how much time has passed since the flower was last triggered?
    let timeSinceTrigger = millis() - this.lastTriggerTime;
    
    if (this.triggered && timeSinceTrigger <= 3000) {
      this.animationProgress = 1.5;
      this.ownFrameCount += 1;
      //stop animation after 3000millisecs
    } else if (this.animationProgress > 0) {
      this.animationProgress -= 0.05;
      this.ownFrameCount += 0.5;
    } else if (this.animationProgress <= 0) {
      this.animationProgress = 0;
      this.triggered = false;
    }
  }

  display() {
    
    
    push();
        this.y = this.initialY + sin(this.ownFrameCount * this.speed) * this.amplitude;

    translate(this.x, this.y); 
    
    scale(0.3)
    
    noStroke();
    
    fill(34, 139, 34);  
    ellipse(0, 0, 200, 80);
    
    // edge highlight6
    fill(144, 238, 144, 180);  
    ellipse(0, 0, 190, 75);   
    
    // small circles
    fill(0, 128, 0); 
    ellipse(40, -10, 20, 10);
    ellipse(-50, 20, 15, 8);  
    
    pop();
  }
}
