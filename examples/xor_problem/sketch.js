// XOR Data
data = [
  [[1, 0], [1]],
  [[0, 1], [1]],
  [[1, 1], [0]],
  [[0, 0], [0]],
];

let nn;

function setup() {
  createCanvas(400, 400);
  // Setup neural net
  nn = new NeuralNetwork(2, 2, 1, 0.05);
}

function draw() {
  background(0);
  noStroke();

  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      // Training
      const el = data[Math.floor(Math.random() * 4)];
      nn.train(el[0], el[1]);

      // Predicting
      let input_array = [i / 400, j / 400];
      let y = nn.predict(input_array).toArray();

      // Drawing
      fill(y[0] * 255);
      rect(i, j, 10, 10);
    }
  }
}
