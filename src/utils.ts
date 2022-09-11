import * as mqtt from 'mqtt';

export const buildRandomId = (): string => {
  return Math.random().toString(36).slice(2, 7);
};

export class MQTT {
  readonly uri;
  readonly username;
  readonly password;
  readonly prefix;
  public client: mqtt.Client;
  readonly userId: string;
  constructor(
    uri: string,
    username: string,
    password: string,
    prefix: string,
    userId?: string
  ) {
    this.uri = uri;
    this.username = username;
    this.password = password;
    this.prefix = prefix;
    this.userId = userId ?? `server`;
    this.client = mqtt.connect(uri, {
      username,
      password,
    });
    this.client.subscribe(`${prefix}/#`, () => {
      console.log(`MQTT: Subscribed to "${prefix}/#"`);
    });
    this.client.on('message', this._onMessage);
    this.client.on('close', this._onClose);
  }

  publish(topic: string, message: string): void {
    const fullTopic = `${this.prefix}/${this.userId}/${topic}`;
    console.log('MQTT: Sent', fullTopic, message);
    this.client.publish(fullTopic, message);
  }

  _onMessage(topic: string, _message: Buffer): void {
    const message = _message.toString();
    console.log('MQTT: Received', topic, message.toString());
  }

  _onClose(): void {
    console.log(`MQTT: Disconnected (${this.username}@${this.uri})`);
  }
}
