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
    this.map((val) => Math.floor(Math.random() * 2 - 1));
  };

  add = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      n.map((val, i, j) => {
        this.data[i][j] += val;
      });
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val + n);
    }
  };

  multiply(n) {
    if (n instanceof Matrix && this.cols == n.rows) {
      let result = new Matrix(this.rows, n.cols);

      result.map((val, i, j) => {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * n.data[k][j];
        }
        return sum;
      });

      this.rows = result.rows;
      this.cols = result.cols;
      this.data = result.data;
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val * n);
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

  toArray() {
    let arr = [];
    this.map((val) => {
      arr.push(val);
    });
    return arr;
  }

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

if (module !== "undefined") module.exports = Matrix;
