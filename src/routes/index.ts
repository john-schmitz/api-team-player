import express from "express";
import userRoutes from "./userRoutes";

class Routes {
  public Router: express.Router
  constructor(){
    this.Router = express.Router()
    this.defineRoutes()
  }
  defineRoutes() {
    this.Router.get('/', (req,res)=> {
      res.status(200)
      res.send({ message:"bom dia Xd"})
    })

    this.Router.use(userRoutes);
  }
}
export default new Routes().Router