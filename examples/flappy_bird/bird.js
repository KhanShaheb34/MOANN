function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor() {
    this.x = 50;
    this.y = height / 2;

    this.gravity = 1.2;
    this.velocity = 0;
    this.lift = -25;

    this.brain = new NeuralNetwork(4, 8, 1);
    this.lifespan = 0;
    this.fitness = 0;
  }

  copy = () => {
    let newBird = new Bird();
    newBird.brain = this.brain;
    newBird.brain.mutate(mutate);
    return newBird;
  };

  show = () => {
    fill(248, 242, 32);
    strokeWeight(2);
    ellipse(this.x, this.y, 25);
  };

  update = () => {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.lifespan++;
  };

  offscreen = () => {
    return this.y > height || this.y < 0;
  };

  think = (pipes) => {
    let closest_pipe = pipes[0];
    for (let pipe of pipes) {
      if (pipe.x < closest_pipe.x && pipe.x - pipe.w > this.x) {
        closest_pipe = pipe;
      }
    }

    let input_array = [];
    input_array[0] = map(this.y, 0, height, 0, 1);
    input_array[1] = map(this.velocity, -30, 30, 0, 1);
    input_array[2] = map(closest_pipe.x, 0, width, 0, 1);
    input_array[3] = map(
      closest_pipe.top + closest_pipe.gorto / 2,
      0,
      height,
      0,
      1
    );

    let output = this.brain.predict(input_array).toArray();
    if (output[0] > 0.5) this.fly();
  };

  fly = () => {
    this.velocity += this.lift;
  };
}
