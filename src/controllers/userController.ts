import users from '../models/User'

class userController {

  constructor() {
  }

  public getAllUsers() {
    return users;
  }
  public add(user:any){
    users.push(user)
  }
}
export default new userController()