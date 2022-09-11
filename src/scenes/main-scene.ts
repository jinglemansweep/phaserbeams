import mqtt from 'mqtt';
import { Strip } from '../objects/strip';
import { Player } from '../objects/player';
import { PixelColor } from '../interfaces/pixel.interface';
import { PubSubGame } from '../game';

const mqttTopicPrefix = process.env.MQTT_TOPIC_PREFIX as string;

export class MainScene extends Phaser.Scene {
  private mqtt?: mqtt.Client;
  private strip?: Strip;
  private players: Player[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    //
  }

  create(): void {
    this.mqtt = (this.game as PubSubGame).mqtt;
    this.strip = new Strip({ scene: this, pixels: 120 });
    this.players = [
      new Player({
        strip: this.strip,
        name: 'Player 1',
        color: 0xff00ff,
        position: 1,
      }),
      new Player({
        strip: this.strip,
        name: 'Player 2',
        color: 0x00ffff,
        position: 120,
      }),
    ];

    this.setupInput();
  }

  async update(time: number, delta: number): Promise<void> {
    if (Math.floor(time) % 100 === 0) {
      await this.strip?.update();
    }
  }

  setupInput(): void {
    this.input.keyboard.on('keydown', async (event: KeyboardEvent) => {
      this.mqtt?.publish(`${mqttTopicPrefix}/key`, event.key);
      if (event.key === 'q') {
        this.players[0].move(-1);
      }
      if (event.key === 'w') {
        this.players[0].move(1);
      }
      if (event.key === 'o') {
        this.players[1].move(-1);
      }
      if (event.key === 'p') {
        this.players[1].move(1);
      }
      const out = Array(this.strip?.pixels).fill(PixelColor.OFF);
      this.players.forEach((ply) => {
        out[ply.position - 1] = ply.color;
      });
      await this.strip?.update(out);
    });
  }
}
