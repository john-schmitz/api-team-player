import express from "express";
import feedController from "../controllers/feedController";


class feedRoutes {
  public Router: express.Router
  constructor(){
    this.Router = express.Router();
    this.defineRoutes();
  }
  defineRoutes() {

    this.Router.get('/feed', (req, res) =>{
      res.status(200);
      res.send(feedController.getFeed());
    });

    this.Router.post('/feed', (req, res) => {
      if(feedController.addEvent(req.body)){
        res.status(200);
        res.send({message: "ok"});
      } else {
        res.status(500);
        res.send({message: "Deu pau aqui."});
      }
    });
  }
}
export default new feedRoutes().Router;