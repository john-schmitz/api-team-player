import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { UsersRepository } from '../users.repository';
import { MatchesService } from '../../matches/matches.service';
import { CompetitionsService } from '../../competitions/competitions.service';
import { EventsService } from '../../events/events.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly matchesService: MatchesService,

    private readonly competitionService: CompetitionsService,
    private readonly eventsService: EventsService,
  ) {}

  public async followMatch(
    userId: string,
    matchId: string,
  ): Promise<User | undefined> {
    const [user, match] = await Promise.all([
      this.userRepository.findUserAndMatchesById(userId),
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
      this.userRepository.findUserAndMatchesById(userId),
      this.matchesService.findOneById(matchId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!match) {
      throw new NotFoundException('Match not found.');
    }
    const index = user.matches.findIndex(match_ => match_.id === match.id);
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
    const [user, competition] = await Promise.all([
      this.userRepository.findUserAndCompetitionsById(userId),
      this.competitionService.findOneById(competitionId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!competition) {
      throw new NotFoundException('Competition not found.');
    }
    if (!user.competitions.includes(competition)) {
      user.competitions.push(competition);
      return this.userRepository.save(user);
    }
  }

  public async unfollowCompetition(
    userId: string,
    competitionId: string,
  ): Promise<User | undefined> {
    const [user, competition] = await Promise.all([
      this.userRepository.findUserAndMatchesById(userId),
      this.competitionService.findOneById(competitionId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!competition) {
      throw new NotFoundException('Competition not found.');
    }
    const index = user.competitions.findIndex(
      competition_ => competition_.id === competition.id,
    );
    if (index < -1) {
      throw new BadRequestException(
        'User does not follow the competition specified.',
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
      this.userRepository.findUserAndEventsById(userId),
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
      this.userRepository.findUserAndEventsById(userId),
      this.eventsService.findOneById(eventId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    const index = user.events.findIndex(event_ => event_.id === event.id);
    if (index < -1) {
      throw new BadRequestException(
        'User does not follow the event specified.',
      );
    }
    user.events.splice(index, 1);
    return this.userRepository.save(user);
  }
}
