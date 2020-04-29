function new_game() {
  pipes = [new Pipe()];
  score = 0;
  frameCount = 0;
}

function nextGen() {
  new_game();
  normalizeFitness(dead_birds);
  birds = generate(dead_birds);
  dead_birds = [];
}

function generate(dead_birds) {
  let newBirds = [];
  for (let _ of dead_birds) {
    let bird = poolSelection(dead_birds);
    newBirds.push(bird);
  }
  return newBirds;
}

function normalizeFitness(birds) {
  for (let i = 0; i < birds.length; i++) {
    birds[i].lifespan = Math.pow(birds[i].lifespan, 2);
  }
  let sum = 0;
  for (let bird of birds) {
    sum += bird.lifespan;
  }
  console.log({ sum });
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].lifespan / sum;
  }
}

function poolSelection(birds) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= birds[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return birds[index].copy();
}
