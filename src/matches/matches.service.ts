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

  async findAll(): Promise<Match[]> {
    return this.matchesRepository.find();
  }

  async findOneById(matchId: string): Promise<Match | undefined> {
    return this.matchesRepository.findOne({ where: { id: matchId } });
  }

  findByCompetitionId(id: string) {
    return this.matchesRepository.find({ where: { competition: { id } } });
  }

  findAllWithCompetition() {
    return this.matchesRepository.find({
      relations: ["competition"]
    });
  }
}
