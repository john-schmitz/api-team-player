import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { MatchesService } from '../matches/matches.service';
import { UpdateMatchDTO } from './updateMatchDTO';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private readonly matchesService: MatchesService,
  ) {}

  public async add(
    updateMatchDTO: UpdateMatchDTO,
    matchId: string,
    organizationId: string,
  ) {
    const match = await this.matchesService.findOneById(matchId);
    if (!match) {
      throw new NotFoundException('Match not found');
    }

    if (match.competition.organization.id !== organizationId) {
      throw new ForbiddenException('You don\'t bellong to this organization');
    }
    const update = new Update();
    update.date = new Date();
    update.scorePrincipal = updateMatchDTO.scorePrincipal;
    update.scoreVisitor = updateMatchDTO.scoreVisitor;
    update.action = updateMatchDTO.action;
    update.match = match;
  }
}
