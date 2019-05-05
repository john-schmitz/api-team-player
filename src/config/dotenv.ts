class Config {

  public portaAPI:String
  constructor(){
    this.portaAPI = process.env.PORT || "8000"
  }
}

export default new Config()