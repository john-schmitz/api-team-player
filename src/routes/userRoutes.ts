import express from "express";

import {UserController} from "../controllers/userController";

class userRoutes {
  public Router: express.Router
  private userController: UserController

  constructor(){
    this.Router = express.Router()
    this.userController = new UserController()
    this.defineRoutes()
  }
  defineRoutes() {
    this.Router.get('/user/all', async (req, res) =>{
      res.status(200)
      res.send(await this.userController.getAllUsers())
    });

    this.Router.post('/user/new', (req,res)=>{
      console.log(req.body);
      this.userController.add(req.body)
       res.status(200)
      res.send({message: "ok"})
    })
  }
}
export default new userRoutes().Router