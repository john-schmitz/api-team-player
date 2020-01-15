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
import { CreateOrganizationDTO } from './createOrganizationDTO';

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

  async createOrganization(
    userId: string,
    createOrganizationDTO: CreateOrganizationDTO,
  ) {
    const [match, user] = await Promise.all([
      this.userRepository.findOne({
        where: { organization: { name: createOrganizationDTO.name } },
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

    if (createOrganizationDTO.image) {
      const res = await this.imageUploadService.uploadImage(
        createOrganizationDTO.image,
      );
      const resjson = await res.json();
      if (resjson.data && resjson.success && resjson.status === 200) {
        createOrganizationDTO.image = resjson.data.link;
      } else {
        delete createOrganizationDTO.image;
      }
    }

    const organization = new Organization();
    organization.name = createOrganizationDTO.name;
    organization.image = createOrganizationDTO.image;
    user.organization = organization;
    return this.userRepository.save(user);
  }

  public async feed(id: string) {
    const feed = [];
    const user = await this.userRepository.findUserAndAllFollows(id);
    if (user.events && user.events.length > 0) {
      for (const event of user.events) {
        if (event.competitions && event.competitions.length > 0) {
          for (const competition of event.competitions) {
            if (competition.matches && competition.matches.length > 0) {
              for (const match of competition.matches) {
                feed.push(
                  ...(await this.updatedsRepository.find({
                    where: { match: { id: match.id } },
                    relations: ['match'],
                  })),
                );
              }
            }
          }
        }
      }
    }

    if (user.competitions && user.competitions.length > 0) {
      for (const competition of user.competitions) {
        if (competition.matches && competition.matches.length > 0) {
          for (const match of competition.matches) {
            feed.push(
              ...(await this.updatedsRepository.find({
                where: { match: { id: match.id } },
                relations: ['match'],
              })),
            );
          }
        }
      }
    }

    if (user.matches && user.matches.length > 0) {
      for (const match_ of user.matches) {
        const updates = await this.updatedsRepository.find({
          where: { match: { id: match_.id } },
          relations: ['match'],
        });
        feed.push(
          ...(updates),
        );
      }
    }
    return new Set(feed);
  }

  async update(id: string, editUserDTO: EditUserDTO) {
    if (editUserDTO.image) {
      const res = await this.imageUploadService.uploadImage(
        editUserDTO.image,
      );
      const resjson = await res.json();
      if (resjson.data && resjson.success && resjson.status === 200) {
        editUserDTO.image = resjson.data.link;
      } else {
        delete editUserDTO.image;
      }
    }
    await this.userRepository.update({ id }, editUserDTO);
    return this.userRepository.findOne({ where: { id } });
  }

  async allMatchesWithFollows(userId: string): Promise<Match[]> {
    const [user, matches] = await Promise.all([
      this.userRepository.findUserAndMatchesById(userId),
      this.matchesService.findAllWithCompetition(),
    ]);
    if (user.matches.length > 0) {
      return matches.map(match => ({
        ...match,
        following: user.matches.some(match_ => match_.id === match.id),
      }));
    } else {
      return matches.map(match => ({ ...match, following: false }));
    }
  }

  async allCompetitionsWithFollows(userId: string) {
    const [user, competitions] = await Promise.all([
      this.userRepository.findUserAndCompetitionsById(userId),
      this.competitionsService.findAllWithEvent(),
    ]);
    if (user.competitions.length > 0) {
      return competitions.map(competition => ({
        ...competition,
        following: user.competitions.some(
          competition_ => competition_.id === competition.id,
        ),
      }));
    } else {
      return competitions.map(competition => ({
        ...competition,
        following: false,
      }));
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
        following: user.events.some(event_ => event_.id === event.id),
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
