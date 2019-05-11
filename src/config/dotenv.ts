class Config {
  public portaAPI: string;
  public constructor() {
    this.portaAPI = process.env.PORT || '8000';
  }
}

export default new Config();
