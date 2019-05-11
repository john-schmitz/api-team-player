/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { User } from '../models/entity/User';

class UserController {
  public async getAllUsers(): Promise<User[]> {
    return await getRepository(User).find();
  }

  public add(userParm: Record<string, any>) {
    try {
      const user = new User();
      user.nome = userParm.name;
      user.email = userParm.email;
      user.nomeOrganizacao = userParm.nomeOrganizacao;
      user.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new UserController();
