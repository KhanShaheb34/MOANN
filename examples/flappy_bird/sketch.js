let nn;
let birds = [];
let dead_birds = [];
let pipes = [];
let score = 0;
let highscore = 0;
let bird_count = 1000;

function setup() {
  createCanvas(800, 600);
  new_game();
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

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j]) || birds[j].offscreen()) {
        dead_birds.push(birds[j]);
        birds.splice(j, 1);
      }
    }
  }

  if (birds.length == 0) {
    new_game();
  }

  // Drawing
  for (const pipe of pipes) {
    pipe.show();
  }
  for (const bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show();
  }

  textSize(20);
  text(`Score: ${score}`, 10, 10, 200, 200);
  text(`Highscore: ${highscore}`, 10, 35, 200, 200);
}

function keyPressed() {
  if (key == " ") {
    bird.fly();
  }
}

function new_game() {
  pipes = [];
  for (let i = 0; i < bird_count; i++) {
    birds.push(new Bird());
  }
  pipes.push(new Pipe());
  score = 0;
  frameCount = 0;
}
