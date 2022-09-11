import { MainScene } from './scenes/main';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'PhaserBeams',
  url: 'Phaser 3 Game Engine with WLED LED Strip Support',
  version: '0.1.0',
  width: 1800,
  height: 1200,
  backgroundColor: 0x111111,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MainScene],
};
