const Matrix = require("./Matrix");

let a = new Matrix(3, 3);
a.randomize();
console.log("A randomization done");
a.print();

let b = new Matrix(3, 3);
b.randomize();
console.log("B randomization done");
b.print();

let c = Matrix.multiply(a, b);
console.log("Done");

c.print();
a.print();
b.print();
