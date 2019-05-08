import "reflect-metadata"
import {getRepository} from 'typeorm'
import {User} from '../models/entity/User'

export class UserController {

  public async getAllUsers() {
    return await getRepository(User).find();
  }
  
  public add(user:any){
    
  }
}
