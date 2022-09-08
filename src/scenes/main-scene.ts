import { Pixel } from '../objects/pixel';
import { PixelColor } from '../interfaces/pixel.interface';

export class MainScene extends Phaser.Scene {
  private myPixel: Pixel;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
  }

  create(): void {
    this.myPixel = new Pixel({
      scene: this,
      x: 60,
      y: 10,
      color: PixelColor.RED
    });

  }
}
