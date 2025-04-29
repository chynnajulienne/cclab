  let video;
  let bodyPose;
  let poses = [];
  let connections;
  let box;
  
  function preload() {
    bodyPose = ml5.bodyPose();
  }
  
  function setup() {
    // createCanvas(640, 480);
    let canvas = createCanvas(640, 480);
    canvas.parent("p5-canvas-container");
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
  
    bodyPose.detectStart(video, gotResults);
    connections = bodyPose.getSkeleton();
  
    box = new Box(width / 2, height / 2, 100);
  }
  
  function gotResults(results) {
    poses = results;
  }
  
  function draw() {
    image(video, 0, 0);
  
    // Instruction text
    textAlign(CENTER, TOP);
    textSize(18);
    fill("black");
    text(
      "Stand further away and place your right or left hand on the box to interact!",
      width / 2,10 );
  
    let rightWristPos;
    let leftWristPos;
  
    if (poses.length > 0) {
      let keypoints = poses[0].keypoints;
  
      
                      // this part copied from ml5.js reference website
      
      // Draw skeleton lines
      for (let i = 0; i < connections.length; i++) {
        let [aIndex, bIndex] = connections[i];
        let pointA = keypoints[aIndex];
        let pointB = keypoints[bIndex];
  
        if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
          stroke(255, 0, 0);
          strokeWeight(2);
          line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
      }
  
      // Draw keypoints
      for (let i = 0; i < keypoints.length; i++) {
        let kp = keypoints[i];
        if (kp.confidence > 0.1) {
          fill(0, 255, 0);
          noStroke();
          circle(kp.x, kp.y, 10);
        }
      }
  
                  // part copied done
      
      
      // Get wrist positions
      let rightWrist = keypoints[10]; // right wrist index num
      let leftWrist = keypoints[9]; // left wrist index num
  
      if (rightWrist.confidence > 0.1) {
        rightWristPos = createVector(rightWrist.x, rightWrist.y);
      }
      if (leftWrist.confidence > 0.1) {
        leftWristPos = createVector(leftWrist.x, leftWrist.y);
      }
    }
  
    // update and display
    box.update(rightWristPos, leftWristPos);
    box.display();
  }
  
  class Box {
    
    constructor(x, y, size) {
      this.baseX = x;
      this.baseY = y;
      this.size = size;
      this.offsetX = 0;
      this.offsetY = 0;
      this.color = color(255, 105, 180); // pink
    }
  
    update(rightWrist, leftWrist) {
      
      // right wrist shaking
      if (
        rightWrist &&
        dist(rightWrist.x, rightWrist.y, this.baseX, this.baseY) < this.size / 2) {
        this.offsetX = random(-10, 10);
        this.offsetY = random(-10, 10);
      } else {
        this.offsetX = 0;
        this.offsetY = 0;
      }
  
      // left wirst change color to green
      if (
        leftWrist &&
        dist(leftWrist.x, leftWrist.y, this.baseX, this.baseY) < this.size / 2) {
        this.color = color(0, 255, 0); // green
      } else {
        this.color = color(255, 105, 180); // back to pink
      }
    }
  
    display() {
      fill(this.color);
      noStroke();
      rectMode(CENTER);
      rect(
        this.baseX + this.offsetX, //x
        this.baseY + this.offsetY, //y
        this.size, //w
        this.size //h
      );
    }
  }
  