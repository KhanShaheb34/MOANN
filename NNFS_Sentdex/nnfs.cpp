#include <bits/stdc++.h>
using namespace std;

vector<vector<double>> dot_product(vector<vector<double>> a, vector<vector<double>> b) {
	vector<vector<double>> outputs;
  int rows = a.size();
  int cols = b[0].size();
  int step = b.size();

  if(step != a[0].size()) {
    cerr << "Dimension Error" << endl;
    return {{-1}};
  }

	for(int i = 0; i < rows; i++) {
		vector<double> output;
		for(int j = 0; j < cols; j++) {
      double sum = 0;
      for(int k = 0; k < step; k++) {
        sum += a[i][k] * b[k][j];
      }
      output.push_back(sum);
		}
		outputs.push_back(output);
	}

	return outputs;
}

vector<vector<double>> add(vector<vector<double>> a, vector<double> b) {
	vector<vector<double>> output;

	for(vector<double> row : a) {
    for(int i = 0; i < row.size(); i++) {
      row[i] += b[i];
    }
    output.push_back(row);
  }

	return output;
}

vector<vector<double>> generate_random_matrix(int rows, int cols) {
  vector<vector<double>> random;
  
  for(int i = 0; i < rows; i++) {
		vector<double> output;
		for(int j = 0; j < cols; j++) {
      output.push_back(((double)(rand() % 1000000) / 1000000.0) * 2 -1);
		}
		random.push_back(output);
	}
  return random;
}

vector<double> generate_zero_vector(int cols) {
  vector<double> zeros(cols, 0);
  return zeros;
}

class Layer_Dense {
public:
  vector<vector<double>> weights;
  vector<double> biases;
  vector<vector<double>> outputs;

  Layer_Dense(int n_inputs, int n_neurons) {
    weights = generate_random_matrix(n_inputs, n_neurons);
    biases = generate_zero_vector(n_neurons);
  };

  vector<vector<double>> forward(vector<vector<double>> inputs) {
    outputs = add(dot_product(inputs, weights), biases);
    return outputs;
  }
};

int main() {
  srand(time(0));

  vector<vector<double>> X ={{1.0, 1.5, 5.2, 3.1},
                             {2.3, 1.2, 6.4, 1.8},
                             {0.3, 4.9, 1.6, 2.2}};

  Layer_Dense layer1(4, 5);
  Layer_Dense layer2(5, 9);
  Layer_Dense layer3(9, 2);

  layer1.forward(X);
  layer2.forward(layer1.outputs);
  auto outputs = layer3.forward(layer2.outputs);

  for(auto row : outputs) {
    for(auto el : row) {
      cout << el << " ";
    }
    cout << endl;
  }
}