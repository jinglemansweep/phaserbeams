import { IPlayerConstructor } from '../interfaces/player.interface';
import { Strip } from './strip';

export class Player extends Phaser.GameObjects.GameObject {
  private strip: Strip;
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
  move(amount: number) {
    let newPosition = this.position + amount;
    if (newPosition > this.strip.pixels ) { newPosition = this.strip.pixels; }
    if (newPosition < 1) { newPosition = 1; }
    this.position = newPosition;
  }
}
