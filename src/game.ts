import 'phaser';
import { createClient } from '@supabase/supabase-js';
import { GameConfig } from './config';
import { buildRandomId } from './utils';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    const userId = buildRandomId();
    this.registry.set('user.id', userId);
    this.setupSupabase();
  }

  setupSupabase(): void {
    const url = process.env.SUPABASE_URL as string;
    const key = process.env.SUPABASE_KEY as string;
    const client = createClient(url, key);
    this.registry.set('supabase', client);
    this.registry.set('supabase.user', client.auth.user());
  }
}

window.addEventListener('load', () => {
  void new Game(GameConfig);
});
