const NN = require("./NN");

const neural_net = new NN(2, 4, 1);

// Checking using XOR data
data = [
  [[1, 0], [1]],
  [[0, 1], [1]],
  [[1, 1], [0]],
  [[0, 0], [0]],
];

for (let i = 0; i < 100000; i++) {
  const el = data[Math.floor(Math.random() * 4)];
  neural_net.train(el[0], el[1]);
}

data.map((el) => {
  let output = neural_net.predict(el[0], el[1]).toArray();
  output > 0.5 ? (output = 1) : (output = 0);
  console.log(output);
});
