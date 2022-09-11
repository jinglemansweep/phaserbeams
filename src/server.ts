import { config } from 'dotenv';
import * as mqtt from 'mqtt';

config();

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;
const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

console.log('PHASERBEAMS SERVER');

const client = mqtt.connect(mqttUri, {
  username: mqttUsername,
  password: mqttPassword,
});

client.on('connect', function () {
  console.log(`MQTT: Connected (${mqttUsername}@${mqttUri})`);
  client.subscribe(`${mqttTopicPrefix}/#`, () => {
    console.log(`MQTT: Subscribed to "${mqttTopicPrefix}/#"`);
  });
  client.on('message', function (topic: string, message: Buffer) {
    console.log('MQTT: Message', topic, message.toString());
  });
});
