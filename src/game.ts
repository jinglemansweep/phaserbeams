import 'phaser';
import { GameConfig } from './config';
import { mqttConnect } from './common';
import { buildRandomId } from './utils';

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;
const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    const userId = `user_${buildRandomId()}`;
    const mqttClient = mqttConnect(
      mqttUri,
      mqttUsername,
      mqttPassword,
      mqttTopicPrefix
    );
    mqttClient.publish(`${mqttTopicPrefix}/user/register`, userId);
    this.registry.set('mqtt.client', mqttClient);
    this.registry.set('mqtt.prefix', mqttTopicPrefix);
    this.registry.set('user.id', userId);
  }
}

window.addEventListener('load', () => {
  void new Game(GameConfig);
});
