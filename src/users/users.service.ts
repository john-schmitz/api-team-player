import { User } from './user.entity';
import { Repository, DeepPartial, UpdateResult } from 'typeorm';
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
import { Match } from '../matches/match.entity';
import { Update } from '../updates/update.entity';
import { UsersRepository } from './users.repository';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { EditUserDTO } from './editUserDTO';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UsersRepository,
    @InjectRepository(Update)
    private readonly updatedsRepository: Repository<Update>,
    private readonly matchesService: MatchesService,
    private readonly eventsService: EventsService,
    private readonly competitionsService: CompetitionsService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  findUserAndEventsById(id: string) {
    return this.userRepository.findUserAndEventsById(id);
  }

  async add(registerDTO: RegisterDTO) {
    const res = await this.userRepository.findOneByEmail(registerDTO.email);
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
      this.userRepository.findOneById(userId),
    ]);

    if (match) {
      throw new ConflictException('Name already in use.');
    }

    if (!user) {
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

  public async feed(id: string) {
    const feed = [];
    const user = await this.userRepository.findUserAndAllFollows(id);
    if (user.events && user.events.length > 0) {
      for (const event of user.events) {
        for (const competition of event.competitions) {
          for (const match of competition.matches) {
            feed.push(
              ...(await this.updatedsRepository.find({
                where: { match },
                relations: ['match'],
                select: ['date', 'scorePrincipal', 'scoreVisitor', 'action'],
              })),
            );
          }
        }
      }
    }

    if (user.competitions && user.competitions.length > 0) {
      for (const competition of user.competitions) {
        for (const match of competition.matches) {
          feed.push(
            ...(await this.updatedsRepository.find({
              where: { match },
              relations: ['match'],
              select: ['date', 'scorePrincipal', 'scoreVisitor', 'action'],
            })),
          );
        }
      }
    }

    if (user.matches && user.matches.length > 0) {
      for (const match of user.matches) {
        feed.push(
          ...(await this.updatedsRepository.find({
            where: { match },
            relations: ['match'],
            select: ['date', 'scorePrincipal', 'scoreVisitor', 'action'],
          })),
        );
      }
    }
    return new Set(feed);
  }

  async update(id: string, editUserDTO: EditUserDTO) {
    const user = { name: editUserDTO.name, image_url: undefined };
    if (editUserDTO.image_base64) {
      const res = await this.imageUploadService.uploadFunction(
        editUserDTO.image_base64,
      );
      const resjson = await res.json();
      if (resjson.data && resjson.success && resjson.status === 200) {
        user.image_url = resjson.data.link;
      }
    }
    await this.userRepository.update({ id }, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async allMatchesWithFollows(userId: string): Promise<Match[]> {
    const [user, matches] = await Promise.all([
      this.userRepository.findUserAndMatchesById(userId),
      this.matchesService.findAll(),
    ]);

    if (user.matches.length > 0) {
      return matches.map(match => ({
        ...match,
        following: user.matches.indexOf(match) > -1,
      }));
    } else {
      return matches.map(match => ({ ...match, following: false }));
    }
  }

  async allCompetitionsWithFollows(userId: string) {
    const [user, competitions] = await Promise.all([
      this.userRepository.findUserAndEventsById(userId),
      this.competitionsService.findAll(),
    ]);
    if (user.competitions.length > 0) {
      return competitions.map(competition => ({
        ...competition,
        following: user.competitions.indexOf(competition) > -1,
      }));
    } else {
      return competitions.map(competition => ({ ...competition, following: false }));
    }
  }

  async allEventsWithFollows(userId: string) {
    const [user, events] = await Promise.all([
      this.userRepository.findUserAndEventsById(userId),
      this.eventsService.findAll(),
    ]);
    if (user.events.length > 0) {
      return events.map(event => ({
        ...event,
        following: user.events.indexOf(event) > -1,
      }));
    } else {
      return events.map(event => ({ ...event, following: false }));
    }
  }

  findUserAndMatchesById(id: string) {
    return this.userRepository.findUserAndMatchesById(id);
  }

  findUserAndCompetitionsById(id: string) {
    return this.userRepository.findUserAndCompetitionsById(id);
  }
}
