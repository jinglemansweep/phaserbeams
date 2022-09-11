export interface IStripConstructor {
  scene: Phaser.Scene;
  pixels: number;
}

export class Strip extends Phaser.GameObjects.Container {
  readonly x = 0;
  readonly y = 100;
  public pixels: number;
  constructor(aParams: IStripConstructor) {
    super(aParams.scene);
    const { pixels } = aParams;
    this.pixels = pixels;
    const pixelWidth = Math.floor(
      (this.scene.game.config.width as number) / pixels
    );
    this.add(
      new Phaser.GameObjects.Rectangle(this.scene, 900, 0, 1800, 20, 0x333333)
    );
    for (let i = 0; i < pixels; i++) {
      this.add(
        new Phaser.GameObjects.Ellipse(
          this.scene,
          pixelWidth * (i + 1) - 8,
          0,
          10,
          10,
          0x000000
        )
      );
    }
    this.scene.add.existing(this);
  }

  /*
  async update(pixels: PixelColor[] = []): Promise<void> {
    const updates: number[][] = [];

    this.children.iterate((pixel: any, i) => {
      if (!isNaN(i)) {
        pixel.setColor(pixels[i]);
        updates.push(intToRGB(pixel.fillColor));
      }
    });

    console.log('Strip Update');
    await this.wledSend(updates);
  }
  */

  /*
  async wledSend(pixels: number[][]): Promise<void> {
    await fetch('http://10.0.2.86/json/state', {
      method: 'POST',
      body: JSON.stringify({ seg: { i: pixels } }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  */
}

const intToRGB = (num: number): number[] => {
  num >>>= 0;
  const b = num & 0xff;
  const g = (num & 0xff00) >>> 8;
  const r = (num & 0xff0000) >>> 16;
  // const a = ( (num & 0xFF000000) >>> 24 ) / 255;
  return [r, g, b];
};
