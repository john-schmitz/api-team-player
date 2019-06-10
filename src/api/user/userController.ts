/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import userRepository from './userRepository';
import { Update } from '../../models/entity/Update';
import { Match } from '../../models/entity/Match';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userService from './userService';

class UserController {
  public async add(reqBody: Record<string, any>) {
    userService.add({
      name: reqBody.name,
      email: reqBody.email,
      nameOrganization: reqBody.nameOrganization,
      password: reqBody.password,
    });
  }

  public async authenticate(email: string, password: string): Promise<any> {
    const user = await userRepository.findUserByEmail(email);
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

  public async followMatch(userId: string, matchId: string) {
    await userService.followMatch(userId, matchId);
  }

  public async getFeed(id: string): Promise<any[]> {
    return await userService.getFeed(id);
  }
}
export default new UserController();
