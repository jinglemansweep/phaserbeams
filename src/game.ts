import 'phaser';
import mqtt from 'mqtt';
import { GameConfig } from './config';

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;

const client = mqtt.connect(mqttUri, {
  username: mqttUsername,
  password: mqttPassword,
});

client.on('connect', function () {
  console.log('connected');
  client.subscribe('presence', function (err) {
    if (err === undefined) {
      client.publish('presence', 'Hello mqtt');
    }
  });
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

export type SocketIOGame = Phaser.Game & {};

export class Game extends Phaser.Game {
  public socket: any;
  /*
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
  */
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
  console.log({ game });
});
