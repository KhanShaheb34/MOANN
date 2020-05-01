const math = require("mathjs");

// Dummy input data
const X = [
  [1.0, 1.5, 5.2, 3.1],
  [2.3, 1.2, 6.4, 1.8],
  [0.3, 4.9, 1.6, 2.2],
];

// Class for a single neuron layer
class Layer_Dense {
  constructor(n_inputs, n_neurons) {
    // Setting random weights between -1 and 1
    this.weights = math.random([n_inputs, n_neurons], -1.0, 1.0);
    // Set biases to zero
    this.biases = math.zeros([1, n_neurons]);
  }

  // Feed forward this layer
  forward = (inputs) => {
    // Mathjs add only supports elementwise add. So I had to create this temp_biases.
    let temp_biases = this.biases;
    let temp_biases_size = inputs.length;
    for (let i = 1; i < temp_biases_size; i++) {
      temp_biases = math.concat(temp_biases, this.biases, 0);
    }

    // This is similar to  output = I.W + B
    this.output = math.add(math.multiply(inputs, this.weights), temp_biases);
    return this.output;
  };
}

// Setting up the layers
// Number of input of each layer will be the same as the number of neurons of the previous layer
const layer1 = new Layer_Dense(4, 5);
const layer2 = new Layer_Dense(5, 9);
const layer3 = new Layer_Dense(9, 2);

// Feed forward the network
// Output of one layer is the input of the next layer
const layer1_outputs = layer1.forward(X);
const layer2_outputs = layer2.forward(layer1_outputs);
const outputs = layer3.forward(layer2_outputs);

// As there was 3 inputs and the last layer has 2 neurons the size of the output will be 3x2
console.log(outputs);
