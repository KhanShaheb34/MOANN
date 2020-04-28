let nn;
let bird;
let pipes = [];
score = 0;
highscore = 0;

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(113, 197, 207);
  stroke(0);

  // Gameloop Logic
  if (frameCount % 80 == 0) {
    pipes.push(new Pipe());
    score++;
    highscore = max(score, highscore);
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    if (pipes[i].hits(bird)) {
      background(255, 0, 0, 50);
      score = 0;
    }
  }

  // Drawing
  for (const pipe of pipes) {
    pipe.show();
  }
  bird.update();
  bird.show();

  textSize(20);
  text(`Score: ${score}`, 10, 10, 200, 200);
  text(`Highscore: ${highscore}`, 10, 35, 200, 200);
}

function keyPressed() {
  if (key == " ") {
    bird.fly();
  }
}
