let particles = [];
let numParticles = 150;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  background(10); 

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  
  fill(10, 10, 20, 30);
  rect(0, 0, width, height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // Remove off-screen particles
    if (particles[i].onCanvas === false) {
      particles.splice(i, 1);
    }
  }

  fill(255);
  text(particles.length, 10, 20);
}

function mousePressed() {
  for (let i = 0; i < 30; i++) {
    let p = new Particle(mouseX, mouseY);

    // Give the particles an explosion effect
    let angle = random(TWO_PI);
    let speed = random(2, 5);
    p.speedX = cos(angle) * speed;
    p.speedY = sin(angle) * speed;

    particles.push(p);
  }


}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    this.size = random(2, 5);

    let rOptions = [150, 200, 255, 180];
    let gOptions = [100, 0, 20, 0];
    let bOptions = [255, 180, 220, 255];

    this.r = random(rOptions);
    this.g = random(gOptions);
    this.b = random(bOptions);

    this.speedX = random(-0.5, 0.8);  // slow drifting of particles
    this.speedY = random(-0.5, 0.8);

    this.onCanvas = true;
  }

  update() {
    // Always slowly moving even withpout mouse
    this.x += this.speedX;
    this.y += this.speedY;

    // Use dist() instead of dx/dy math
    let distance = dist(this.x, this.y, mouseX, mouseY);

    if (distance < 100) {
      if (this.x < mouseX) {
        this.speedX += 0.2;
        this.speedY -= 0.1;
      } else {
        this.speedX -= 0.2;
        this.speedY += 0.1;
      }
    }

    // Smooth damping
    this.speedX *= 0.98;
    this.speedY *= 0.98;

    // Remove particle if it goes off screen
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.onCanvas = false;
    }
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, 200);
    circle(this.x, this.y, this.size);
  }
}
