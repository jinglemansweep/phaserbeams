import { IPixelConstructor } from '../interfaces/pixel.interface';

export class Pixel extends Phaser.GameObjects.Ellipse {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IPixelConstructor) {
    super(aParams.scene, aParams.x, aParams.y, 10, 10, aParams.color, 1);
    this.scene.add.existing(this);
  }

}
