import { IPixelConstructor, PixelColor } from '../interfaces/pixel.interface';

export class Pixel extends Phaser.GameObjects.Ellipse {
  name: string;

  constructor(aParams: IPixelConstructor) {
    super(aParams.scene, aParams.x, 10, 10, 10, aParams.color, 1);
    this.name = aParams.name;
    this.scene.add.existing(this);
  }

  setColor(color: PixelColor) {
    this.setFillStyle(color);
  }

}
