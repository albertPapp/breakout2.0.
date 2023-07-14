import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");

    this.ball;
    this.logo;
    this.bricks;
    this.brick;
  }

  preload() {
    this.load.image("ball", "assets/ball.png");
    this.load.image("breakout", "assets/Breakout.png");
    this.load.image("purple", "assets/purple.png");
    this.load.image("navy", "assets/navy.png");
    this.load.image("red", "assets/red.png");
  }

  create() {
    this.ball = this.physics.add
      .sprite(40, 20, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1);

    this.ball.setVelocity(-90, 900);

    this.logo = this.add.image(400, 200, "breakout").setScale(3.3);

    this.bricks = this.physics.add.staticGroup();

    this.brick = this.bricks.create(200, 500, "purple");
    this.brick = this.bricks.create(450, 700, "red");
    this.brick = this.bricks.create(600, 400, "navy");

    this.physics.add.collider(this.ball, this.bricks, null, null, this);

    this.add
      .text(400, 900, "Click anywhere to start", {
        fontSize: "32px",
        fill: "#fff"
      })
      .setOrigin(0.5);

    this.input.on("pointerup", (pointer) => {
      this.scene.start("GameScene");
    });
  }
}
