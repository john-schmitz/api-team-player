import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { User } from '../../models/entity/User';

class UserRepository {
  public async addUser(userParm: Record<string, any>): Promise<void> {
    const user = new User();
    user.name = userParm.name;
    user.email = userParm.email;
    user.nameOrganization = userParm.nameOrganization;
    user.password = userParm.password;
    user.save();
  }
  public async findUserAndMatchesById(id: string): Promise<User> {
    return await getRepository(User).findOne({
      relations: ['matches'],
      where: { id: id },
    });
  }
  public async findUserByEmail(email: string): Promise<User> {
    return await getRepository(User).findOne({ where: { email: email } });
  }
  public async findUserById(id: string): Promise<User> {
    return await getRepository(User).findOne({ where: { id: id } });
  }
}
export default new UserRepository();
