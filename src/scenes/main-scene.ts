import { Strip } from '../objects/strip';
import { PixelColor } from '../interfaces/pixel.interface';
import { Pixel } from '../objects/pixel';

export class MainScene extends Phaser.Scene {
  private strip: Strip;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
  }

  create(): void {
    this.strip = new Strip({
      scene: this,
      pixels: 120
    });
    this.strip.update([PixelColor.RED, PixelColor.GREEN, PixelColor.BLUE]);
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      console.log(event.key);
    });
  }
}
