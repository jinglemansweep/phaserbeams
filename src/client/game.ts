import 'phaser';
import './styles/less/style.less';
import { io } from 'socket.io-client';
import { GameConfig } from './config';
import { Socket } from 'socket.io';

export type SocketIOGame = Phaser.Game & {
  socket: Socket;
};

export class Game extends Phaser.Game {
  public socket: any;
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.socket = io();
    this.socket.on('player.list', (players: []) => {
      console.log('player.list', players);
    });
    this.socket.on('player.connect', (player: Record<string, unknown>) => {
      console.log('player.connect', player);
    });
    this.socket.on('player.disconnect', (id: string) => {
      console.log('player.disconnect', id);
    });
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
  console.log({ game });
});
