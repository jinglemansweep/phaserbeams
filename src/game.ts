import 'phaser';
import { GameConfig } from './config';
import { MQTT, buildRandomId } from './utils';

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;
const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    const userId = buildRandomId();
    const mqtt = new MQTT(
      mqttUri,
      mqttUsername,
      mqttPassword,
      mqttTopicPrefix,
      userId
    );
    mqtt.publish(`register`, userId);
    this.registry.set('mqtt', mqtt);
    this.registry.set('user.id', userId);
  }
}

window.addEventListener('load', () => {
  void new Game(GameConfig);
});
