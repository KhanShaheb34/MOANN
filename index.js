const NeuralNet = require("./NN");

const input = [0, 1];

const NN = new NeuralNet(2, 2, 1);

const output = NN.feedForward(input);
console.table(output.data);
