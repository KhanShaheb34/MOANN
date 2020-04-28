class Bird {
  constructor() {
    this.x = 50;
    this.y = height / 2;

    this.gravity = 1;
    this.velocity = 0;
    this.lift = -25;
  }

  show = () => {
    fill(248, 242, 32);
    strokeWeight(2);
    ellipse(this.x, this.y, 25);
  };

  update = () => {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
  };

  fly = () => {
    this.velocity += this.lift;
  };
}
