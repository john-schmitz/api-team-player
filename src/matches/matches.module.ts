import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match } from './match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MatchesService],
  imports: [TypeOrmModule.forFeature([Match])],
  exports: [MatchesService],
})
export class MatchesModule {}
