const Matrix = require("./Matrix");

function sigmoid(val) {
  return 1 / (1 + Math.exp(-val));
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.ih_weights = new Matrix(this.hidden_nodes, this.input_nodes);
    this.ho_weights = new Matrix(this.output_nodes, this.hidden_nodes);
    this.ih_weights.randomize();
    this.ho_weights.randomize();

    this.hidden_bias = new Matrix(this.hidden_nodes, 1);
    this.output_bias = new Matrix(this.output_nodes, 1);
    this.hidden_bias.randomize();
    this.output_bias.randomize();
  }

  feedForward(input) {
    // Calculate hidden layer
    let inputs = Matrix.fromArray(input);
    let hidden = Matrix.multiply(this.ih_weights, inputs);
    hidden.add(this.hidden_bias);

    // Activation
    hidden.map(sigmoid);

    // Calculate output layer
    let output = Matrix.multiply(this.ho_weights, hidden);
    output.add(this.output_bias);

    // Activation
    output.map(sigmoid);

    return output.toArray();
  }
}

if (module !== "undefined") module.exports = NeuralNetwork;
