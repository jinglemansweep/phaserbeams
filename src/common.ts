import * as mqtt from 'mqtt';

export const mqttConnect = (
  uri: string,
  username: string,
  password: string,
  prefix: string,
  clientId?: string
): mqtt.Client => {
  const client = mqtt.connect(uri, {
    username,
    password,
    clientId,
  });

  client.on('connect', function () {
    console.log(`MQTT: Connected (${username}@${uri})`);

    client.subscribe(`${prefix}/#`, () => {
      console.log(`MQTT: Subscribed to "${prefix}/#"`);
    });

    client.on('close', () => {
      console.log(`MQTT: Disconnected (${username}@${uri})`);
    });

    client.on('message', function (topic: string, _message: Buffer) {
      const message = _message.toString();
      console.log('MQTT: Message', topic, message.toString());
    });
  });

  return client;
};
