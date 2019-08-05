import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from '../auth/registerDTO';
import { Organization } from '../organizations/organization.entity';
import { MatchesService } from '../matches/matches.service';
import { EventsService } from '../events/events.service';
import { CompetitionsService } from '../competitions/competitions.service';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly matchesService: MatchesService,
    private readonly eventsService: EventsService,
    private readonly competitionsService: CompetitionsService,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async add(registerDTO: RegisterDTO) {
    const res = await this.findOneByEmail(registerDTO.email);
    if (res) {
      throw new ConflictException('email already in use');
    }
    const user = this.userRepository.create(registerDTO);
    user.password = await bcrypt.hash(registerDTO.password, 10);
    return user.save();
  }

  async createOrganization(userId: string, organizationName: string) {
    const [match, user] = await Promise.all([
      this.userRepository.findOne({
        where: { organization: { name: organizationName } },
        relations: ['organization'],
      }),
      this.findOneById(userId),
    ]);

    if (match) {
      throw new ConflictException('Name already in use.');
    }

    if (user) {
      throw new NotFoundException('User not found.');
    }

    if (user.organization) {
      throw new ConflictException('User already has a organization.');
    }

    const organization = new Organization();
    organization.name = organizationName;
    user.organization = organization;
    return this.userRepository.save(user);
  }

  public async findUserAndMatchesById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      relations: ['matches'],
      where: { id },
    });
  }

  public async findUserAndEventsById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      relations: ['events'],
      where: { id },
    });
  }

  public async followMatch(
    userId: string,
    matchId: string,
  ): Promise<User | undefined> {
    const [user, match] = await Promise.all([
      this.findUserAndMatchesById(userId),
      this.matchesService.findOneById(matchId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!match) {
      throw new NotFoundException('Match not found.');
    }
    if (!user.matches.includes(match)) {
      user.matches.push(match);
      return this.userRepository.save(user);
    }
  }

  public async unfollowMatch(
    userId: string,
    matchId: string,
  ): Promise<User | undefined> {
    const [user, match] = await Promise.all([
      this.findUserAndMatchesById(userId),
      this.matchesService.findOneById(matchId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!match) {
      throw new NotFoundException('Match not found.');
    }
    const index = user.matches.indexOf(match);
    if (index < -1) {
      throw new BadRequestException(
        'User does not follow the match specified.',
      );
    }
    user.matches.splice(index, 1);
    return this.userRepository.save(user);
  }

  public async followCompetition(
    userId: string,
    competitionId: string,
  ): Promise<User | undefined> {
    const [user, match] = await Promise.all([
      this.findUserAndMatchesById(userId),
      this.competitionsService.findOneById(competitionId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!match) {
      throw new NotFoundException('Match not found.');
    }
    if (!user.competitions.includes(match)) {
      user.competitions.push(match);
      return this.userRepository.save(user);
    }
  }

  public async unfollowCompetition(
    userId: string,
    competitionId: string,
  ): Promise<User | undefined> {
    const [user, competitions] = await Promise.all([
      this.findUserAndMatchesById(userId),
      this.competitionsService.findOneById(competitionId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!competitions) {
      throw new NotFoundException('Match not found.');
    }
    const index = user.competitions.indexOf(competitions);
    if (index < -1) {
      throw new BadRequestException(
        'User does not follow the match specified.',
      );
    }
    user.matches.splice(index, 1);
    return this.userRepository.save(user);
  }

  public async followEvent(
    userId: string,
    eventId: string,
  ): Promise<User | undefined> {
    const [user, event] = await Promise.all([
      this.findUserAndEventsById(userId),
      this.eventsService.findOneById(eventId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    if (!user.events.includes(event)) {
      user.events.push(event);
      return this.userRepository.save(user);
    }
  }

  public async unfollowEvent(
    userId: string,
    eventId: string,
  ): Promise<User | undefined> {
    const [user, event] = await Promise.all([
      this.findUserAndEventsById(userId),
      this.eventsService.findOneById(eventId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    const index = user.events.indexOf(event);
    if (index < -1) {
      throw new BadRequestException(
        'User does not follow the event specified.',
      );
    }
    user.events.splice(index, 1);
    return this.userRepository.save(user);
  }

  public feed(id: string) {
    throw new NotImplementedException('Method not implemented.');
  }
}
