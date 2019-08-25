import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private readonly competitionsRepository: Repository<Competition>,
  ) {}

  async findOneById(competitionId: string): Promise<Competition | undefined> {
    return this.competitionsRepository.findOne({
      where: { id: competitionId },
    });
  }

  async findByEnventId(eventId: string) {
    return this.competitionsRepository.find({
      event: { id: eventId },
    });
  }
}
