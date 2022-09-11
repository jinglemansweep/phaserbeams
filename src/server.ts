import { config } from 'dotenv';
import { MQTT } from './utils';

config();

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;
const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

const mqtt = new MQTT(mqttUri, mqttUsername, mqttPassword, mqttTopicPrefix);

console.log('PHASERBEAMS SERVER');

const clients: Record<string, unknown> = {};

mqtt.client.on('message', function (topic: string, _message: Buffer) {
  const message = _message.toString();
  const search = topic.match(
    new RegExp(`(${mqttTopicPrefix})/(?<user>.*)/(?<action>.*)`)
  );
  if (search?.groups?.user !== undefined) {
    console.log('CLIENT > REGISTER', message);
    clients[message] = { name: message };
  }
});
