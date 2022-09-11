import { config } from 'dotenv';
import * as mqtt from 'mqtt';

config();

const mqttUri = process.env.MQTT_URI as string;
const mqttUsername = process.env.MQTT_USERNAME as string;
const mqttPassword = process.env.MQTT_PASSWORD as string;

const client = mqtt.connect(mqttUri, {
  username: mqttUsername,
  password: mqttPassword,
});

client.on('connect', function () {
  console.log('CONNECTED');
  client.subscribe('presence', function (err: Error) {
    if (err === undefined) {
      client.publish('presence', 'Hello mqtt');
    }
  });
});

client.on('message', function (topic: string, message: Buffer) {
  // message is Buffer
  console.log(message.toString());
});

console.log('end');
