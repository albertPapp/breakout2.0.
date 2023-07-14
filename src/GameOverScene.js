import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
    this.fail;
  }

  preload() {
    this.load.audio("fail", "audio/fail.mp3");
  }

  create() {
    this.fail = this.sound.add("fail", {
      loop: false
    });
    this.fail.play();
    this.add
      .text(400, 200, "GAME OVER", {
        fontSize: "120px",
        fill: "#fff"
      })
      .setOrigin(0.5);

    var score = this.registry.get("score");

    this.add
      .text(400, 550, `Your score is: ${score}`, {
        fontSize: "60px",
        fill: "#fff"
      })
      .setOrigin(0.5);

    this.add
      .text(400, 900, "Click anywhere to play again", {
        fontSize: "32px",
        fill: "#fff"
      })
      .setOrigin(0.5);

    this.input.on("pointerup", (pointer) => {
      this.scene.start("GameScene");
    });
  }
}
