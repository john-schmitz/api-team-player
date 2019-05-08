import express from "express";
import userRoutes from "./userRoutes";
import feedRoutes from "./feedRoutes";

class Routes {
  public Router: express.Router

  constructor(){
    this.Router = express.Router()
    this.defineRoutes()
  }
  defineRoutes() {
    this.Router.get('/', (req,res)=> {
      res.status(200)
      res.send({ message:"Bem vindx a nossa API =)"});
    });

    this.Router.use(userRoutes);
    this.Router.use(feedRoutes);
  }
}
export default new Routes().Router