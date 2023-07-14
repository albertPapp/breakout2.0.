import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.timeCheck;
    this.paddleTimeCheck;
    this.bricks;
    this.bricks1;
    this.bullets;
    this.bullet1;
    this.bullet2;
    this.paddles;
    this.paddleNormal;
    this.paddleBig;
    this.paddleSmall;
    this.paddleShoot;
    this.balls;
    this.ball;
    this.pointer;
    this.scoreText;
    this.score = 0;
    this.heart;
    this.lifeText;
    this.lives = 5;
    this.gameFinished = false;
    this.shoot = false;
    this.isShootingAlready = false;
    this.gameOverText;
    this.youWonText;
    this.music;
    this.scoreaud;
    this.victory;
    this.fail;
    this.hit;
    this.crack;
    this.bonuspointaud;
    this.bonus;
    this.slowdown;
    this.speedup;
    this.shotSound;
  }

  preload() {
    this.load.image("ball", "assets/ball.png");
    this.load.image("paddleNormal", "assets/paddle.png");
    this.load.image("paddleBig", "assets/paddleBig.png");
    this.load.image("paddleSmall", "assets/paddleSmall.png");
    this.load.image("paddleShoot", "assets/paddleShoot.png");
    this.load.image("purple", "assets/purple.png");
    this.load.image("navy", "assets/navy.png");
    this.load.image("red", "assets/red.png");
    this.load.image("grey", "assets/grey.png");
    this.load.image("purple1", "assets/purple1.png");
    this.load.image("navy1", "assets/navy1.png");
    this.load.image("red1", "assets/red1.png");
    this.load.image("grey1", "assets/grey1.png");
    this.load.image("heart", "assets/heart.png");
    this.load.image("bonus100", "assets/100.png");
    this.load.image("bonus250", "assets/250.png");
    this.load.image("bonus500", "assets/500.png");
    this.load.image("slow", "assets/slow.png");
    this.load.image("fast", "assets/fast.png");
    this.load.image("shrink", "assets/shrink.png");
    this.load.image("grow", "assets/grow.png");
    this.load.image("bonusShoot", "assets/bonusShoot.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.audio("music", "audio/music.mp3");
    this.load.audio("fail", "audio/fail.mp3");
    this.load.audio("hit", "audio/hit.mp3");
    this.load.audio("victory", "audio/victory.mp3");
    this.load.audio("scoreaud", "audio/score.mp3");
    this.load.audio("crack", "audio/crack.mp3");
    this.load.audio("slowdown", "audio/slowdown.mp3");
    this.load.audio("speedup", "audio/speedup.mp3");
    this.load.audio("bonuspointaud", "audio/bonuspoint.mp3");
    this.load.audio("shotSound", "audio/shotSound.mp3");
  }

  create() {
    this.music = this.sound.add("music", {
      loop: true
    });
    this.victory = this.sound.add("victory", {
      loop: false
    });
    this.fail = this.sound.add("fail", {
      loop: false
    });
    this.scoreaud = this.sound.add("scoreaud", {
      loop: false
    });
    this.hit = this.sound.add("hit", {
      loop: false
    });
    this.crack = this.sound.add("crack", {
      loop: false
    });
    this.slowdown = this.sound.add("slowdown", {
      loop: false
    });
    this.speedup = this.sound.add("speedup", {
      loop: false
    });
    this.bonuspointaud = this.sound.add("bonuspointaud", {
      loop: false
    });

    this.shotSound = this.sound.add("shotSound", {
      loop: false
    });
    this.music.play();

    this.lives = 5;
    this.score = 0;
    this.gameFinished = false;
    this.shoot = false;
    this.isShootingAlready = false;

    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bricks1 = this.physics.add.staticGroup({
      key: ["purple1", "navy1", "red1", "grey1"],
      frameQuantity: 10,
      gridAlign: {
        width: 5,
        height: 9,
        cellWidth: 150,
        cellHeight: 50,
        x: 100,
        y: 130
      }
    });

    this.bricks = this.physics.add.staticGroup({
      key: ["purple", "navy", "red", "grey"],
      frameQuantity: 10,
      gridAlign: {
        width: 5,
        height: 9,
        cellWidth: 150,
        cellHeight: 50,
        x: 100,
        y: 130
      }
    });

    this.paddles = this.physics.add.group();
    this.paddleNormal = this.paddles
      .create(400, 950, "paddleNormal")
      .setImmovable();
    this.paddleBig = this.paddles.create(400, 950, "paddleBig").setImmovable();
    this.paddleBig.disableBody(true, true);
    this.paddleSmall = this.paddles
      .create(400, 950, "paddleSmall")
      .setImmovable();
    this.paddleSmall.disableBody(true, true);
    this.paddleShoot = this.paddles
      .create(400, 950, "paddleShoot")
      .setImmovable();
    this.paddleShoot.disableBody(true, true);

    this.balls = this.physics.add.group();
    this.bullets = this.physics.add.group();

    this.ball = this.balls
      .create(400, 918, "ball")
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.setData("onPaddle", true);

    this.bonus = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#fff"
    });

    this.lifeText = this.add.text(700, 16, `${this.lives}x`, {
      fontSize: "32px",
      fill: "#fff"
    });

    this.gameOverText = this.add.text(16, 400, "", {
      fontSize: "140px",
      fill: "#fff"
    });
    this.youWonText = this.add.text(64, 400, "", {
      fontSize: "140px",
      fill: "#fff"
    });

    this.heart = this.physics.add.image(760, 30, "heart");

    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.bricks1,
      this.hitBrick1,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.paddles,
      this.hitPaddle,
      null,
      this
    );
    this.physics.add.collider(
      this.bullets,
      this.bricks,
      this.shootBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.bullets,
      this.bricks1,
      this.shootBrick1,
      null,
      this
    );

    this.input.on("pointermove", (pointer) => {
      this.paddles.children.each((paddle) => {
        paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
        if (this.ball.getData("onPaddle")) {
          this.ball.x = paddle.x;
        }
      });
    });
    this.input.on("pointerup", (pointer) => {
      if (this.ball.getData("onPaddle")) {
        this.ball.setVelocity(-75, -800);

        this.ball.setData("onPaddle", false);
      }
    });
  }

  hitBrick(ball, brick) {
    this.crack.play();
    brick.disableBody(true, true);
  }

  hitBrick1(ball, brick) {
    this.scoreaud.play();
    brick.disableBody(true, true);
    if (brick.texture.key === "grey1") {
      this.score += 5;
    } else if (brick.texture.key === "red1") {
      this.score += 10;
    } else if (brick.texture.key === "navy1") {
      this.score += 20;
    } else {
      this.score += 40;
    }
    this.scoreText.setText("Score: " + this.score);

    let selector = Phaser.Math.Between(0, 100);

    if (selector > 10 && selector < 25) {
      var bonus100 = this.bonus.create(brick.x, brick.y, "bonus100");
      bonus100.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        bonus100,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        bonus100,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleBig,
        bonus100,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleShoot,
        bonus100,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 26 && selector < 32) {
      var bonus250 = this.bonus.create(brick.x, brick.y, "bonus250");
      bonus250.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        bonus250,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        bonus250,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleBig,
        bonus250,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleShoot,
        bonus250,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 33 && selector < 40) {
      var bonus500 = this.bonus.create(brick.x, brick.y, "bonus500");
      bonus500.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        bonus500,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        bonus500,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleBig,
        bonus500,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleShoot,
        bonus500,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 41 && selector < 50) {
      var life = this.bonus.create(brick.x, brick.y, "heart");
      life.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        life,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        life,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(this.paddleBig, life, this.getBonus, null, this);
      this.physics.add.overlap(
        this.paddleShoot,
        life,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 51 && selector < 60) {
      var slow = this.bonus.create(brick.x, brick.y, "slow");
      slow.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        slow,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        slow,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(this.paddleBig, slow, this.getBonus, null, this);
      this.physics.add.overlap(
        this.paddleShoot,
        slow,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 60 && selector < 70) {
      var fast = this.bonus.create(brick.x, brick.y, "fast");
      fast.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        fast,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        fast,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(this.paddleBig, fast, this.getBonus, null, this);
      this.physics.add.overlap(
        this.paddleShoot,
        fast,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 70 && selector < 80) {
      var grow = this.bonus.create(brick.x, brick.y, "grow");
      grow.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        grow,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        grow,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(this.paddleBig, grow, this.getBonus, null, this);
      this.physics.add.overlap(
        this.paddleShoot,
        grow,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 80 && selector < 90) {
      var shrink = this.bonus.create(brick.x, brick.y, "shrink");
      shrink.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        shrink,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        shrink,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleBig,
        shrink,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleShoot,
        shrink,
        this.getBonus,
        null,
        this
      );
    } else if (selector > 90 && selector < 100) {
      var bonusShoot = this.bonus.create(brick.x, brick.y, "bonusShoot");
      bonusShoot.body.gravity.y = 300;
      this.physics.add.overlap(
        this.paddleNormal,
        bonusShoot,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleSmall,
        bonusShoot,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleBig,
        bonusShoot,
        this.getBonus,
        null,
        this
      );
      this.physics.add.overlap(
        this.paddleShoot,
        bonusShoot,
        this.getBonus,
        null,
        this
      );
    }

    if (this.bricks1.countActive() === 0) {
      this.youWon();
    }
  }

  hitPaddle(ball, paddle) {
    if (ball.getData("onPaddle")) {
      return;
    }
    let diff = 0;
    this.hit.play();
    this.paddles.children.each((paddle) => {
      if (ball.x < paddle.x) {
        diff = paddle.x - ball.x;

        ball.setVelocityX(-12 * diff);
      } else if (paddle.x < ball.x) {
        diff = ball.x - paddle.x;

        ball.setVelocityX(12 * diff);
      } else {
        ball.setVelocity(-75, -900);
      }
    });
  }

  resetBall() {
    this.ball.setVelocity(0);

    this.ball.setData("onPaddle", true);
  }

  gameOver() {
    this.registry.set("score", this.score);

    this.shoot = false;
    this.gameFinished = true;

    this.scene.start("GameOverScene");

    this.music.stop();
  }

  youWon() {
    this.registry.set("score", this.score);

    this.shoot = false;
    this.gameFinished = true;

    this.scene.start("VictoryScene");

    this.music.stop();
  }

  getBonus(paddle, bonus) {
    bonus.disableBody(true, true);
    if (bonus.texture.key === "bonus100") {
      this.bonuspointaud.play();
      this.score += 100;
    } else if (bonus.texture.key === "bonus250") {
      this.bonuspointaud.play();
      this.score += 250;
    } else if (bonus.texture.key === "bonus500") {
      this.bonuspointaud.play();
      this.score += 500;
    } else if (bonus.texture.key === "heart") {
      this.bonuspointaud.play();
      if (this.lives < 9) {
        this.lives += 1;
      }
      this.lifeText.setText(this.lives + "x");
    } else if (bonus.texture.key === "slow") {
      this.slowdown.play();
      this.physics.world.timeScale = 2;
      this.timeCheck = this.game.getTime();
    } else if (bonus.texture.key === "fast") {
      this.speedup.play();
      this.physics.world.timeScale = 0.7;
      this.timeCheck = this.game.getTime();
    } else if (bonus.texture.key === "shrink") {
      this.shoot = false;
      this.isShootingAlready = false;
      this.bonuspointaud.play();
      if (paddle.texture.key === "paddleBig") {
        this.paddleBig.disableBody(true, true);
        this.paddleNormal.enableBody(true, paddle.x, 950, true, true);
      } else {
        this.paddleTimeCheck = this.game.getTime();
        this.paddleShoot.disableBody(true, true);
        this.paddleNormal.disableBody(true, true);
        this.paddleSmall.enableBody(true, paddle.x, 950, true, true);
      }
    } else if (bonus.texture.key === "grow") {
      this.bonuspointaud.play();
      this.shoot = false;
      this.isShootingAlready = false;
      if (paddle.texture.key === "paddleSmall") {
        this.paddleSmall.disableBody(true, true);
        this.paddleNormal.enableBody(true, paddle.x, 950, true, true);
      } else {
        this.paddleTimeCheck = this.game.getTime();
        this.paddleShoot.disableBody(true, true);
        this.paddleNormal.disableBody(true, true);
        this.paddleBig.enableBody(true, paddle.x, 950, true, true);
      }
    } else if (bonus.texture.key === "bonusShoot") {
      this.bonuspointaud.play();
      this.paddleTimeCheck = this.game.getTime();
      this.paddles.children.each((paddle) => {
        paddle.disableBody(true, true);
      });
      this.paddleShoot.enableBody(true, paddle.x, 950, true, true);
      this.shoot = true;

      if (this.shoot && !this.isShootingAlready) {
        this.isShootingAlready = true;
        var interval = setInterval(() => {
          if (!this.shoot) {
            clearInterval(interval);
          }
          if (this.shoot) {
            this.shotSound.play();
            this.bullet1 = this.bullets.create(
              this.paddleShoot.x + 85,
              870,
              "bullet"
            );
            this.bullet2 = this.bullets.create(
              this.paddleShoot.x - 85,
              870,
              "bullet"
            );
            this.bullet1.body.gravity.y = -500;
            this.bullet2.body.gravity.y = -500;
          }
        }, 1000);
      }
    }
    this.scoreText.setText("Score: " + this.score);
  }

  shootBrick(bullet, brick) {
    this.crack.play();
    bullet.disableBody(true, true);
    brick.disableBody(true, true);
  }

  shootBrick1(bullet, brick) {
    this.scoreaud.play();
    brick.disableBody(true, true);
    bullet.disableBody(true, true);
    if (brick.texture.key === "red1") {
      this.score += 10;
    } else if (brick.texture.key === "navy1") {
      this.score += 20;
    } else {
      this.score += 40;
    }
    this.scoreText.setText("Score: " + this.score);
    if (this.bricks1.countActive() === 0) {
      this.youWon();
    }
  }

  update() {
    if (this.ball.getData("onPaddle")) {
      this.paddles.children.each((paddle) => {
        this.ball.setPosition(paddle.x, 918);
      });
    }

    if (this.ball.y >= 1000) {
      if (this.lives > 1) {
        this.resetBall();
        this.lives -= 1;
        this.lifeText.setText(this.lives + "x");
      } else if (this.lives === 1) {
        this.lives -= 1;
        this.lifeText.setText(this.lives + "x");
        this.gameOver();
      }
    }

    if (this.game.getTime() - this.timeCheck > 3000) {
      this.physics.world.timeScale = 1;
    }

    if (
      this.game.getTime() - this.paddleTimeCheck > 6000 &&
      !this.gameFinished
    ) {
      this.paddles.children.each((paddle) => {
        paddle.disableBody(true, true);
      });
      this.shoot = false;
      this.isShootingAlready = false;
      this.paddleNormal.enableBody(true, this.paddleNormal.x, 950, true, true);
    }
  }
}
