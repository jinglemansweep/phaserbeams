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
    const pixels = 120;
    this.strip = new Strip({
      scene: this,
      pixels
    });
    
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      const out = [];
      for (let i = 0; i < pixels; i++) {
        out.push(event.key === 'r' ? PixelColor.RED : i % 2 === 0 ? PixelColor.GREEN : PixelColor.OFF );
      }
      this.strip.update(out);
    });
  }
}
