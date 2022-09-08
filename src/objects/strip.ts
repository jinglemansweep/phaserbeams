import { IStripConstructor } from '../interfaces/strip.interface';
import { Pixel } from './pixel';
import { PixelColor } from '../interfaces/pixel.interface';

export class Strip extends Phaser.GameObjects.Group {
  constructor(aParams: IStripConstructor) {
    super(aParams.scene, []);
    const { pixels, scene } = aParams;
    const pixelWidth = (scene.game.config.width as number / pixels );
    let color;
    for (let i = 0; i < pixels; i++) {
      this.add(new Pixel({ scene, name: `p${i}`, x: pixelWidth * (i + 1) - 5, color: i === 119 ? PixelColor.WHITE : PixelColor.OFF }))  
    }
    this.scene.add.existing(this);
  }
  update(pixels: Array<PixelColor>) {
    let update;
    this.children.iterate((pixel: Pixel, i) => {
      pixel.setColor(pixels[i] || PixelColor.OFF);
    });
    
  }

}
