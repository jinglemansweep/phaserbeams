export interface IHeaderConstructor {
  scene: Phaser.Scene;
}

export class Header extends Phaser.GameObjects.Container {
  readonly x = 0;
  readonly y = 0;
  constructor(aParams: IHeaderConstructor) {
    super(aParams.scene);
    const gameWidth = this.scene.game.config.width as number;
    const user = this.scene.registry.get('supabase.user');

    const textTitle = new Phaser.GameObjects.Text(
      this.scene,
      20,
      10,
      'PHASER BEAMS',
      {
        color: '#ff0',
        fontFamily: 'Arial',
        fontSize: '36pt',
      }
    );
    this.add(textTitle);

    const textUser = new Phaser.GameObjects.Text(
      this.scene,
      gameWidth - 150,
      30,
      user?.email || 'Logged Out',
      {
        color: '#f0f',
        fontFamily: 'Arial',
      }
    );
    this.add(textUser);

    const buttonLogin = new Phaser.GameObjects.Text(
      this.scene,
      gameWidth - 150,
      12,
      'LOGIN',
      { color: '#fff', fontFamily: 'Arial' }
    )
      .setInteractive()
      .on('pointerdown', this._loginClicked.bind(this));

    this.add(buttonLogin);

    const buttonLogout = new Phaser.GameObjects.Text(
      this.scene,
      gameWidth - 80,
      12,
      'LOGOUT',
      { color: '#fff', fontFamily: 'Arial' }
    )
      .setInteractive()
      .on('pointerdown', this._logoutClicked.bind(this));

    this.add(buttonLogout);

    this.scene.add.existing(this);
  }

  async _loginClicked(pointer: any): Promise<void> {
    void (await this.scene.registry.get('supabase').auth.signIn({
      provider: 'github',
    }));
  }

  async _logoutClicked(pointer: any): Promise<void> {
    void (await this.scene.registry.get('supabase').auth.signOut());
  }
}
