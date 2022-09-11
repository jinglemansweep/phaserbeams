import { config } from 'dotenv';
import { mqttConnect } from './common';

config();

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;
const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

const client = mqttConnect(
  mqttUri,
  mqttUsername,
  mqttPassword,
  mqttTopicPrefix
);

console.log('PHASERBEAMS SERVER');

const clients: Record<string, unknown> = {};

client.on('message', function (topic: string, _message: Buffer) {
  const message = _message.toString();
  if (topic === `${mqttTopicPrefix}/client/register`) {
    console.log('CLIENT > REGISTER', message);
    clients[message] = { name: message };
    client.publish(`${mqttTopicPrefix}/clients/list`, JSON.stringify(clients));
  }
});
