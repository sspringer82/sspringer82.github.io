class Label {
  static offset = 25;

  constructor(ctx, center, text, angle, radius) {
    this.ctx = ctx;
    this.center = center;
    this.text = text;
    this.angle = angle;
    this.radius = radius;
    this.alpha = angle;
    this.beta = 180 - this.alpha - 90;
    this.gamma = 90;
  }

  getX() {
    const x =
      this.center.x + Math.sin((this.alpha * Math.PI) / 180) * this.radius;
    return x;
  }

  getY() {
    const y =
      this.center.y - Math.sin((this.beta * Math.PI) / 180) * this.radius;
    return y;
  }

  render() {
    const rect = {
      width: 40,
      height: 40,
    };

    const x = this.getX();
    const y = this.getY();
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Georgia';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.text, x, y);
  }
}
