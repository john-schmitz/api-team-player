import { Injectable } from '@nestjs/common';
import { Match } from './match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  async findOneById(matchId: string): Promise<Match | undefined> {
    return this.matchesRepository.findOne({ where: { id: matchId } });
  }
}
