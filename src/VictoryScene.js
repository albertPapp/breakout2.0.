import Phaser from "phaser";

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super("VictoryScene");
    this.victory;
  }

  preload() {
    this.load.audio("victory", "audio/victory.mp3");
  }

  create() {
    this.victory = this.sound.add("victory", {
      loop: false
    });
    this.victory.play();
    this.add
      .text(400, 200, "YOU WON!", {
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
