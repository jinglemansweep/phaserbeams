import { Strip } from '../objects/strip';

export interface IPlayerConstructor {
  strip: Strip;
  name: string;
  color: number;
  position: number;
}

export class Player extends Phaser.GameObjects.GameObject {
  readonly strip: Strip;
  public color: number;
  public position: number;

  constructor(aParams: IPlayerConstructor) {
    super(aParams.strip.scene, 'Player');
    this.strip = aParams.strip;
    this.name = aParams.name;
    this.color = aParams.color;
    this.position = aParams.position;
    this.scene.add.existing(this);
  }

  move(amount: number): void {
    let newPosition = this.position + amount;
    if (newPosition > this.strip.pixels) {
      newPosition = this.strip.pixels;
    }
    if (newPosition < 1) {
      newPosition = 1;
    }
    this.position = newPosition;
  }
}
