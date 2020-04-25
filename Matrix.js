class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  randomize = () => {
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.floor(Math.random() * 10);
      }
    }
  };

  add = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else if (!(n instanceof Matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  };

  multiply(n) {
    if (n instanceof Matrix && this.cols == n.rows) {
      let result = new Matrix(this.rows, n.cols);

      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for (let k = 0; k < this.cols; k++) {
            sum += this.data[i][k] * n.data[k][j];
          }
          result.data[i][j] = sum;
        }
      }

      this.rows = result.rows;
      this.cols = result.cols;
      this.data = result.data;
    } else if (!(n instanceof Matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }

  print = () => {
    console.table(this.data);
  };

  map = (fn) => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = fn(this.data[i][j], i, j);
      }
    }
  };

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < m.rows; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  static randomize = (rows, cols) => {
    let random = new Matrix(rows, cols);
    random.randomize();
    return random;
  };

  static add = (m1, m2) => {
    let result = new Matrix(m1.rows, m1.cols);
    result.add(m1);
    result.add(m2);
    return result;
  };

  static multiply = (m1, m2) => {
    let result = new Matrix(m1.rows, m1.cols);
    result.add(m1);
    result.multiply(m2);
    return result;
  };

  static print = (matrix) => {
    matrix.print();
  };

  static map = (m, fn) => {
    m.map(fn);
  };
}

module.exports = Matrix;
