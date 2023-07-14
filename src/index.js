import Phaser from "phaser";

import GameScene from "./GameScene";
import TitleScene from "./TitleScene";
import GameOverScene from "./GameOverScene";
import VictoryScene from "./VictoryScene";

var config = {
  type: Phaser.AUTO,
  backgroundColor: "#161616",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 1000
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [TitleScene, GameScene, GameOverScene, VictoryScene]
};

let game = new Phaser.Game(config);
