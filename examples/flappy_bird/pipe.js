class Pipe {
  constructor() {
    this.w = 60;
    this.x = width;
    this.gorto = 150;
    this.y = random(this.gorto, height);
    this.speed = 5;
    this.top = this.y - this.gorto;
    this.bottom = this.y;
  }

  show = () => {
    fill(113, 191, 46);
    rect(this.x, this.y, this.w, height);
    rect(this.x, 0, this.w, this.y - this.gorto);
  };

  update = () => {
    this.x -= this.speed;
  };

  offscreen = () => {
    return this.x < -this.w;
  };

  hits = (bird) => {
    if (bird.x > this.x && bird.x < this.x + this.w) {
      if (bird.y > this.bottom || bird.y < this.top) {
        return true;
      }
    }
    return false;
  };
}
