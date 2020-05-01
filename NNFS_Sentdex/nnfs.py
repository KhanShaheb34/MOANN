import numpy as np

# Setting random seed for getting the same random weights every time
np.random.seed(0)

# Dummy input data
X = [[1.0, 1.5, 5.2, 3.1],
     [2.3, 1.2, 6.4, 1.8],
     [0.3, 4.9, 1.6, 2.2]]

# Class for a single neuron layer
class Layer_Dense:
    def __init__(self, input_nodes, neurons):
        # Setting random weights between -1 and 1
        self.weights = 0.1 * np.random.randn(input_nodes, neurons)
        # Set biases to zero
        self.biases = np.zeros((1, neurons))

    # Feed forward this layer
    def forward(self, inputs):
        # This is similar to  output = I.W + B
        self.output = np.dot(inputs, self.weights) + self.biases
        return self.output

# Setting up the layers
# Number of input of each layer will be the same as the number of neurons of the previous layer
layer1 = Layer_Dense(4, 5)
layer2 = Layer_Dense(5, 9)
layer3 = Layer_Dense(9, 2)

# Feed forward the network
# Output of one layer is the input of the next layer
layer1_outputs = layer1.forward(X)
layer2_outputs = layer2.forward(layer1_outputs)
outputs = layer3.forward(layer2_outputs)

# As there was 3 inputs and the last layer has 2 neurons the size of the output will be 3x2
print(outputs)