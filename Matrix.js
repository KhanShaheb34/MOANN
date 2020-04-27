class Matrix {
  constructor(rows, cols) {
    if (rows instanceof Matrix) {
      this.rows = rows.rows;
      this.cols = rows.cols;
      this.data = [];

      for (let i = 0; i < rows.rows; i++) {
        this.data[i] = [];
        for (let j = 0; j < rows.cols; j++) {
          this.data[i][j] = rows.data[i][j];
        }
      }
    } else {
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
  }

  randomize = () => {
    this.map(() => Math.random() * 2 - 1);
  };

  add = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      this.map((val, i, j) => val + n.data[i][j]);
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val + n);
    }
  };

  subtract = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      this.map((val, i, j) => val - n.data[i][j]);
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val - n);
    }
  };

  hadamant_multiply(n) {
    this.map((val, i, j) => val * n.data[i][j]);
  }

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

  copy() {
    return new Matrix(this);
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

  static subtract = (m1, m2) => {
    let result = new Matrix(m1.rows, m1.cols);
    result.add(m1);
    result.subtract(m2);
    return result;
  };

  static hadamant_multiply = (m1, m2) => {
    let result = new Matrix(m1.rows, m1.cols);
    result.add(m1);
    result.hadamant_multiply(m2);
    return result;
  };

  static multiply = (m1, m2) => {
    let result = new Matrix(m1.rows, m2.cols);
    result.map((_, i, j) => {
      let sum = 0;
      for (let k = 0; k < m1.cols; k++) {
        sum += m1.data[i][k] * m2.data[k][j];
      }
      return sum;
    });
    return result;
  };

  static print = (matrix) => {
    matrix.print();
  };

  static transpose(m) {
    const result = new Matrix(m.cols, m.rows);
    result.map((_, i, j) => m.data[j][i]);
    return result;
  }

  static map = (m, fn) => {
    let result = new Matrix(m);
    result.map(fn);
    return result;
  };

  static copy(m) {
    return new Matrix(m);
  }
}

if (typeof module !== "undefined") module.exports = Matrix;
