import express from "express";

import userController from "../controllers/userController";

class userRoutes {
  public Router: express.Router
  constructor(){
    this.Router = express.Router()
    this.defineRoutes()
  }
  defineRoutes() {
    this.Router.get('/user/all', (req, res) =>{
      res.status(200)
      res.send(userController.getAllUsers())
    });

    this.Router.post('/user/new', (req,res)=>{
      console.log(req.body);
      userController.add(req.body)
      res.status(200)
      res.send({message: "ok"})
    })
  }
}
export default new userRoutes().Router