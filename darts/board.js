class Board {
  static ring = 8;
  static doubleBull = 12.7;
  static bull = 31.8;
  static double = 170;
  static tripple = 107;
  static fields = [
    20,
    1,
    18,
    4,
    13,
    6,
    10,
    15,
    2,
    17,
    3,
    19,
    7,
    16,
    8,
    11,
    14,
    9,
    12,
    5,
  ];

  constructor(scale, canvas) {
    this.scale = scale;
    this.ctx = canvas.getContext('2d');
    this.ring = 8 * this.scale;
    this.doubleBull = 12.7 * this.scale;
    this.bull = 31.8 * this.scale;
    this.double = 170 * this.scale;
    this.tripple = 107 * this.scale;
    this.canvas = canvas;

    this.center = { x: canvas.width / 2, y: canvas.height / 2 };
  }

  static degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  ringSegment(degree, diameter, color) {
    this.ctx.beginPath();
    this.ctx.arc(
      this.center.x,
      this.center.y,
      diameter,
      Board.degToRad(degree - 9),
      Board.degToRad(degree + 9),
    );
    this.ctx.arc(
      this.center.x,
      this.center.y,
      diameter - this.ring,
      Board.degToRad(degree + 9),
      Board.degToRad(degree - 9),
      true,
    );
    this.ctx.closePath();
    this.strokeAndFill(color);
  }

  circle(diameter, color) {
    this.ctx.beginPath();
    this.ctx.arc(
      this.center.x,
      this.center.y,
      diameter,
      Board.degToRad(0),
      Board.degToRad(360),
    );
    this.strokeAndFill(color);
  }

  inner(degree, inner, outer, color) {
    this.ctx.beginPath();
    this.ctx.arc(
      this.center.x,
      this.center.y,
      inner,
      Board.degToRad(degree - 9),
      Board.degToRad(degree + 9),
    );
    this.ctx.arc(
      this.center.x,
      this.center.y,
      outer,
      Board.degToRad(degree + 9),
      Board.degToRad(degree - 9),
      true,
    );
    this.ctx.closePath();
    this.strokeAndFill(color);
  }

  strokeAndFill(color) {
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = color;
    this.ctx.stroke();
    this.ctx.fill();
  }

  labels() {
    Board.fields.forEach((field, index) => {
      const label = new Label(
        this.ctx,
        this.center,
        field,
        18 * index,
        this.double + Label.offset,
      );
      label.render();
    });
  }

  render() {
    const canvas = document.getElementById('darts');

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = 'black';

    Board.fields.forEach((field, index) => {
      const degree = 270 + index * 18;

      this.ringSegment(
        degree,
        Board.tripple,
        index % 2 === 0 ? 'red' : 'green',
      );
      this.ringSegment(degree, Board.double, index % 2 === 0 ? 'red' : 'green');
      this.inner(
        degree,
        Board.bull,
        Board.tripple - Board.ring,
        index % 2 === 0 ? 'black' : 'ivory',
      );
      this.inner(
        degree,
        Board.tripple,
        Board.double - Board.ring,
        index % 2 === 0 ? 'black' : 'ivory',
      );
    });
    this.labels();

    this.circle(Board.bull, 'green');
    this.circle(Board.doubleBull, 'red');
  }
}
