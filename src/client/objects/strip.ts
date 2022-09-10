import { IStripConstructor } from '../interfaces/strip.interface';
import { Pixel } from './pixel';
import { PixelColor } from '../interfaces/pixel.interface';

export class Strip extends Phaser.GameObjects.Group {
  public pixels: number;
  constructor(aParams: IStripConstructor) {
    super(aParams.scene, []);
    const { pixels, scene } = aParams;
    this.pixels = pixels;
    const pixelWidth = (scene.game.config.width as number / pixels );
    for (let i = 0; i < pixels; i++) {
      this.add(new Pixel({ scene, name: `p${i}`, x: pixelWidth * (i + 1) - 5, color: i === 119 ? PixelColor.WHITE : PixelColor.OFF }))  
    }
    this.scene.add.existing(this);
  }

  async update(pixels: PixelColor[] = []): Promise<void> {
    const updates: number[][] = [];
    this.children.iterate((pixel: any, i) => {
      pixel.setColor(pixels[i]);
      updates.push(intToRGB(pixel.fillColor));
    });
    console.log('Strip Update');
    await this.wledSend(updates);
  }

  async wledSend(pixels: number[][]): Promise<void> {
    await fetch('http://10.0.2.86/json/state', {
      method: 'POST',
      body: JSON.stringify({seg: {i: pixels}}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

const intToRGB = (num: number): number[] => {
  num >>>= 0;
  const b = num & 0xFF;
  const g = (num & 0xFF00) >>> 8;
  const r = (num & 0xFF0000) >>> 16;
  // const a = ( (num & 0xFF000000) >>> 24 ) / 255;
  return [r, g, b];
}