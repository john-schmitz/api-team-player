const events = [{
  score: "1x1",
  message: {
    icon: 4,
    text: "GOl do palmeiras =("
  }
},{
  score: "1x0",
  message: {
    icon: 4,
    text: "GOl do coringao"
}
}];

class feedController {

  constructor() {
  }

  public getFeed(){
    return events
  }

  public addEvent(event: any){
    events.unshift(event);
    return true;
  }
}
export default new feedController();