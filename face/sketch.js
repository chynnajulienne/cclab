
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let stars = [];

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // fullscreen!
 canvas.parent("p5-canvas-container");
 // p.push(new Poi())

 // Create the webcam video and hide it
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();
 // Start detecting faces from the webcam video
 faceMesh.detectStart(video, gotFaces);

}


function draw() {
 background(0);


 for(let i = 0; i < 1; i++){
   stars.push(new Star())
 }
 for(let i = 0; i < stars.length; i++){
   stars[i].update();
   stars[i].display();
 }




 // clean
 for(let i = stars.length-1; i>=0; i--){
  if(stars[i].s > 9){
    stars.splice(i,1)
  }

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }


}
}

class Star{
 constructor(){
   this.s = 0.02
   this.a = random(360)
   this.originX = mouseX; // variable point
   let r = random();
   if(r<0.1){
    this.type = "ring"
   }else{
    this.type="star"
   }
 }
 update(){
   this.s *= 1.04
   // keep turning vision
   this.originX = lerp(this.originX,width/2,0.2)
 }
 display(){
   push()
   translate(this.originX, height/2)
   rotate(radians(this.a))
   scale(this.s)

   if(this.type == "star"){
    noStroke();
    fill(255)
    circle(0,200,20)
     }else if(this.type == "ring"){

      stroke(255,100);
      noFill();
      circle(0,0,200);
      circle(0,0,100);
      circle(0,0,100);
      
     }


  //  noStroke();
  //  circle(0, 200, 20)
   
  //  line(0,100,0,20)
   pop()
 }
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}