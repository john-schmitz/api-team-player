/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import userRepository from './userRepository';
import { User } from '../../models/entity/User';
import matchService from '../match/matchService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP404Error } from '../../utils/httpErrors';
import { Update } from '../../models/entity/Update';

class UserService {
  public async add(userParm: Record<string, any>) {
    bcrypt.hash(userParm.password, 7, function (err: Error, hash: string) {
      const user = {
        name: userParm.name,
        email: userParm.email,
        nameOrganization: userParm.nameOrganization,
        password: hash,
      };
      userRepository.addUser(user);
    });
  }

  public async authenticate(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail('nice@mail.com');

    if (user) {
      let res = await bcrypt.compare(password, user.password);

      if (res) {
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
        delete user.password;
        delete user.matchesId;
        return {
          token,
          ...user,
        };
      }
    }
  }
  public async follow(userId: string, matchId: string) {
    const user = await userRepository.findUserById(userId);
    if (!user.matchesId) user.matchesId = [];
    if (!user.matchesId.includes(matchId)) user.matchesId.push(matchId);
    user.save();
  }

  public async followMatch(userId: string, matchId: string) {
    const user = await userRepository.findUserAndMatchesById(userId);
    if (!user) {
      throw new HTTP404Error('User not found.');
    }
    const match = await matchService.findMatchById(matchId);
    if (!match) {
      throw new HTTP404Error('Match not found.');
    }
    if (!user.matches.includes(match)) {
      user.matches.push(match);
      user.save();
    }
  }

  public async getFeed(userId: string): Promise<any[]> {
    const feed = [];
    const user = await userRepository.findUserAndMatchesById(userId);
    if (user.matches) {
      for (let index = 0; index < user.matches.length; index++) {
        feed.push(
          ...(await Update.find({
            where: { match: user.matches[index] },
            relations: ['match'],
            select: ['date', 'scorePrincipal', 'scoreVisitor', 'action'],
          })),
        );
      }
    }
    return feed;
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await userRepository.findUserByEmail(email);
  }
  public async findUserById(id: string): Promise<User> {
    return await userRepository.findUserById(id);
  }

}
export default new UserService();
