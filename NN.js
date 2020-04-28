// const Matrix = require("./Matrix");

const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const dsigmoid = (x) => x * (1 - x);

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, learning_rate = 0.01) {
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

    this.learning_rate = learning_rate;
  }

  // Feed Forward
  predict(input_array) {
    // Calculate hidden layer
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.ih_weights, inputs);
    hidden.add(this.hidden_bias);

    // Activation
    hidden.map(sigmoid);

    // Calculate output layer
    let output = Matrix.multiply(this.ho_weights, hidden);
    output.add(this.output_bias);

    // Activation
    output.map(sigmoid);

    return output;
  }

  // Backpropagation
  train(input_array, target_array) {
    // Calculate hidden layer
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.ih_weights, inputs);
    hidden.add(this.hidden_bias);

    // Activation
    hidden.map(sigmoid);

    // Calculate output layer
    let outputs = Matrix.multiply(this.ho_weights, hidden);
    outputs.add(this.output_bias);

    // Activation
    outputs.map(sigmoid);

    // Calculating the error
    let targets = Matrix.fromArray(target_array);
    let error = Matrix.subtract(targets, outputs);

    // Calculate Gradiant
    let gradiant = Matrix.map(outputs, dsigmoid);
    gradiant.hadamant_multiply(error);
    gradiant.multiply(this.learning_rate);

    // Calculating delta weight(HO)
    let trans_hidden = Matrix.transpose(hidden);
    let delta_ho_weights = Matrix.multiply(gradiant, trans_hidden);

    // Changing weights and biases (HO)
    this.ho_weights.add(delta_ho_weights);
    this.output_bias.add(gradiant);

    // Calculating error for hidden layer
    let trans_ho_weights = Matrix.transpose(this.ho_weights);
    let error_hidden = Matrix.multiply(trans_ho_weights, error);

    // Calculating gradiant for hidden layer
    let hidden_gradiant = Matrix.map(hidden, dsigmoid);
    hidden_gradiant.hadamant_multiply(error_hidden);
    hidden_gradiant.multiply(this.learning_rate);

    // Calculating delta weight (IH)
    let trans_input = Matrix.transpose(inputs);
    let delta_ih_weights = Matrix.multiply(hidden_gradiant, trans_input);

    // Changing weights and biases (IH)
    this.ih_weights.add(delta_ih_weights);
    this.hidden_bias.add(hidden_gradiant);
  }
}

if (typeof module !== "undefined") module.exports = NeuralNetwork;
