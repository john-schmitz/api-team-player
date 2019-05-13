/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { User } from '../models/entity/User';
import { Update } from '../models/entity/Update';
import { Match } from '../models/entity/Match';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ExistingEmail from '../erros/existingEmail';

class UserController {
  public async getAllUsers(): Promise<User[]> {
    return await getRepository(User).find();
  }

  public async add(userParm: Record<string, any>) {
    if (await this.findUserEmail(userParm.email)) {
      throw new ExistingEmail();
    }
    bcrypt.hash(userParm.password, 7, function (err: Error, hash: string) {
      const user = new User();
      user.name = userParm.name;
      user.email = userParm.email;
      user.nameOrganization = userParm.nameOrganization;
      user.password = hash;
      user.save();
    });
  }

  public async findUserEmail(email: string): Promise<User> {
    return await getRepository(User).findOne({ where: { email: email } });
  }
  public async findUserById(id: number): Promise<User> {
    return await getRepository(User).findOne({ where: { id: id } });
  }

  public async authenticate(email: string, password: string): Promise<any> {
    const user = await this.findUserEmail(email);
    if (user) {
      const res = bcrypt.compare(password, user.password);
      if (res) {
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
        delete user.password;
        delete user.matchesId;
        return {
          ...user,
          token,
        };
      }
    }
  }
  public async follow(userId: number, matchId: number) {
    const user = await this.findUserById(userId);
    if (!user.matchesId) user.matchesId = [];
    if (!user.matchesId.includes(matchId)) user.matchesId.push(matchId);
    user.save();
  }

  public async getFeed(id: number): Promise<any[]> {
    const feed: any[] | PromiseLike<any[]> = [];
    const user = await this.findUserById(id);
    if(user.matchesId) {
      const matchArray = await Match.findByIds(user.matchesId);
      for (let index = 0; index < matchArray.length; index++) {
        feed.push(...(await Update.find({ where: { match: matchArray[index] } })));
      }
    }
    return feed;
  }
}
export default new UserController();
