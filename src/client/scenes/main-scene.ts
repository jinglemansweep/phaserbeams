import { Strip } from '../objects/strip';
import { Player } from '../objects/player';
import { PixelColor } from '../interfaces/pixel.interface';
import { Pixel } from '../objects/pixel';

export class MainScene extends Phaser.Scene {
  private strip: Strip;
  private players: Player[];

  constructor() {
    super({ key: 'MainScene' });1
  }

  preload(): void {
  }

  create(): void {
    this.strip = new Strip({
      scene: this,
      pixels: 120
    });
    this.players = [
      new Player({ strip: this.strip, name: 'Player 1', color: 0xFF00FF, position: 1 }), 
      new Player({ strip: this.strip, name: 'Player 2', color: 0x00FFFF, position: 120 })
    ];
    this.setupInput();
  }
  update(time: number, delta: number): void {
    if (Math.floor(time) % 100 == 0) {
      this.strip.update();  
    }
  }
  setupInput(): void {
    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      // console.log(`Key: ${event.key}`);
      if (event.key === 'q') { this.players[0].move(-1); }
      if (event.key === 'w') { this.players[0].move(1); }
      if (event.key === 'o') { this.players[1].move(-1); }
      if (event.key === 'p') { this.players[1].move(1); }      
      const out = Array(this.strip.pixels).fill(PixelColor.OFF);
      this.players.forEach((ply) => {
        out[ply.position - 1] = ply.color;
      });
      this.strip.update(out);
    });
  }
}