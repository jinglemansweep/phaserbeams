export enum PixelColor {
  RED = 0xff0000,
  GREEN = 0x00ff00,
  BLUE = 0x0000ff,
  WHITE = 0xffffff,
  OFF = 0x000000
}

export interface IPixelConstructor {
  scene: Phaser.Scene;
  x: number;
  y: number;
  color: PixelColor;
}
