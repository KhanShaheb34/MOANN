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
    return this;
  };

  add = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      this.map((val, i, j) => val + n.data[i][j]);
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val + n);
    }
    return this;
  };

  subtract = (n) => {
    if (n instanceof Matrix && n.rows == this.rows && n.cols == this.cols) {
      this.map((val, i, j) => val - n.data[i][j]);
    } else if (!(n instanceof Matrix)) {
      this.map((val) => val - n);
    }
    return this;
  };

  hadamant_multiply(n) {
    this.map((val, i, j) => val * n.data[i][j]);
    return this;
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
    return this;
  }

  print = () => {
    console.table(this.data);
    return this;
  };

  map = (fn) => {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = fn(this.data[i][j], i, j);
      }
    }
    return this;
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
    return new Matrix(arr.length, 1).map((val, i, j) => arr[i]);
  }

  static randomize = (rows, cols) => {
    return new Matrix(rows, cols).randomize();
  };

  static add = (m1, m2) => {
    return new Matrix(m1).add(m2);
  };

  static subtract = (m1, m2) => {
    return new Matrix(m1).subtract(m2);
  };

  static hadamant_multiply = (m1, m2) => {
    return new Matrix(m1).hadamant_multiply(m2);
  };

  static multiply = (m1, m2) => {
    return new Matrix(m1.rows, m2.cols).map((_, i, j) => {
      let sum = 0;
      for (let k = 0; k < m1.cols; k++) {
        sum += m1.data[i][k] * m2.data[k][j];
      }
      return sum;
    });
  };

  static print = (m) => {
    m.print();
  };

  static transpose(m) {
    return new Matrix(m.cols, m.rows).map((_, i, j) => m.data[j][i]);
  }

  static map = (m, fn) => {
    return new Matrix(m).map(fn);
  };

  static copy(m) {
    return new Matrix(m);
  }
}

if (typeof module !== "undefined") module.exports = Matrix;
