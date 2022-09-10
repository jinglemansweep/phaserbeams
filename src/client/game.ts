import 'phaser';
import './styles/less/style.less';
import { GameConfig } from './config';

export class Game extends Phaser.Game {}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
  console.log({ game });
});
