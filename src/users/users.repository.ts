import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findUserAndMatchesById(id: string): Promise<User | undefined> {
    return await this.findOne({
      relations: ['matches'],
      where: { id },
    });
  }

  public async findUserAndEventsById(id: string): Promise<User | undefined> {
    return await this.findOne({
      relations: ['events'],
      where: { id },
    });
  }

  public async findUserAndCompetitionsById(
    id: string,
  ): Promise<User | undefined> {
    return await this.findOne({
      relations: ['competitions'],
      where: { id },
    });
  }

  public async findUserAndAllFollows(id: string): Promise<User | undefined> {
    return await this.findOne({
      relations: ['matches', 'events', 'competitions'],
      where: { id },
    });
  }
}
