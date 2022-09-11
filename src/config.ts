import { MainScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'PhaserBeams',
  url: 'Phaser 3 Game Engine with WLED LED Strip Support',
  version: '0.1.0',
  width: 1600,
  height: 20,
  backgroundColor: 0x111111,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
  },
  scene: [MainScene],
};
