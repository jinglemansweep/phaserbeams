import 'phaser';
import mqtt from 'mqtt';
import { GameConfig } from './config';

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;

export type PubSubGame = Phaser.Game & { mqtt: any };

export class Game extends Phaser.Game {
  public mqtt: any;
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.mqtt = mqtt.connect(mqttUri, {
      username: mqttUsername,
      password: mqttPassword,
    });
    this.mqtt.on('connect', () => {
      console.log(`MQTT: Connected (${mqttUsername}@${mqttUri})`);
      this.mqtt.on('message', (topic: string, message: Buffer) => {
        console.log('MQTT: Message', topic, message.toString());
      });
    });
    /*
    this.socket.on('player.list', (players: []) => {
      console.log('player.list', players);
    });
    this.socket.on('player.connect', (player: Record<string, unknown>) => {
      console.log('player.connect', player);
    });
    this.socket.on('player.disconnect', (id: string) => {
      console.log('player.disconnect', id);
    });
    */
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
  console.log({ game });
});
